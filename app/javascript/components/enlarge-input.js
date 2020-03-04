const enlargeInput = () => {

  if (window.location.pathname == '/playlists/new') {
    const inputValue = document.querySelector("#playlist-name");
    const cardName = document.querySelector(".card-title");
    inputValue.addEventListener("input", (event) => {
      var spaceCount = (inputValue.value.split(" ").length - 1);
      event.currentTarget.style.width = 1 + event.currentTarget.value.length - 0.8 * spaceCount + "ch";
      cardName.innerText = event.currentTarget.value;

    });
  } else if (window.location.pathname.slice(-5) == '/edit') {
    const inputValue = document.querySelector("#playlist-name");
    const cardName = document.querySelector(".card-title");
    inputValue.style.width = inputValue.value.length + "ch";
    inputValue.addEventListener("input", (event) => {
      var spaceCount = (inputValue.value.split(" ").length - 1);
      event.currentTarget.style.width = 1 + event.currentTarget.value.length - 0.8 * spaceCount + "ch";
      cardName.innerText = event.currentTarget.value;
    });
  }
}

export { enlargeInput };
