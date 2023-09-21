// import {createGoldStarOneEl} from '/js/favorites/favorites.js'
import imgUrl from '../../img/icon-sprite.svg'

async function allInfoRecipes(id) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
  const response = await fetch(`${BASE_URL}recipes/${id}`);
  const recipes = await response.json();
  return recipes;
}
const modalClose = document.querySelector('.modal-close-recipe-btn');
const modalWindow = document.querySelector('.recipe-info');
export const backdropElem = document.querySelector('.recipe-backdrop');
const storageButton = document.querySelector('.add-btn');
const removeStorageBtn = document.querySelector('.remove-btn');

// змінна на експорт до modal-rating
export let expId = '';

// Відкриття модалки
export function onModal(id) {
  document.addEventListener('keydown', onClickEscapeModalSee);
  backdropElem.addEventListener('click', onclickBackdropModalSee);
  backdropElem.classList.remove('is-hidden-recipe-backdrop');
  allInfoRecipes(id)
    .then(data => {
      createMarkupInfoRecipes(data);
      createGoldStarForOneEl(data)
    
    })
    .catch(error => console.log(error));
}

function createMarkupInfoRecipes(arr) {
  modalWindow.innerHTML = '';
  expId = arr;
  const {
    _id,
    thumb,
    area,
    youtube,
    instructions,
    rating,
    time,
    title,
    ingredients,
    tags,
  } = arr;

  storageButton.id = _id;
// removeStorageBtn.id=_id;

  const youtubeWatch = youtube.replace('https://www.youtube.com/watch?v=', '');
  const youtubeEmbed = `<iframe class="modal-recipe-image" src="https://www.youtube.com/embed/${youtubeWatch}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`;
  const imgData = `<img class="modal-recipe-image" src="${thumb}" alt="${title}" max-width="295px" height="295px"></img>`;
  const markup = `<h2 class= "modal-title">${area}</h2>

${youtubeWatch ? youtubeEmbed : imgData}
<div class ="block-info">
<ul class="tags"></ul>
<div class="block-time">

<div class="rating">
<p class="rating-value">${rating}</p>
<div class="block-stars">
<svg class="star-icon-modal " width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon-modal" width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon-modal " width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon-modal" width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon-modal" width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg></div>
<div class="time">${time} min</div>
</div>
</div>
</div>
<ul class ="ingredients"></ul>
<p class = instructions>${instructions}</p>

`;
  const markupMobile = `
  ${youtubeWatch ? youtubeEmbed : imgData}
<h2 class= "modal-title">${area}</h2>

<div class="block-time">
<p class="rating-value ">${rating}</p><div class="block-stars">
<svg class="star-icon-modal " width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon-modal" width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon-modal " width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon-modal" width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon-modal" width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg></div>
<div class="time">${time} min</div>
</div>
</div>
</div>
<ul class ="ingredients"></ul>
<ul class="tags"></ul>
<p class = instructions>${instructions}</p>
`;

  if (window.innerWidth > 768) {
    modalWindow.insertAdjacentHTML('beforeend', markup);
  } else {
    modalWindow.insertAdjacentHTML('beforeend', markupMobile);
   }

  const creatIngredients = document.querySelector('.ingredients');
  const markupIngradient = ingredients
    .map(
      ({ name, measure }) =>
        `<li class="title-ingredients"><div>${name}</div><div class="measure">${measure}</div></li>`
    )
    .join('');
  creatIngredients.innerHTML = markupIngradient;
  const creatTags = document.querySelector('.tags');
  const markupTags = tags
    .map(tag => `<li class ="title-tags"><p>#${tag}</p></li>`)
    .join('');
  creatTags.innerHTML = markupTags;

}

if (backdropElem) {
  modalClose.addEventListener('click', onCloseModalSeeBtn);
}

function onCloseModalSeeBtn() {
  backdropElem.classList.add('is-hidden-recipe-backdrop');
  modalWindow.innerHTML = '';
  backdropElem.removeEventListener('click', onCloseModalSeeBtn);
}

function onclickBackdropModalSee(evt) {
  if (evt.target === backdropElem) {
    modalWindow.innerHTML = '';
    backdropElem.classList.toggle('is-hidden-recipe-backdrop');
    backdropElem.removeEventListener('click', onclickBackdropModalSee);
  }
}

function onClickEscapeModalSee(evt) {
  if (evt.code === 'Escape') {
    backdropElem.classList.add('is-hidden-recipe-backdrop');
    modalWindow.innerHTML = '';
    document.removeEventListener('keydown', onClickEscapeModalSee);
  }
}



function createGoldStarForOneEl(el) {
    const icon = document.querySelectorAll('.star-icon-modal')
    let counter = 0;
    for (let i = 0; i < 5; i += 1) {
        if (i < Math.floor(el.rating)) {
          if (icon) {
                icon[counter].classList.add('star-color-icon-modal')
            }

        }
        counter += 1;
    }
}



// // дані зі сховища
// const arrForLocalStor = JSON.parse(localStorage.getItem(KEY_FEEDBACK)) ?? [];

// const KEY_FEEDBACK = 'saveCheckedFavorite';

// // перевірка на унікальність id
// if (!arrForLocalStor.includes(id)) {
//  storageButton.style.display = 'block';
// removeStorageBtn.style.display = 'none';
// }else{
//  storageButton.style.display = 'none';
//  removeStorageBtn.style.display = 'block';
// }

// // кнопки
// storageButton.addEventListener('click', addLocalStorage)
// function addLocalStorage(evt){
//   if(storageButton.textContent==="Add to favorite"){
//     arrForLocalStor.push(idCard);
//       localStorage.setItem(KEY_FEEDBACK, JSON.stringify(arrForLocalStor));
//   }
// }
// removeStorageBtn.addEventListener('click', delLocalStorage)
// function delLocalStorage(evt){
//   if(storageButton.textContent==="Delete to favorite"){
//     arrForLocalStor.splice(indexElCard, 1);
//     localStorage.setItem(KEY_FEEDBACK, JSON.stringify(arrForLocalStor));
//   }
// }