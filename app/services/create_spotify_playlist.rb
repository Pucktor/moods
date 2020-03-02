class CreateSpotifyPlaylist
  def self.call(playlist, recommendations_tracks, spotify_user)
    spotify_playlist = spotify_user.create_playlist!(playlist.name)
    spotify_playlist.add_tracks!(recommendations_tracks)
    playlist.update(spotify_id: spotify_playlist.id, image_url: spotify_playlist.images.first["url"])
  end
end
