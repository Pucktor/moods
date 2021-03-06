// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

import "bootstrap";
// import { formSlider } from '../components/form-slider';

// formSlider();
import { initSelect2 } from '../plugins/init_select2';
import { initSpotifyPlayer } from '../custom/init_spotify_player';
// import { addActiveClassNav } from '../components/navigation';
// import { iframeResizer } from '../components/iframe-resizer';
import { sliderRange } from '../components/slider';
// import { initPlayer } from '../components/init_player';
import { moodColorPicker } from '../components/mood-color-picker';
import { horizontalScrollingControls } from '../components/horizontal-scrolling-controls';
import { enlargeInput } from '../components/enlarge-input';
import { initSpin } from '../plugins/init_spin';
import { playlistNameInput } from '../components/playlist-name-input';
import { navigation } from '../components/sidenav';

document.addEventListener('turbolinks:load', () => {
  initSpotifyPlayer();
  moodColorPicker();
  initSelect2();
  sliderRange();
  enlargeInput();
  playlistNameInput();
  horizontalScrollingControls();
  navigation();

  const createPlaylistButton = document.querySelector('form');
  if (createPlaylistButton) {
    createPlaylistButton.addEventListener('submit', (event) => {
      initSpin();
    });
  }
  const refreshPlaylistButton = document.getElementById('add-button');
  if (refreshPlaylistButton) {
    refreshPlaylistButton.addEventListener('click', (event) => {
      initSpin();
    });
  }
});
