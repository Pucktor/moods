class CreateTracksFromSpotifyRecommendations
  def self.call(recommendations_tracks)
    tracks = []
    recommendations_tracks.each do |track|
      tracks << Track.new(
      title: track.name,
      artist: track.artists.first.name,
      album: track.album.name,
      spotify_track_id: track.id)
    end
    tracks
  end
end
