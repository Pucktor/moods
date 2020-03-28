const navigation = () => {
  const menuIconEl = document.querySelector('.menu-icon');
  const sidenavEl = document.querySelector('.sidenav');
  const sidenavCloseEl = document.querySelector('.sidenav__close-icon');
  console.log(sidenavCloseEl);
  console.log(menuIconEl);
  // Open the side nav on click
  menuIconEl.addEventListener('click', (event) => {
    console.log(event);
    sidenavEl.classList.toggle("active");
  });

  // Close the side nav on click
  sidenavCloseEl.addEventListener('click', (event) => {
    console.log(event);
    sidenavEl.classList.toggle("active");
  });


}

export { navigation };
