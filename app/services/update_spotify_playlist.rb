class UpdateSpotifyPlaylist
  def self.call(playlist, spotify_playlist, recommendations_tracks)
    # spotify_playlist = spotify_user.edit_playlist!(playlist.name)
    # playlist.tracks.destroy_all
    spotify_playlist.add_tracks!(recommendations_tracks)
    playlist.update(spotify_id: spotify_playlist.id)
  end
end

