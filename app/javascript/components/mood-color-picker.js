const moodColorPicker = () => {
  const moods = document.querySelectorAll(".mood-color-picker");
  moods.forEach((mood) => {
    mood.addEventListener("click", (event) => {
      moods.forEach((mood) => {
        mood.classList.remove('active');
        });

      event.currentTarget.classList.add('active');
      const colorName = event.currentTarget.textContent;
      const colorSelected = document.getElementById('playlist_color');
      colorSelected.value = colorName;

    });
  });
};

export { moodColorPicker };
