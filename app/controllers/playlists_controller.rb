require 'rspotify'



class PlaylistsController < ApplicationController
  def index
    # RSpotify.authenticate("SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET")
    @playlists = policy_scope(Playlist.all).where(user_id: current_user.id)
    # @playlists = current_user.playlists
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
