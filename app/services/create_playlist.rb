        # dossier service qui a le nom de l'action. app/services/verb_
        # class qui a une methode call. 
        # gem interactor. 

class CreatePlaylist

  def self.call(params, user)
    playlist = Playlist.new(
      name: params[:name],
      acousticness: params[:acousticness],
      danceability: params[:danceability],
      valence: params[:valence],
      popularity: params[:popularity],
      user: user
    )

    byebug

    add_genres_to_playlist(params[:genre_ids])

    recommentations_tracks = get_recommendations(playlist)

    tracks = create_tracks(recommentations_tracks)

    add_tracks_to_playlist(tracks)

    create_spotify_playlist(playlist, recommentations_tracks)

  end

  private

  def add_genres_to_playlist(genre_ids)
    genre_ids.each do |genre_id|
      PlaylistGenre.create!({
        playlist_id: playlist.id,
        genre_id: genre_id
      })
    end
  end

  def get_recommendations(playlist)
    recommendations = RSpotify::Recommendations.generate(
      seed_genres: playlist.genres.map { |genre| genre.name },
      target_acousticness: playlist.acousticness,
      target_danceability: playlist.danceability,
      target_energy: playlist.energy,
      target_valence: playlist.valence,
      target_popularities: playlist.popularity)
    recommendations.tracks
  end

  def create_tracks(tracks)
    tracks.each do |track|
      Track.create(
      title: track.name,
      artist: track.artists.first.name,
      album: track.album.name,
      spotify_track_id: track.id)
    end
  end

  def add_tracks_to_playlist(tracks)
    tracks.each do |track|
      PlaylistTrack.create!({
        playlist_id: @playlist.id,
        track_id: track.id
      })
  end

  def create_spotify_playlist(playlist, tracks)
    spotify_user = RSpotify::User.new(session[:spotify_auth])
    spotify_playlist = spotify_user.create_playlist!(playlist.name)
    tracks = spotify_user.
    spotify_playlist.add_tracks!(tracks)
  end

end
