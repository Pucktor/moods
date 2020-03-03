const horizontalScrollingControls = () => {
  console.log(window.innerWidth);
  const horizontalOffset = window.innerWidth * 0.65 ;
  const sliderContent = document.getElementById('horizontal-slider')
  const previousController = document.querySelector('[data-slide=prev]')
  const nextController = document.querySelector('[data-slide=next]')

  previousController.addEventListener('click', (event) => {
    event.preventDefault();
    sliderContent.scroll({left: sliderContent.scrollLeft - horizontalOffset, behavior: 'smooth'}) ;
  });

  nextController.addEventListener('click', (event) => {
    event.preventDefault();
    previousController.classList.add('active-controls');
    sliderContent.scroll({left: sliderContent.scrollLeft + horizontalOffset, behavior: 'smooth'}) ;
  });
}

export { horizontalScrollingControls };
