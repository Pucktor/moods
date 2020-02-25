class CreateTracksFromSpotifyRecommendations
  def self.call(recommendations_tracks)
    recommendations_tracks.each do |track|
      Track.create(
      title: track.name,
      artist: track.artists.first.name,
      album: track.album.name,
      spotify_track_id: track.id)
    end
  end
end
