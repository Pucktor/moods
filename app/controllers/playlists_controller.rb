class PlaylistsController < ApplicationController

  def index
    # RSpotify.authenticate(ENV["SPOTIFY_CLIENT_ID"], ENV["SPOTIFY_CLIENT_SECRET"])
    # party = RSpotify::Category.find('party')
    # party.playlists #=> (Playlist array)

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
  end

  def create
    @playlist = CreatePlaylist.call(playlist_params, current_user, session[:spotify_auth])
    authorize @playlist
    if @playlist.persisted?
      genre_ids = playlist_params[:genre_ids]
      AddGenresToPlaylist.call(@playlist, genre_ids)
      recommendations = GetSpotifyRecommendationsFromSettings.call(@playlist)
      @tracks = CreateTracksFromSpotifyRecommendations.call(recommendations)
      AddTracksToPlaylist.call(@playlist, @tracks)
      spotify_user = RSpotify::User.new(session[:spotify_auth])
      CreateSpotifyPlaylist.call(@playlist, recommendations, spotify_user)
      redirect_to playlist_path(@playlist)
    else
      render :new
    end
  end

  def show
    @playlist = Playlist.find(params[:id])
    authorize @playlist
  end

  private

  def playlist_params
    params.require(:playlist).permit(:name, :acousticness, :danceability, :energy, :valence, :popularity, genre_ids: [])
  end
end
