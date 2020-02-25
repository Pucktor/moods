class CreateSpotifyPlaylist
  def self.call(playlist, recommentations_tracks, spotify_user)
    spotify_playlist = spotify_user.create_playlist!(playlist.name)
    spotify_playlist.add_tracks!(recommentations_tracks)
  end
end
