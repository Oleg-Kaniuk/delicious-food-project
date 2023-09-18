const heroModalBtn = document.querySelector('.js-hero-btn')
const backdrop = document.querySelector('.js-backdrop')

if(heroModalBtn){heroModalBtn.addEventListener('click', heroModalOpen)}


function heroModalOpen(evt) {
   return backdrop.classList.remove("is-hidden")
}