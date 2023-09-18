const headerLinks = document.querySelectorAll('.main-link');
document.addEventListener('DOMContentLoaded', changeActiveColor);

function changeActiveColor() {
  const location = window.location.href;
  if (location.endsWith("favorites.html")
  ) {
    headerLinks[1].classList.add('heder-active');
    headerLinks[0].classList.remove('heder-active');
  } else {
    headerLinks[0].classList.add('heder-active');
    headerLinks[1].classList.remove('heder-active');
  }
}