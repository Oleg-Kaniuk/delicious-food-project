// Импортируем библиотеки axios (для выполнения HTTP-запросов) и Notiflix (для отображения уведомлений).
import axios from 'axios';
import Notiflix from 'notiflix';
// Устанавливаем базовый URL для выполнения HTTP-запросов.
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';
// Создаем объект refs для доступа к DOM-элементам.
const refs = {
  // Получаем ссылки на различные элементы модального окна и другие элементы.
  ratingModal: document.querySelector('.backdrop__rating'),
  openRatingModal: document.querySelector('.r-modal-rating-btn'),
  closeRatingModal: document.getElementById('close-btn-id', closeRatingModal),
  ratingForm: document.querySelector('.rating__form'),
  ratingRadio: document.querySelectorAll('.rating__radio'),
  ratingEmailInp: document.querySelector('.rating-form-input'),
  pElem: document.querySelector('.rating__value'),
  inputElem : document.querySelector('.rating__input'),
  body: document.body,
};
// Добавляем обработчики событий для кнопок и формы.
if (refs.closeRatingModal) {
    refs.closeRatingModal.addEventListener('click', closeRatingModal);
}
// if (refs.ratingForm) {
    refs.ratingForm.addEventListener('submit', submitRating);
// }
if (refs.openRatingModal) {
    refs.openRatingModal.addEventListener('click', openRatingModal);
}
if (refs.ratingModal) {
    refs.ratingModal.addEventListener('click', onBackdropClick);
}

// Обработчик клика по бэкдропу для закрытия модального окна.
function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeRatingModal();
  }
}
// Функция для закрытия модального окна.
function closeRatingModal() {
  refs.ratingModal.classList.add('is-hidden1');
  const top = document.body.style.top;
  refs.body.style.position = '';
  refs.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
  top;
}
// Функция для открытия модального окна оценки.
function openRatingModal() {
  const value = document.querySelector('.set__rating' > '.rating__value');
  refs.ratingRadio.forEach(radio => {
    radio.checked = false;
  });
  refs.ratingForm.reset();
  if (value) {
      value.innerHTML = 0.0;
  }
//   console.log(value);
  initRatings();
  refs.ratingModal.classList.remove('is-hidden1');
  refs.body.style.position = 'fixed';
  refs.body.style.top = -`${window.scrollY}px`;
}
// Экспортируем функцию initRatings для инициализации рейтинга.
export function initRatings() {
  // Получаем все элементы с классом 'rating'.
  const ratings = document.querySelectorAll('.rating');
  let ratingValue, ratingStars;
  // Проходимся по каждому рейтингу и инициализируем его.
  ratings.forEach(rating => {
    initRating(rating);
  });
  // Функция для инициализации рейтинга.
  function initRating(rating) {
    if (
      rating.classList.contains('card__rating') &&
      rating.lastElementChild.classList.contains('rating__value')
    ) {
      renderIcons(rating);
    }
    initRatingValues(rating);
    setActiveStars(ratingValue);
    // console.log(rating);
    if (rating.classList.contains('set__rating')) {
      rating.addEventListener('change', setNewValue);
    }
  }
  // Функция для инициализации значений рейтинга.
  function initRatingValues(rating) {
    ratingValue = rating.querySelector('.rating__value');
    ratingStars = rating.querySelectorAll('.rating__icon');
  }
  // Функция для установки активных звезд.
  function setActiveStars(count) {// = Math.floor(ratingValue)
    ratingStars.forEach(star => {
      star.classList.remove('active__star');
    });
    for (let i = 0; i < count; i+= 1) {
        const star = ratingStars[i];
      star.classList.add('active__star');
    }
  }
  // Функция для установки нового значения рейтинга.
  function setNewValue(e) {
    // console.log(e.target.value);
    ratingValue.innerHTML = `${e.target.value}.0`;
    setActiveStars(e.target.value);
  }
  // Функция для отрисовки иконок рейтинга.
  function renderIcons(rating) {
    const starWrap = document.createElement('div');
    for (let i = 0; i < 5; i++) {
      const starSvg = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      const starPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      starWrap.classList.add('card__star__wrap');
      starSvg.setAttribute('viewBox', '0 0 32 32');
      starSvg.setAttribute('width', '18');
      starSvg.setAttribute('height', '18');
      starSvg.classList.add('rating__icon');
        }
    }
}


function submitRating(params) {
    params.preventDefault()
    // const POST_COMMENT = `https://tasty-treats-backend.p.goit.global/api/orders/add?email=${refs.inputElem.value}&rating=${refs.pElem.textContent}`
   return axios.post('https://tasty-treats-backend.p.goit.global/api/orders/add', {
    name: 'Stive',
    // email: refs.inputElem.value,
    // rating: refs.pElem.textContent
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
}