class PlaylistsController < ApplicationController
  def index
    @playlists = Playlist.where(user_id: current_user.id)
  end

  def new
    @playlist = Playlist.new
  end

  def create
    @playlist = Playlist.new(playlist_params)
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
