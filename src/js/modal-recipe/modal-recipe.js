import { onCreateGoldStar } from '/js/recipes/recipes.js';

async function allInfoRecipes(id) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
  const response = await fetch(`${BASE_URL}recipes/${id}`);
  const recipes = await response.json();
  return recipes;
}
const modalClose = document.querySelector('.modal-close-recipe-btn');
const modalWindow = document.querySelector('.recipe-info');
export const backdropElem = document.querySelector('.recipe-backdrop');

export function onModal(id) {
  backdropElem.classList.remove('is-hidden-recipe-backdrop')
  
  allInfoRecipes(id)
    .then(data => {
      createMarkupInfoRecipes(data);
    })
    .catch(error => console.log(error));
}
function createMarkupInfoRecipes(arr) {
  modalWindow.innerHTML = ''
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
  const youtubeWatch = youtube.replace('https://www.youtube.com/watch?v=', '');
  const youtubeEmbed = `<iframe class="modal-recipe-image" src="https://www.youtube.com/embed/${youtubeWatch}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`;
  const imgData = `<img class="modal-recipe-image" src="${thumb}" alt="${title}" max-width="295px" height="295px"></img>`
  const markup = `<h2 class= "modal-title">${area}</h2>
  

${youtubeWatch ? youtubeEmbed : imgData}
<div class ="block-info">
<ul class="tags"></ul>
<div class="block-time">

<div class="rating"><p class="rating-value">${rating}</p><div class="div class="block-stars">
<svg class="icon-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="icon-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="icon-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="icon-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="icon-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg></div>
<div class="time">${time} min</div>
</div>
</div>
</div>
<ul class ="ingredients"></ul>
<p class = instructions>${instructions}</p>
<button class="add-btn js-add-btn" type="button">Add to favorite</button>
<button class="btn-rating js-add-rating" type="button">Give a rating</button>
`;
  const markupMobile = `
  ${youtubeWatch ? youtubeEmbed : imgData}
<h2 class= "modal-title">${area}</h2>

<div class="block-time">
<p class="rating-value">${rating}</p><div class="block-stars">
<svg class="icon-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="icon-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="icon-stars " width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="icon-stars " width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="icon-stars " width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg></div>
<div class="time">${time} min</div>
</div>
</div>
<ul class ="ingredients"></ul>
<ul class="tags"></ul>
<p class = instructions>${instructions}</p>
<button class="add-btn js-add-btn" type="button">Add to favorite</button>
<button class="btn-rating js-add-rating" type="button">Give a rating</button>
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
 
onGoldStar(rating)
}



backdropElem.addEventListener('click', onclickBackdropModalSee);
modalClose.addEventListener('click', onCloseModalSeeBtn);
document.addEventListener('keydown', onClickEscapeModalSee);

function onCloseModalSeeBtn() {
  backdropElem.classList.add('is-hidden-recipe-backdrop');
  modalWindow.innerHTML = '';
}

function onclickBackdropModalSee(evt) {
  if (evt.target === backdropElem) {
    backdropElem.classList.toggle('is-hidden-recipe-backdrop');
    modalWindow.innerHTML = ''
    backdropElem.removeEventListener('click', onclickBackdrop);
  }
}

function onClickEscapeModalSee(evt) {
  if (evt.code === 'Escape') {
    backdropElem.classList.toggle('is-hidden-recipe-backdrop');
    modalWindow.innerHTML = ''
    document.removeEventListener('keydown', onClickEscapeModalSee);
  }
}



// function onGoldStar(rating) {
//   const star = document.querySelectorAll('icon-stars');
//   let counter = 0;
 
//   for (let i = 0; i < 5; i += 1) {
//     if (i < Math.floor(rating)) {
//       if (star) {
//         star[counter].classList.add('star-active');
//       }
//     }
//     counter += 1;
//   }
// }

