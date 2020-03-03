class PlaylistsController < ApplicationController
  before_action :set_playlist, only: [:show, :edit, :update, :destroy]
  before_action :update_token, only: [:show]

  def index
    # RSpotify.authenticate(ENV["SPOTIFY_CLIENT_ID"], ENV["SPOTIFY_CLIENT_SECRET"])
    # party = RSpotify::Category.find('party')
    # party.playlists #=> (Playlist array)
    @spotify_user = RSpotify::User.new(session[:spotify_auth])
    if params[:query].present?
      @playlists = policy_scope(Playlist.all).where("name ILIKE ?", "%#{params[:query]}%")
    else
      @playlists = policy_scope(Playlist.all)
    end
  end

  def new
    @playlist = Playlist.new(color: COLORS.keys.sample)
    authorize @playlist
  end

  def show
    authorize @playlist
    @spotify_user = RSpotify::User.new(session[:spotify_auth])
    @track_ids = @playlist.tracks.map do |x|
      {spotify_track_id: x.spotify_track_id}
    end
  end

  def create
    spotify_user = RSpotify::User.new(session[:spotify_auth])
    @playlist = CreatePlaylist.call(playlist_params, current_user, spotify_user)
    authorize @playlist
    if @playlist.persisted?
      UpdateStatusOnPlaylistTracks.call(@playlist)
      redirect_to playlist_path(@playlist)
      flash[:success] = "Your playlist has been created and added to your Spotify account!"
    else
      render :new
    end
  end

  def edit
    authorize @playlist
  end

  def update
    authorize @playlist

    spotify_user = RSpotify::User.new(session[:spotify_auth])
    spotify_playlist = DeleteTracksFromSpotify.call(@playlist, spotify_user)

    @playlist = EditPlaylist.call(@playlist, playlist_params, current_user, spotify_user)

    @playlist.update(playlist_params)
    if @playlist.persisted?
      redirect_to playlist_path(@playlist)
      flash[:success] = "Your playlist has been updated to your Spotify account!"
    else
      render :new
      flash[:notice] = "Sorry the playlist could not create due to Spotify API Error"
    end
  end

  def destroy
    authorize @playlist
    @playlist.tracks.destroy_all

    spotify_user = RSpotify::User.new(session[:spotify_auth])
    spotify_playlist = DeletePlaylist.call(@playlist, spotify_user)

    @playlist.destroy
    redirect_to playlists_path
  end

  def refresh
    @playlist = Playlist.find(params[:playlist_id])
    authorize @playlist

    count = @playlist.tracks.pluck(:read).select {|n| n == true }.count
    spotify_user = RSpotify::User.new(session[:spotify_auth])
    RefreshPlaylist.call(@playlist, spotify_user)
    if count < @playlist.tracks.pluck(:read).select {|n| n == true }.count
      redirect_to playlist_path(@playlist)
      flash[:success] = "Your playlist has been updated with new tracks."
    else
      redirect_to playlist_path(@playlist)
      flash[:notice] = "Sorry there are no new tracks for this playlist settings."
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:name, :acousticness, :danceability, :energy, :valence, :popularity, :color, genre_ids: [])
  end

  def set_playlist
    @playlist = Playlist.find(params[:id])
  end

  def update_token
    UpdateToken.call(current_user)
  end
end
