
class CreatePlaylist

  def self.call(params, user, spotify_user)
    playlist = Playlist.new(
      name: params[:name],
      acousticness: params[:acousticness],
      danceability: params[:danceability],
      valence: params[:valence],
      energy: params[:energy],
      popularity: params[:popularity],
      user: user
    )
    add_genres_to_playlist(playlist, params[:genre_ids])
    recommendations = GetSpotifyRecommendationsFromSettings.call(playlist)
    add_tracks_to_playlist(playlist, recommendations) 
    CreateSpotifyPlaylist.call(playlist, recommendations, spotify_user)
    playlist.save
    playlist
  end

  private

  def self.add_genres_to_playlist(playlist, genre_ids)
    genre_ids.each do |genre_id|
      genre = Genre.find(genre_id)
      playlist.genres << genre
    end
    playlist.genres
  end

  def self.add_tracks_to_playlist(playlist, recommendations)
    tracks = []
    recommendations.each do |track|
      tracks << Track.new(
      title: track.name,
      artist: track.artists.first.name,
      album: track.album.name,
      spotify_track_id: track.id)
    end
    tracks.each do |track|
      playlist.tracks << track
    end
  end
end
