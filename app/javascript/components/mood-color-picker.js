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
      const cadre = document.querySelector(".card.example");
      cadre.style.background = colorName;
    });
  });
};

export { moodColorPicker };
