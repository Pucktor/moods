const addActiveClassNav = (event) => {
  const createPlaylistElement = document.getElementById("nav-create-item");
  if (window.location.pathname === "/playlists/new") {
    createPlaylistElement.classList.toggle("active");
  }
};

export { addActiveClassNav };
