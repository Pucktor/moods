class DeleteTracks

  def self.call(playlist, spotify_user)
    spotify_playlist = RSpotify::Playlist.find(spotify_user.id, playlist.spotify_id)
    spotify_playlist.remove_tracks!(spotify_playlist.tracks)
  end

end
