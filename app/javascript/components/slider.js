
const sliderRange = () => {

const sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {
    const valeur = slider.value;
    slider.style.background = 'linear-gradient(to right, rgba(9,142,237,1) 0%, rgba(10,207,213,1) ' + valeur*100 + '%, #fff ' + valeur*100 + '%, white 100%)';

    slider.oninput = function() {
    this.style.background = 'linear-gradient(to right, rgba(9,142,237,1) 0%, rgba(10,207,213,1) ' + this.value*100 + '%, #fff ' + this.value*100 + '%, white 100%)'
    };
});
}
// const sliderRange = () => {
// document.getElementById("myinput").oninput = function() {
//   this.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + this.value*100 + '%, #fff ' + this.value*100 + '%, white 100%)'
//   };
// }


export { sliderRange };
