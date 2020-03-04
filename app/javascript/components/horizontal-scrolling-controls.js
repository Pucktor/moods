const horizontalScrollingControls = () => {
  const playlist_path = window.location.pathname == '/playlists';
  const root_path = window.location.pathname == '/';

  if (playlist_path || root_path) {
    const horizontalOffset = window.innerWidth * 0.65 ;
    const sliderContent = document.getElementById('horizontal-slider') ;
    const previousController = document.querySelector('[data-slide=prev]') ;
    const nextController = document.querySelector('[data-slide=next]') ;

    if (sliderContent.children.item(0) == null) {
      nextController.classList.remove('active-controls');
    } else {
      const cardWidth = sliderContent.children.item(0).offsetWidth ;
      const cardsWidth = cardWidth * 1.1 * sliderContent.children.length;

      if (cardsWidth < window.innerWidth) {
        nextController.classList.remove('active-controls');
      }

      previousController.addEventListener('click', (event) => {
        event.preventDefault();
        sliderContent.scroll({left: sliderContent.scrollLeft - horizontalOffset, behavior: 'smooth'}) ;
      });

      nextController.addEventListener('click', (event) => {
        event.preventDefault();
        previousController.classList.add('active-controls');
        sliderContent.scroll({left: sliderContent.scrollLeft + horizontalOffset, behavior: 'smooth'}) ;
      });
    };
  };
}

export { horizontalScrollingControls };
