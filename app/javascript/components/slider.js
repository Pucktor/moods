
const sliderRange = () => {

const sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {

  const valeur = slider.value;
  const name = slider.name;

  if (name == "playlist[popularity]") {
    slider.style.background = 'linear-gradient(to right, rgba(9,142,237,1) 0%, rgba(10,207,213,1) ' + valeur + '%, #fff ' + valeur + '%, transparent 100%)';
    slider.oninput = function() {
    this.style.background = 'linear-gradient(to right, rgba(9,142,237,1) 0%, rgba(10,207,213,1) ' + this.value + '%, #fff ' + this.value + '%, transparent 100%)'
    };
  }
  else {
    slider.style.background = 'linear-gradient(to right, rgba(9,142,237,1) 0%, rgba(10,207,213,1) ' + valeur*100 + '%, #fff ' + valeur*100 + '%, transparent 100%)';
    slider.oninput = function() {
    this.style.background = 'linear-gradient(to right, rgba(9,142,237,1) 0%, rgba(10,207,213,1) ' + this.value*100 + '%, #fff ' + this.value*100 + '%, transparent 100%)'
  };
  }

});
}

export { sliderRange };
