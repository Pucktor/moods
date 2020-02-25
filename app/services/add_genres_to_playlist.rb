class AddGenresToPlaylist
  
  def self.call(playlist, genre_ids)
    genre_ids.each do |genre_id|
      PlaylistGenre.create!({
        playlist_id: playlist.id,
        genre_id: genre_id
      })
    end
  end

end
