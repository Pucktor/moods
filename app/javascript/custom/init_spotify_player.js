const initSpotifyPlayer = () => {
  const spotifyPlayer = document.getElementById("spotify-player-iframe");
  if (spotifyPlayer) {

    window.onSpotifyWebPlaybackSDKReady = () => {
      let token = 'BQBksuOl2SR6J2_QZTVUfU0TkqOYt-7bu8v0wRto4UdtBodo4fp8fBWnAHyjyHnJsjgLFXUOQDfE1dylnPfaQa6SEBc6HxiEN-zhKqbcsxvnRZrV7GJyytI2fP75wqIyYy-eXb_qAV9EQE4BuOzEGW8p3lCW6G3lJD_tcnzX3aFlYaX-P_bKZOTCTdCxFQJ_6TgHRT1H7BgFo45Ixm8sxFqvHEwnCKB4OVKEm23Sa7vIbPetO0n_p9x7SD6Nv7gEDW5tzw';
      // let token = spotifyPlayer.dataset.spotifyToken;
      const tracks = JSON.parse(spotifyPlayer.dataset.playlistTracks);
      let position = 0;

      let deviceId;
      const refreshToken = spotifyPlayer.dataset.spotifyRefreshToken;

      const fetchNewToken = (callback) => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

          const urlencoded = new URLSearchParams();
          urlencoded.append("grant_type", "refresh_token");
          urlencoded.append("refresh_token", refreshToken);
          urlencoded.append("client_id", "99b2d888ddd94505a2e4d3e02c68fe47");
          urlencoded.append("client_secret", "131ff6e9a9644e0595d01a0492c41eab");

          fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded
          }).then(response => response.json())
            .then((data) => {
              token = data.access_token;
              console.log('Token updated!')
              callback();
            });
        } catch (error) {
          console.log(error);
        }
      }


      const fetchUserInfo = () => {
        try {
          fetchNewToken(
            () => {
              fetch("https://api.spotify.com/v1/me", {
                method: 'GET',
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              }).then(response => response.json())
                .then((data) => {
                  console.log(data)
                })
            }
          );
        } catch (error) {
          console.log(error)
        }
      };

      const fetchDeviceId = () => {
        try {
          fetchNewToken(
            () => {
              fetch("https://api.spotify.com/v1/me/player/devices", {
                method: 'GET',
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              }).then(response => response.json())
                .then((data) => {
                  let deviceId = data.devices["0"].id;
                  console.log(deviceId);
                })
            }
          );
        } catch (error) {
          console.log(error)
        }
      }

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
          fetch('https://api.spotify.com/v1/me/player/devices', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            }
          }).then(response => response.json())
            .then(data => {

            })
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          }).then(response => response.body)
            .then( data => {
              console.log('--->',data);
            });
        });
      };

      const player = new Spotify.Player({
          name: 'Moods Player',
          getOAuthToken: cb => { cb(token); }
        });

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
        currentTrackImage.classList.toggle("paused");
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
