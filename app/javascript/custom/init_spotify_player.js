const initSpotifyPlayer = () => {
  const playerElement = document.getElementById("player");
  if (playerElement) {

    window.onSpotifyWebPlaybackSDKReady = () => {
    //CONNECT CONFIRMATION

      const play = ({
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken,
            id
          }
        }
      }) => {
        console.log(id);
        console.log(spotify_uri);
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

      const token = 'BQCXQ1yDhKgUEW0iJRHyVEj_mTJWX6BMJqSUziAYfQ8aQkCuntBVqRnDfJ5uBwVZOCuORZRWM-ZzyJNUeSoKu-eYL_r1mujjowluM1OtrvGVMXSkpdNdCxNbcabaGoFWS_iguMO24kvcGce-oJY6d0_ig1URnQIbEzZsA11U7F8J1lw1F_szhm1mhkX3SuzfXrGouiAAP6g-58XZ-tPieWWH_nSxxvcas1rBNguuVuo--jsSmb8mahtPpBuMY-mWl4oAOvNYwp-zSQ';

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
              spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
            });
          }, 1000)
        }
      })
        // console.log('--->', player)
        // play({
        //   playerInstance: player,
        //   spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
        // });

        // PLAY BUTTON

        const playButton = document.getElementById("play-button");

        playButton.addEventListener('click', (event) => {
          event.preventDefault();
          console.log(event);
          player.togglePlay().then(() => {
            console.log('Toggled play!');
          });
        });

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
