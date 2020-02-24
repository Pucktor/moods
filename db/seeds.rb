# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
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

puts "Destroying all genres..."
Genre.destroy_all
genres.each do |genre|
  g = Genre.create!({name: genre})
  puts "Created #{g.name} genre"
end

# User.create!({
#   email: "paul.heilweck@gmail.com",
#   provider: "spotify",
#   uid: "1145809247"
# })

happy_playlist = Playlist.create!({
  name: "Happy",
  acousticness: 0.5,
  danceability: 0.5,
  energy: 0.5,
  valence: 0.5,
  popularity: 50,
  user_id: User.last.id
})

track = Track.create!(
  title: "Bullets",
  artist: "Rebecca & Fiona",
  album: "Remixes",
  spotify_track_id: "https://open.spotify.com/track/2D9s9YpKFX6187aI3szOHS")

PlaylistGenre.create!({
  playlist_id: happy_playlist.id,
  genre_id: Genre.last.id
})

PlaylistTrack.create!({
  playlist_id: happy_playlist.id,
  track_id: track.id
})
# <User id: 1, email: "paul.heilweck@gmail.com", created_at: "2020-02-24 14:37:25", updated_at: "2020-02-24 14:37:25", provider: "spotify", uid: "1145809247">
