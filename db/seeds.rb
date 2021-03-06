RSpotify.authenticate(ENV["SPOTIFY_CLIENT_ID"], ENV["SPOTIFY_CLIENT_SECRET"])
genres = ["acoustic",
  "afrobeat",
  "alt-rock",
  "alternative",
  "ambient",
  "anime",
  "black-metal",
  "bluegrass",
  "blues",
  "bossanova",
  "brazil",
  "breakbeat",
  "british",
  "cantopop",
  "chicago-house",
  "children",
  "chill",
  "classical",
  "club",
  "comedy",
  "country",
  "dance",
  "dancehall",
  "death-metal",
  "deep-house",
  "detroit-techno",
  "disco",
  "disney",
  "drum-and-bass",
  "dub",
  "dubstep",
  "edm",
  "electro",
  "electronic",
  "emo",
  "folk",
  "forro",
  "french",
  "funk",
  "garage",
  "german",
  "gospel",
  "goth",
  "grindcore",
  "groove",
  "grunge",
  "guitar",
  "happy",
  "hard-rock",
  "hardcore",
  "hardstyle",
  "heavy-metal",
  "hip-hop",
  "holidays",
  "honky-tonk",
  "house",
  "idm",
  "indian",
  "indie",
  "indie-pop",
  "industrial",
  "iranian",
  "j-dance",
  "j-idol",
  "j-pop",
  "j-rock",
  "jazz",
  "k-pop",
  "kids",
  "latin",
  "latino",
  "malay",
  "mandopop",
  "metal",
  "metal-misc",
  "metalcore",
  "minimal-techno",
  "movies",
  "mpb",
  "new-age",
  "new-release",
  "opera",
  "pagode",
  "party",
  "philippines-opm",
  "piano",
  "pop",
  "pop-film",
  "post-dubstep",
  "power-pop",
  "progressive-house",
  "psych-rock",
  "punk",
  "punk-rock",
  "r-n-b",
  "rainy-day",
  "reggae",
  "reggaeton",
  "road-trip",
  "rock",
  "rock-n-roll",
  "rockabilly",
  "romance",
  "sad",
  "salsa",
  "samba",
  "sertanejo",
  "show-tunes",
  "singer-songwriter",
  "ska",
  "sleep",
  "songwriter",
  "soul",
  "soundtracks",
  "spanish",
  "study",
  "summer",
  "swedish",
  "synth-pop",
  "tango",
  "techno",
  "trance",
  "trip-hop",
  "turkish",
  "work-out",
  "world-music"
]
puts "Creating genres"
genres.each do |genre|
  g = Genre.create!({name: genre})
  puts "Created #{g.name} genre"
end

puts "Instantiate playlist"
happy_playlist = Playlist.new({
  name: "Happy",
  acousticness: 0.5,
  danceability: 0.5,
  energy: 0.5,
  valence: 0.5,
  popularity: 50,
  image_url: "https://mosaic.scdn.co/640/ab67616d0000b2731c06cb4d876936df710824e3ab67616d0000b2732dc45b4ecdff2825f6bfbf6bab67616d0000b273b67a4e520977124ece9b1cd2ab67616d0000b273f929b3e3d48b848f5b42f8d3",
  user_id: User.last.id,
  color: COLORS.keys.sample
})

puts "Adding genres to playlist"
happy_playlist.genres << Genre.last
happy_playlist.genres << Genre.first

puts "Get Spotify recommendations from playlist"
recommendations = RSpotify::Recommendations.generate(
  seed_genres: happy_playlist.genres.map { |genre| genre.name },
  target_acousticness: happy_playlist.acousticness,
  target_danceability: happy_playlist.danceability,
  target_energy: happy_playlist.energy,
  target_valence: happy_playlist.valence,
  target_popularities: happy_playlist.popularity)

puts "Adding tracks to playlist"
tracks = []
recommendations.tracks.each do |track|
  tracks << Track.new(
  title: track.name,
  artist: track.artists.first.name,
  album: track.album.name,
  spotify_track_id: track.id)
end

happy_playlist.tracks << tracks

puts "Saving playlist + associated objects"
happy_playlist.save!
