
const sliderRange = () => {

const sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {

  const valeur = slider.value;
  const name = slider.name;

  if (name === "playlist[popularity]") {
    slider.style.background = 'linear-gradient(to right, rgba(9,142,237,1) 0%, rgba(137, 255, 253, 0.9) ' + valeur + '%, #fff ' + valeur + '%, transparent 100%)';
    slider.oninput = function() {
      this.style.background = 'linear-gradient(to right, rgba(9,142,237,1) 0%, rgba(137, 255, 253, 0.9) ' + this.value + '%, #fff ' + this.value + '%, transparent 100%)';
      const bar = document.querySelector("div.vbar-div > div:nth-child(5)");
      bar.style.height = `calc(${this.value}/100 * 140px)`;
    };
  }
  else {
    slider.style.background = 'linear-gradient(to right, rgba(9,142,237,1) 0%, rgba(137, 255, 253, 0.9) ' + valeur*100 + '%, #fff ' + valeur*100 + '%, transparent 100%)';
    slider.oninput = function() {
      this.style.background = 'linear-gradient(to right, rgba(9,142,237,1) 0%, rgba(137, 255, 253, 0.9) ' + this.value*100 + '%, #fff ' + this.value *  100 + '%, transparent 100%)';
      if (this.id === "playlist_acousticness") {
        const bar = document.querySelector("div.vbar-div > div:nth-child(1)");
        bar.style.height = `calc(${this.value} * 140px)`;
      } else if (this.id === "playlist_danceability") {
        const bar = document.querySelector("div.vbar-div > div:nth-child(2)");
        bar.style.height = `calc(${this.value} * 140px)`;
      } else if (this.id === "playlist_energy") {
        const bar = document.querySelector("div.vbar-div > div:nth-child(3)");
        bar.style.height = `calc(${this.value} * 140px)`;
      } else if (this.id === "playlist_valence") {
        const bar = document.querySelector("div.vbar-div > div:nth-child(4)");
        bar.style.height = `calc(${this.value} * 140px)`;
      }
      ;
    };
  }
});
}

export { sliderRange };
