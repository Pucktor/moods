const initSpotifyPlayer = () => {
  const spotifyPlayer = document.getElementById("spotify-player-iframe");
  if (spotifyPlayer) {

    let token = spotifyPlayer.dataset.spotifyToken;
    window.onSpotifyWebPlaybackSDKReady = () => {
      const tracks = JSON.parse(spotifyPlayer.dataset.playlistTracks);
      let position = 0;

      const play = ({
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken,
            id
          }
        }
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          })
        });
      };

      // initialize player
      const player = new Spotify.Player({
          name: 'Moods Player',
          getOAuthToken: cb => { cb(token); }
        });

      // connect player
      player.connect().then(success => {
        if (success) {
          console.log('Moods successfully connected to Spotify!', player);
          setTimeout(() => {
            play({
              playerInstance: player,
              spotify_uri: `spotify:track:${tracks[position].spotify_track_id}`,

            });
          }, 1000)
        }
      })

// -------------------------PLAYER LISTENERS----------------------------------

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();


// -------------------------BUTTONS AND USER INTERFACE--------------------------------------------


      // Playback titles updates
      const currentTrackTitle = document.getElementById('current-track-title');
      const currentTrackAlbum = document.getElementById('current-track-album');
      const currentTrackArtist = document.getElementById('current-track-artist');
      const currentTrackImage = document.getElementById('current-track-image');

      player.addListener('player_state_changed', state => {
        currentTrackTitle.innerText = state.track_window.current_track.name;
        currentTrackArtist.innerText = state.track_window.current_track.artists[0].name;
        currentTrackImage.src = state.track_window.current_track.album.images[0].url;
      });


        const playlistrow = document.querySelectorAll('tr').forEach(item => {
        item.addEventListener('click', event => {
          position = item.dataset.position;
          const imgUrl = item.dataset.imgUrl;
          play({
            playerInstance: player,
            spotify_uri: `spotify:track:${tracks[position].spotify_track_id}`,
          });
        })
      })

      // PLAY BUTTON
      const playButton = document.getElementById('play-button');

      playButton.addEventListener('click', (event) => {

        player.togglePlay().then(() => {
          const currentTrackImage = document.getElementById('current-track-image');
          const fontAwesome = document.getElementById('fontawesome-play-pause');
          fontAwesome.classList.toggle("fa-play");
          currentTrackImage.classList.toggle("paused");
        });
      });

      // NEXT BUTTON
      const nextButton = document.getElementById("next-button");

      nextButton.addEventListener('click', (event) => {
        event.preventDefault();
        position = ++position
        play({
            playerInstance: player,
            spotify_uri: `spotify:track:${tracks[position].spotify_track_id}`,
          });
      });

      // PREVIOUS BUTTON
      const previousButton = document.getElementById("previous-button");

      previousButton.addEventListener('click', (event) => {
        event.preventDefault();
        position = --position
        play({
            playerInstance: player,
            spotify_uri: `spotify:track:${tracks[position].spotify_track_id}`,
          });
      });
    };


    }
}

export { initSpotifyPlayer };
