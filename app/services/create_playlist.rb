        # gem interactor. 

class CreatePlaylist

  def self.call(params, user)
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
    tracks = CreateTracksFromSpotifyRecommendations.call(recommendations)
    tracks.each do |track|
      playlist.tracks << track
    end
  end
end
