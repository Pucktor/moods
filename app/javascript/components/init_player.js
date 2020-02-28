const initPlayer = () => {
  const spotifyPlayer = document.getElementById('spotify-player-iframe');
  if (spotifyPlayer) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      let token = spotifyPlayer.dataset.spotifyToken;
      const refreshToken = spotifyPlayer.dataset.spotifyRefreshToken;
      const playButton = document.getElementById('play-btn');

      const fetchNewToken = () => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

          const urlencoded = new URLSearchParams();
          urlencoded.append("grant_type", "refresh_token");
          urlencoded.append("refresh_token", "AQB_eA0y1uwUOmsIqADCakQ8ScqoGHWFRmFO_ZQowh6F7qO7Mwt7RklUMwhzkZrR1dGTbDHiWVcq4IiJaJqkErqHEZsq2m4cIHDz9a4LAn6zmOXCakXjR7ZHHTztkKUgqSA");
          urlencoded.append("client_id", "62750ba1fb924428b4c6ae4845542d46");
          urlencoded.append("client_secret", "881423bf972f48b7aab19f7bd3220123");

          fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded
          }).then(response => response.json())
            .then((data) => {
              token = data.access_token;
            });
        } catch (error) {
          console.log(error);
        }
      }

      
      const fetchUserInfo = () => {
        try {
          fetchNewToken();
          fetch("https://api.spotify.com/v1/me", {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then(response => response.json())
          .then((data) => {
            console.log(data)
          })
        } catch (error) {
          console.log(error)
        }
      };

      const fetchDeviceId = () => {
        try {
          fetchNewToken();
          fetch("https://api.spotify.com/v1/me/player/play", {
            method: 'PUT',
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({})
            }).then(response => response.json())
              .then((data) => {
                console.log(data)
              })
        } catch (error) {
          console.log(error)
        }
      }

      playButton.addEventListener('click', (event) => {
        event.preventDefault();
        fetchUserInfo();
        fetchDeviceId();
      })
    };
  }
}

export { initPlayer };
