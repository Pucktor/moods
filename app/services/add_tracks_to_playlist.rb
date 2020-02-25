class AddTracksToPlaylist
  def self.call(playlist, tracks)
    tracks.each do |track|
      PlaylistTrack.create({
        playlist_id: playlist.id,
        track_id: track.id
      })
    end
  end
end
