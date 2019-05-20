$(function() {
  const authLinks = document.querySelectorAll('.group a');
  const toggleNav = document.getElementsByClassName('nav-toggle')
  const toggledMenu = document.getElementsByClassName('nav')

  const toggleAuth = event => {
    event.preventDefault();
    const headerContent = document.getElementsByClassName("header-content");

    for (let index = 0; index < headerContent.length; index++) {
      const element = headerContent[index];
      element.classList.toggle("hide-class");
    }
  };

  const toggleMenu = event => {
    toggleNav[0].classList.toggle('expanded')
    toggledMenu[0].classList.toggle('expanded')
  }


  toggleNav[0] ? toggleNav[0].addEventListener('click', toggleMenu) : console.log('index');

  if (authLinks[0]) {
    for (let index = 0; index < authLinks.length; index++) {
      const element = authLinks[index];
      element.addEventListener("click", toggleAuth);
    }
  }
});
