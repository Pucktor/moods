const addActiveClassNav = (event) => {
  if (window.location.pathname === "/playlists/new") {
  const createPlaylistElement = document.getElementById("nav-create-item");
    createPlaylistElement.classList.toggle("active");
  }
};

export { addActiveClassNav };
