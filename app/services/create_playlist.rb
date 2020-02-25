        # dossier service qui a le nom de l'action. app/services/verb_
        # class qui a une methode call. 
        # gem interactor. 

class CreatePlaylist

  def self.call(params, user)
    playlist = Playlist.create(
      name: params[:name],
      acousticness: params[:acousticness],
      danceability: params[:danceability],
      valence: params[:valence],
      energy: params[:energy],
      popularity: params[:popularity],
      user: user
    )
  end

end
