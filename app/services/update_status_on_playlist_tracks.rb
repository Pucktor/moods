class UpdateStatusOnPlaylistTracks

  def self.call(playlist)
    PlaylistTrack.where("playlist_id = ? AND read =  false",  playlist.id).first(20).each do |track|
      track.read = true
      track.save
    end
  end

end
