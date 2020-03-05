class GetSpotifyRecommendationsFromSettings
  def self.call(playlist)
    RSpotify.authenticate(ENV["SPOTIFY_CLIENT_ID"], ENV["SPOTIFY_CLIENT_SECRET"])
    if playlist.tracks.count + 20 > 100
      max_tracks = 100
    else
      max_tracks = playlist.tracks.count + 20
    end
    recommendations = RSpotify::Recommendations.generate(
      seed_genres: playlist.genres.map { |genre| genre.name },
      target_acousticness: playlist.acousticness,
      target_danceability: playlist.danceability,
      target_energy: playlist.energy,
      target_valence: playlist.valence,
      target_popularities: playlist.popularity,
      limit: max_tracks,
      from_token: playlist.user.token
    )
    recommendations.tracks
  end
end
