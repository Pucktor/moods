
const iframeResizer = () => {
  const spotifyIframe = document.getElementById('spotify-player-iframe');
  if (spotifyIframe) {
    const iframeContainer = document.querySelector('.playlist-container');
    spotifyIframe.setAttribute('width', iframeContainer.offsetWidth);
    window.addEventListener('resize', (event) => {
      const newHeight = iframeContainer.offsetWidth
      spotifyIframe.setAttribute('width', newHeight);
    });
  }
}

export { iframeResizer };
