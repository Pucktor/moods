const initSpotifyPlayer = () => {
  const spotifyPlayer = document.getElementById("spotify-player-iframe");
  if (spotifyPlayer) {

    window.onSpotifyWebPlaybackSDKReady = () => {
      let token = 'BQB0ARt2gf5rcpBhCQIsWxhzm5VVDd846wSSw9NvOOucbSKqmoAKzrgQ67MEJgA2zXTDemn8GLWnhDkNEFH1XKCxWOunHM12qLEyEDFEjMMjXQ52rqEZI_428QPQhhICQsEgJwrHOkKNJDwVteMsKk7pJUsf6Q0BVfK7ghWdVlXdg5P8h99ukIhTY9g2OhY4gDfXpTq_qZLkce0s6o9ZFcp9BPucgp6bPulScfzK1muj4Z0r1FxH4LWT2HZSqtTXyLnHrA';
      // let token = spotifyPlayer.dataset.spotifyToken;
      const tracks = JSON.parse(spotifyPlayer.dataset.playlistTracks);
      let position = 0
      console.log(typeof tracks)
      console.log(tracks[1].spotify_track_id)

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
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(token); }
        });

      player.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!', player);
          setTimeout(() => {
            play({
              playerInstance: player,
              spotify_uri: `spotify:track:${tracks[position].spotify_track_id}`,

            });
          }, 500)
        }
      })

      player.getCurrentState().then(state => {
        if (!state) {
          console.error('User is not playing music through the Web Playback SDK');
          return;
        }

        let {
          current_track,
          next_tracks: [next_track]
        } = state.track_window;

        console.log('Currently Playing', current_track);
        console.log('Playing Next', next_track);
      });

      const playButton = document.getElementById('play-button');
      const previousButton = document.getElementById("previous-button");
      const nextButton = document.getElementById("next-button");
      const refreshButton = document.getElementById('refresh-button');


      // PLAY BUTTON

      playButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(event);
        player.togglePlay().then(() => {
          console.log('Toggled play!');
        });
      });

      // NEXT BUTTON

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

      refreshButton.addEventListener('click', (event) => {
        event.preventDefault();
        fetchDeviceId();
        fetchUserInfo();
        console.log('--------------------',token);
      })

    };

// --------------------------------------------------------------



// player.addListener('ready', ({ device_id }) => {
//   console.log('The Web Playback SDK is ready to play music!');
//   console.log('Device ID', device_id);
// })

//     player.on('ready', data => {
//     console.log('Ready with Device ID', data.device_id);

//     // Play a track using our new device ID
//     play(data.device_id);
//   });

    //PLAYER
    // const player = new Spotify.Player({
    //   name: 'Carly Rae Jepsen Player',
    //   getOAuthToken: callback => {
    //     callback('BQAvLUysJsDa1DE95pBR7mt5Y652MMbk-McGD5vfmBbY72x2LxwoCHqAGCK7lHNTSZtr4WNCF8c_EDpjvElP1i7PqAd_PIpBXq6glTg68DTL87cQiVnVeAPmcJz0pwbPCc6ImtEFsX2rfXc4AZxFwRq0EtY3lbI');
    //   },
    //   volume: 0.5
    // });



    // const playButton = document.getElementById("play-button");
    // const previousButton = document.getElementById("previous-button");
    // const nextButton = document.getElementById("next-button");

    //     // Ready
    //     player.addListener('ready', ({ device_id }) => {
    //       console.log('Ready with Device ID', device_id);
    //     });

        // // PLAY BUTTON
        // playButton.addEventListener('click', (event) => {
        //   event.preventDefault();
        //   console.log(event);
        //   player.togglePlay().then(() => {
        //     console.log('Toggled play!');
        //   });
        // });

    //     // NEXT BUTTON
    //     nextButton.addEventListener('click', (event) => {
    //       event.preventDefault();
    //       console.log(event);
    //       player.nextTrack().then(() => {
    //         console.log('Skipped to next track!');
    //       });
    //     });

    //     // Error handling
    //     player.addListener('initialization_error', ({ message }) => { console.error(message); });
    //     player.addListener('authentication_error', ({ message }) => { console.error(message); });
    //     player.addListener('account_error', ({ message }) => { console.error(message); });
    //     player.addListener('playback_error', ({ message }) => { console.error(message); });


    //     previousButton.addEventListener('click', (event) => {
    //       event.preventDefault();
    //       console.log(event);
    //       player.previousTrack().then(() => {
    //         console.log('Set to previous track!');
    //       });
    //     });

    // nextButton.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   console.log(event);
    //   player.nextTrack().then(() => {
    //     console.log('Skipped to next track!');
    //   });
    // });
    //     // Playback status updates
    //     player.addListener('player_state_changed', state => { console.log(state); });



    //     // Not Ready
    //     player.addListener('not_ready', ({ device_id }) => {
    //       console.log('Device ID has gone offline', device_id);
    //     });

    //     // Connect to the player!
    //     player.connect();
    //   };
    }
}

export { initSpotifyPlayer };
