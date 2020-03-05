const playlistNameInput = () => {
  const input = document.getElementById("playlist-name");
  const name = document.getElementById("playlist_name");
  const form = document.querySelector("form");

  if (name) {
    form.addEventListener("submit", (event) => {
      name.value = input.value;
    });
  }
};

export { playlistNameInput };
