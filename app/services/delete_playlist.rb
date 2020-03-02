class DeletePlaylist

  def self.call(playlist, spotify_user)
    spotify_playlist = RSpotify::Playlist.find(spotify_user.id, playlist.spotify_id)
    spotify_playlist.remove_tracks!(spotify_playlist.tracks)
    spotify_user.unfollow(spotify_playlist)
  end

end

