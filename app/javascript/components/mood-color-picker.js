const moodColorPicker = () => {
  const moodcolors = document.querySelectorAll(".mood-color-picker");
  moodcolors.forEach((mood) => {
    mood.addEventListener("click", (event) => {
      moodcolors.forEach((mood) => {
        mood.classList.remove('activemood');
        });

      event.currentTarget.classList.add('activemood');
      const colorName = event.currentTarget.textContent;
      const colorSelected = document.getElementById('playlist_color');
      colorSelected.value = colorName;

      const card = document.querySelector(".card.example");
      const acousticness = document.querySelector("div.vbar-div > div:nth-child(1) > div.filledvbar.example");
      const danceability = document.querySelector("div.vbar-div > div:nth-child(2) > div.filledvbar.example");
      const energy = document.querySelector("div.vbar-div > div:nth-child(3) > div.filledvbar.example");
      const valence = document.querySelector("div.vbar-div > div:nth-child(4) > div.filledvbar.example");
      const popularity = document.querySelector("div.vbar-div > div:nth-child(5) > div.filledvbar.example");
      const sliderBgAcousticness = document.querySelector(".slider-bg.acousticness");
      const sliderBgDanceability = document.querySelector(".slider-bg.danceability");
      const sliderBgEnergy = document.querySelector(".slider-bg.energy");
      const sliderBgValence = document.querySelector(".slider-bg.valence");
      const sliderBgPopularity = document.querySelector(".slider-bg.popularity");

      sliderBgAcousticness.style.backgroundImage = event.currentTarget.style.backgroundImage;
      sliderBgDanceability.style.backgroundImage = event.currentTarget.style.backgroundImage;
      sliderBgEnergy.style.backgroundImage = event.currentTarget.style.backgroundImage;
      sliderBgValence.style.backgroundImage = event.currentTarget.style.backgroundImage;
      sliderBgPopularity.style.backgroundImage = event.currentTarget.style.backgroundImage;

      card.style.backgroundImage = event.currentTarget.style.backgroundImage;
      acousticness.style.backgroundImage = event.currentTarget.style.backgroundImage;
      danceability.style.backgroundImage = event.currentTarget.style.backgroundImage;
      energy.style.backgroundImage = event.currentTarget.style.backgroundImage;
      valence.style.backgroundImage = event.currentTarget.style.backgroundImage;
      popularity.style.backgroundImage = event.currentTarget.style.backgroundImage;

    });
  });
};

export { moodColorPicker };
