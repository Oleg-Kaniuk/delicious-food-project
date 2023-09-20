// const Theme = {
//   LIGHT: 'light-theme',
//   DARK: 'dark-theme',
// };
// const body = document.querySelector('body')
// const checkboxTheme = document.querySelector('.theme-switch__toggle')
// console.log(checkboxTheme)
// checkboxTheme.addEventListener('change', onChengeTheme)
// function onChengeTheme(event) {
//   console.log(event.currentTarget.checked)
//   if (!event.currentTarget.checked) {
//     body.classList.remove('dark-theme')
//     localStorage.setItem('saveTheme', Theme.LIGHT)
//   } else {
//     body.classList.add('dark-theme')
//     localStorage.setItem('saveTheme', Theme.DARK)
//   }
// }
// const saveTheme = localStorage.getItem('saveTheme')
// if (saveTheme === Theme.LIGHT) {
//   body.classList.remove('dark-theme')
//   checkboxTheme.checked = false
// } else {
//   body.classList.add('dark-theme')
//   checkboxTheme.checked = false
// }
