        # dossier service qui a le nom de l'action. app/services/verb_
        # class qui a une methode call. 
        # gem interactor. 

class CreatePlaylist

  def self.call(params, user, spotify_auth_info)
    playlist = Playlist.create(
      name: params[:name],
      acousticness: params[:acousticness],
      danceability: params[:danceability],
      valence: params[:valence],
      energy: params[:energy],
      popularity: params[:popularity],
      user: user
    )
    # if playlist.save
    #   # self.add_genres_to_playlist(playlist, params[:genre_ids])
    #   recommentations_tracks = self.get_recommendations(playlist)
    #   tracks = self.create_tracks(recommentations_tracks)
    #   self.add_tracks_to_playlist(playlist, tracks)
    #   self.create_spotify_playlist(playlist, recommentations_tracks, spotify_auth_info)
    # end
  end

end
