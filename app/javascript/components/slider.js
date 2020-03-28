const sliderRange = () => {

const sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {

  const valeur = slider.value;
  const name = slider.name;

  if (name === "playlist[popularity]") {
    slider.style.background = 'linear-gradient(to right, transparent 0%, transparent ' + valeur + '%, #1B1B1B ' + valeur + '%, #1B1B1B 100%)';
    slider.oninput = function() {
      this.style.background = 'linear-gradient(to right, transparent 0%, transparent ' + this.value + '%, #1B1B1B ' + this.value + '%, #1B1B1B 100%)';
      const bar = document.querySelector("div.vbar-div > div:nth-child(5)");
      bar.style.height = `calc(${this.value}/100 * 140px)`;
      const sliderImgPopularity = document.querySelector('.slider-img.popularity img');
        sliderImgPopularity.style.left = `calc(${this.value}/100 * 92% + 5px`;
    };
  }
  else {
    slider.style.background = 'linear-gradient(to right, transparent 0%, transparent ' + valeur*100 + '%, #1B1B1B ' + valeur*100 + '%, #1B1B1B 100%)';
    slider.oninput = function() {
      this.style.background = 'linear-gradient(to right, transparent 0%, transparent ' + this.value*100 + '%, #1B1B1B ' + this.value *  100 + '%, #1B1B1B 100%)';

      if (this.id === "playlist_acousticness") {
        const bar = document.querySelector("div.vbar-div > div:nth-child(1)");
        bar.style.height = `calc(${this.value} * 140px)`;
        const sliderImgAcousticness = document.querySelector('.slider-img.acousticness img');
        sliderImgAcousticness.style.left = `calc(${this.value} * 92% + 5px`;
      } else if (this.id === "playlist_danceability") {
        const bar = document.querySelector("div.vbar-div > div:nth-child(2)");
        bar.style.height = `calc(${this.value} * 140px)`;
        const sliderImgDanceability = document.querySelector('.slider-img.danceability img');
        sliderImgDanceability.style.left = `calc(${this.value} * 92% + 5px`;
      } else if (this.id === "playlist_energy") {
        const bar = document.querySelector("div.vbar-div > div:nth-child(3)");
        bar.style.height = `calc(${this.value} * 140px)`;
        const sliderImgEnergy = document.querySelector('.slider-img.energy img');
        sliderImgEnergy.style.left = `calc(${this.value} * 92% + 5px`;
      } else if (this.id === "playlist_valence") {
        const bar = document.querySelector("div.vbar-div > div:nth-child(4)");
        bar.style.height = `calc(${this.value} * 140px)`;
        const sliderImgValence = document.querySelector('.slider-img.valence img');
        sliderImgValence.style.left = `calc(${this.value} * 92% + 5px`;
      }
      ;
    };
  }
});
}

export { sliderRange };
