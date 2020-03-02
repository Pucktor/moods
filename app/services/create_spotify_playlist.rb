class CreateSpotifyPlaylist
  def self.call(playlist, recommendations_tracks, spotify_user)
    recommendations_tracks = recommendations_tracks.first(20)
    spotify_playlist = spotify_user.create_playlist!(playlist.name)
    spotify_playlist.add_tracks!(recommendations_tracks)
    playlist.spotify_id = spotify_playlist.id
  end
end


# add read status to playlist track.
# get 100 recommendations. 
# display first 20 tracks and add status to "read". 
# when refresh
  # get 100 recommendations and add to playlist only new ones. 
  # get next 20 tracks by creation date and put them in read status. 
  # if no newer tracks, message to user. 
