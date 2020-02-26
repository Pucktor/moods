class PlaylistsController < ApplicationController

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
    @playlist = Playlist.new
    authorize @playlist
  end

  def show
    @playlist = Playlist.find(params[:id])
    authorize @playlist
    @spotify_user = RSpotify::User.new(session[:spotify_auth])
  end

  def create
    spotify_user = RSpotify::User.new(session[:spotify_auth])
    @playlist = CreatePlaylist.call(playlist_params, current_user, spotify_user)
    authorize @playlist
    if @playlist.persisted?
      redirect_to playlist_path(@playlist)
    else
      render :new
    end
  end

  def edit
    @playlist = Playlist.find(params[:id])
    authorize @playlist
  end

  def update
    @playlist = Playlist.find(params[:id])
    authorize @playlist
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    authorize @playlist
    @playlist.destroy
    redirect_to playlists_path
  end

  private

  def playlist_params
    params.require(:playlist).permit(:name, :acousticness, :danceability, :energy, :valence, :popularity, genre_ids: [])
  end
end
