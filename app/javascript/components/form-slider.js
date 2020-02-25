const formSlider = () => {
  const acousticness = document.getElementById('playlist_acousticness')
  acousticness.addEventListener('click', (event) => {
    const acousticnessValue = document.getElementById('playlist_acousticness-value')
    acousticnessValue.innerText = event.currentTarget.value;
  });

  const danceability = document.getElementById('playlist_danceability')
  danceability.addEventListener('click', (event) => {
    const danceabilityValue = document.getElementById('playlist_danceability-value')
    danceabilityValue.innerText = event.currentTarget.value;
  });

  const energy = document.getElementById('playlist_energy')
  energy.addEventListener('click', (event) => {
    const energyValue = document.getElementById('playlist_energy-value')
    energyValue.innerText = event.currentTarget.value;
  });

  const valence = document.getElementById('playlist_valence')
  valence.addEventListener('click', (event) => {
    const valenceValue = document.getElementById('playlist_valence-value')
    valenceValue.innerText = event.currentTarget.value;
  });

  const popularity = document.getElementById('playlist_popularity')
  popularity.addEventListener('click', (event) => {
    const popularityValue = document.getElementById('playlist_popularity-value')
    popularityValue.innerText = event.currentTarget.value;
  });
}

export { formSlider };
