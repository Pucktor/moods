const playlistNameInput = () => {
  const input = document.getElementById("playlist-name");
  const name = document.getElementById("playlist_name");
  const form = document.querySelector("form");

  if (window.location.pathname === '/playlists/new') {
    form.addEventListener("submit", (event) => {
      name.value = input.value;
    });
  } else if (window.location.pathname.slice(-5) === '/edit') {
    input.value = name.value;
  }
};

export { playlistNameInput };
