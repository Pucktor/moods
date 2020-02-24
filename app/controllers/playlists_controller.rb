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
    @playlist = Playlist.new(playlist_params)
    authorize @playlist
    @playlist.user = current_user
    @playlist.save
    if @playlist.save
      redirect_to playlists_path
    else
      render :new
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:name, :acousticness, :danceability, :energy, :valence, :popularity)
  end
end
