class PlaylistsController < ApplicationController
  def index
    RSpotify.authenticate(ENV["SPOTIFY_CLIENT_ID"], ENV["SPOTIFY_CLIENT_SECRET"])
    @playlists = policy_scope(Playlist.all).where(user_id: current_user.id)
    party = RSpotify::Category.find('party')
    party.playlists #=> (Playlist array)
  end

  def new
    @playlist = Playlist.new
    authorize @playlist
  end

  def create
    @playlist = CreatePlaylist.call(playlist_params, current_user)
    byebug
    authorize @playlist
    if @playlist.save
      
      redirect_to playlist_path(@playlist)
    else
      render :new
    end
  end

  def show
  end

  private

  def playlist_params
    params.require(:playlist).permit(:name, :acousticness, :danceability, :energy, :valence, :popularity, genre_ids: [])
  end
end
