// Импортируем библиотеки axios (для выполнения HTTP-запросов) и Notiflix (для отображения уведомлений).
import axios from 'axios';
import Notiflix from 'notiflix';
// Устанавливаем базовый URL для выполнения HTTP-запросов.
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';
import { expId } from '../modal-recipe/modal-recipe';
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
if (refs.ratingForm) {
  refs.ratingForm.addEventListener('submit', submitRating);
}
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
  document.addEventListener("keydown", onClickEscapeNow)
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
function onClickEscapeNow(e) { 
  console.log(e) 
  if (e.code === "Escape") { 
  refs.ratingModal.classList.add('is-hidden1');
  refs.body.style.position = '';
  refs.body.style.top = '';
     document.removeEventListener("keydown", onClickEscapeNow) 
  } 
}
// Экспортируем функцию initRatings для инициализации рейтинга.
export function initRatings() {
  // Получаем все элементы с классом 'rating'.
  const ratings = document.querySelectorAll('.set__rating');
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
    ratingValue.setAttribute('value', e.target.value)
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
  const pValue = Number(refs.pElem.getAttribute('value'))
  const inputValue =  refs.inputElem.value
  const {_id} = expId
// const POST_COMMENT = `https://tasty-treats-backend.p.goit.global/api/orders/add`
const url = `https://tasty-treats-backend.p.goit.global/api/recipes/${_id}/rating` 
const res =  axios.patch(url, {
    rate: pValue,
    email: inputValue
}).then(data =>{
// Notiflix.Notify.success('Your evaluation has been sent');
refs.pElem.innerHTML = `0.0`;
refs.pElem.setAttribute('value', '0')
refs.ratingModal.classList.add('is-hidden1');
refs.body.style.position = '';
  refs.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
}).catch(err =>{
// Notiflix.Notify.failure('Error. Your score could not be submitted');
refs.pElem.setAttribute('value', '0')
refs.pElem.innerHTML = `0.0`;
refs.ratingModal.classList.add('is-hidden1');
refs.body.style.position = '';
  refs.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
})
}
