class CreateSpotifyPlaylist
  def self.call(playlist, recommendations_tracks, spotify_user)
    recommendations_tracks = recommendations_tracks.first(20)
    spotify_playlist = spotify_user.create_playlist!(playlist.name)
    spotify_playlist.add_tracks!(recommendations_tracks)
    playlist.spotify_id = spotify_playlist.id
  end
end
