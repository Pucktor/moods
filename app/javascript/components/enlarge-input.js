const enlargeInput = () => {

  if (window.location.pathname == '/playlists/new') {
    const inputValue = document.querySelector("#playlist_name");
    inputValue.addEventListener("input", (event) => {
      var spaceCount = (inputValue.value.split(" ").length - 1);
      event.currentTarget.style.width = 1 + event.currentTarget.value.length - 0.8 * spaceCount + "ch";
    });
  } else if (window.location.pathname.slice(-5) == '/edit') {
    const inputValue = document.querySelector("#playlist_name");
    inputValue.style.width = inputValue.value.length + "ch";
  }
}

export { enlargeInput };
