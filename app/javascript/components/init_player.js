const initPlayer = () => {
  const spotifyPlayer = document.getElementById('spotify-player-iframe');
  if (spotifyPlayer) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      let token = spotifyPlayer.dataset.spotifyToken;
      let deviceId;
      const refreshToken = spotifyPlayer.dataset.spotifyRefreshToken;
      const playButton = document.getElementById('play-btn');

      const fetchNewToken = (callback) => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

          const urlencoded = new URLSearchParams();
          urlencoded.append("grant_type", "refresh_token");
          urlencoded.append("refresh_token", refreshToken);
          urlencoded.append("client_id", "62750ba1fb924428b4c6ae4845542d46");
          urlencoded.append("client_secret", "881423bf972f48b7aab19f7bd3220123");

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

      playButton.addEventListener('click', (event) => {
        event.preventDefault();
        fetchDeviceId();
        fetchUserInfo();
      })
    };
  }
}

export { initPlayer };
