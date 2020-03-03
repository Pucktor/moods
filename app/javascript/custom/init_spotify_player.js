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
          }, 500)
        }
      })

// -------------------------PLAYER LISTENERS----------------------------------

// Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });


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
        console.log(state);
        currentTrackTitle.innerText = state.track_window.current_track.name;
        currentTrackArtist.innerText = state.track_window.current_track.artists[0].name;
        // var jsonImage = JSON.parse(`https://open.spotify.com/oembed?url=${state.track_window.current_track.uri}`);
        // console.log('-----------------',jsonImage)
        currentTrackImage.src = state.track_window.current_track.album.images[0].url;

      });


        const trackListImage = document.querySelectorAll('.track-image').forEach(item => {
        item.addEventListener('click', event => {
          position = item.dataset.position;
          const imgUrl = item.dataset.imgUrl;
          console.log(imgUrl);
          play({
              playerInstance: player,
              spotify_uri: `spotify:track:${tracks[position].spotify_track_id}`,
            });const currentTrackImage = document.getElementById('current-track-image');
        })
      })

      // PLAY BUTTON
      const playButton = document.getElementById('play-button');

      playButton.addEventListener('click', (event) => {

        player.togglePlay().then(() => {
          console.log('Toggled play!');
        });
      });

      playButton.addEventListener('click', (event) => {
        const currentTrackImage = document.getElementById('current-track-image');
        const fontAwesome = document.getElementById('fontawesome-play-pause');
        fontAwesome.classList.toggle("fa-play");
        currentTrackImage.classList.toggle("spin");
      });


      // NEXT BUTTON
      const nextButton = document.getElementById("next-button");

      nextButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(event);
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
        console.log(event);
        position = --position
        play({
            playerInstance: player,
            spotify_uri: `spotify:track:${tracks[position].spotify_track_id}`,
          });
      });

      // REFRESH BUTTON
      const refreshButton = document.getElementById('refresh-button');

      refreshButton.addEventListener('click', (event) => {
        event.preventDefault();
        fetchDeviceId();
        fetchUserInfo();
        console.log('--------------------',token);
      })

    };


    }
}

export { initSpotifyPlayer };
