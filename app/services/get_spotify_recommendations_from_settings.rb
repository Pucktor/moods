class GetSpotifyRecommendationsFromSettings
  def self.call(playlist)
    RSpotify.authenticate(ENV["SPOTIFY_CLIENT_ID"], ENV["SPOTIFY_CLIENT_SECRET"])
    recommendations = RSpotify::Recommendations.generate(
      seed_genres: playlist.genres.map { |genre| genre.name },
      target_acousticness: playlist.acousticness,
      target_danceability: playlist.danceability,
      target_energy: playlist.energy,
      target_valence: playlist.valence,
      target_popularities: playlist.popularity
    )
    recommendations.tracks
  end
end
