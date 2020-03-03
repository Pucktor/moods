class UpdateStatusOnPlaylistTracks

  def self.call(playlist)
    tracks = []
    PlaylistTrack.includes(:track).where("playlist_id = ? AND read =  false",  playlist.id).first(20).each do |playlist_track|
      playlist_track.read = true
      playlist_track.save
      tracks << Track.find(playlist_track.track_id)
    end
    tracks
  end

end
