
class EditPlaylist

  def self.call(playlist, params, user, spotify_user)
    spotify_playlist = RSpotify::Playlist.find(spotify_user.id, playlist.spotify_id)
    playlist.genres.destroy_all
    add_genres_to_playlist(playlist, params[:genre_ids])
    recommendations = GetSpotifyRecommendationsFromSettings.call(playlist)

    if recommendations
      playlist.tracks.destroy_all
      add_tracks_to_playlist(playlist, recommendations)
      UpdateSpotifyPlaylist.call(playlist, spotify_playlist, recommendations)
      playlist.update(params)
    end
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

