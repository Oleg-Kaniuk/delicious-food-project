const heroModalBtn = document.querySelector('.js-hero-btn')
const backdrop = document.querySelector('.js-backdrop')


heroModalBtn.addEventListener('click', heroModalOpen)

function heroModalOpen(evt) {
    backdrop.classList.remove("is-hidden")
}