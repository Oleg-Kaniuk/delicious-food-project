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

// dark theme

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const body = document.querySelector('body')
const checkboxTheme = document.querySelector('.theme-switch__toggle')
console.log(checkboxTheme)
checkboxTheme.addEventListener('change', onChengeTheme)
function onChengeTheme(event) {
  console.log(event.currentTarget.checked)
  if (!event.currentTarget.checked) {
    body.classList.remove('dark-theme')
    localStorage.setItem('saveTheme', Theme.LIGHT)
    checkboxTheme.checked = false;
    
  } else {
    body.classList.add('dark-theme')
    localStorage.setItem('saveTheme', Theme.DARK)
    checkboxTheme.checked = true;
  }
}
const saveTheme = localStorage.getItem('saveTheme')
if (saveTheme === Theme.LIGHT) {
  body.classList.remove('dark-theme')
  checkboxTheme.checked = false
} else {
  body.classList.add('dark-theme')
  checkboxTheme.checked = true;
}





