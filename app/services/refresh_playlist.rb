class RefreshPlaylist
  def self.call(playlist, spotify_user)
      recommendations = GetSpotifyRecommendationsFromSettings.call(playlist)
      tracks = get_only_new_tracks(playlist, recommendations)
      playlist.tracks << tracks
      new_playlist_tracks = UpdateStatusOnPlaylistTracks.call(playlist)
      if new_playlist_tracks.any?
        spotify_tracks = get_spotify_tracks(new_playlist_tracks)
        spotify_playlist = get_playlist_from_spotify(playlist, spotify_user)
        UpdateSpotifyPlaylist.call(playlist, spotify_playlist, spotify_tracks)
      end
      playlist
  end

  def self.get_only_new_tracks(playlist, recommendations)
    tracks = []
    recommendations.each do |track|
      unless playlist.tracks.pluck(:spotify_track_id).include?(track.id)
        json_image = JSON.parse(open("https://open.spotify.com/oembed?url=spotify:track:#{track.id}").read)
        tracks << Track.new(
          title: track.name,
          artist: track.artists.first.name,
          album: track.album.name,
          spotify_track_id: track.id,
          image_url: json_image['thumbnail_url']
        )
      end
    end
    tracks
  end

  def self.get_spotify_tracks(tracks)
    RSpotify.authenticate(ENV["SPOTIFY_CLIENT_ID"], ENV["SPOTIFY_CLIENT_SECRET"])
    spotify_tracks = []
    tracks.each do |track|
      spotify_tracks << RSpotify::Track.find(track.spotify_track_id)
    end
    spotify_tracks
  end

  def self.get_playlist_from_spotify(playlist, spotify_user)
    RSpotify.authenticate(ENV["SPOTIFY_CLIENT_ID"], ENV["SPOTIFY_CLIENT_SECRET"])
    RSpotify::Playlist.find(spotify_user.id, playlist.spotify_id)
  end
end
