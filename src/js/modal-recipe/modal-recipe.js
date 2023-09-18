import {onCreateGoldStar} from "/js/recipes/recipes.js"


async function allInfoRecipes(id) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
  const response = await fetch(`${BASE_URL}recipes/${id}`);
  const recipes = await response.json();
  return recipes;
}

const modalClose = document.querySelector('.modal-close-recipe-btn');
const modalWindow = document.querySelector('.recipe-info');
export const backdropElem = document.querySelector('.recipe-backdrop');


export function onModal(id){
 modalWindow.innerHTML=''
allInfoRecipes(id)
  .then(data => {
    createMarkupInfoRecipes(data);
  })
  .catch(error => console.log(error));
}
function createMarkupInfoRecipes(arr) {
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

  const markup = `<h2 class= "modal-title">${area}</h2>
  <img class="modal-recipe-image" src="${thumb}" alt="${title}" max-width="295px" height="295px"></img>
<div class ="block-info">
<ul class="tags"></ul>
<div class="block-time">
<div class="rating"><p class="rating-value">${rating}</p><div class="star"></div>
<svg class="star-icon" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg></div>
<div class="time">${time} min</div>
</div>
</div>
<ul class ="ingredients"></ul>
<p class = instructions>${instructions}</p>
<button class="add-btn js-add-btn" type="button">Add to favorite</button>
`;
const markupMobile=`
<img class="modal-recipe-image" src="${thumb}" alt="${title}" max-width="295px" height="295px"></img>
<h2 class= "modal-title">${area}</h2>
<div class ="block-info">
<div class="block-time">
<div class="rating"><p class="rating-value">${rating}</p><div class="star"></div>
<svg class="star-icon" width="18" height="18">
      <use href="/img/icon-sprite.svg#icon-star"></use>
    </svg>
    <svg class="star-icon" width="18" height="18">
      <use href="/img/icon-sprite.svg#icon-star"></use>
    </svg>
    <svg class="star-icon" width="18" height="18">
      <use href="/img/icon-sprite.svg#icon-star"></use>
    </svg>
    <svg class="star-icon" width="18" height="18">
      <use href="/img/icon-sprite.svg#icon-star"></use>
    </svg>
    <svg class="star-icon" width="18" height="18">
      <use href="/img/icon-sprite.svg#icon-star"></use>
    </svg></div>
<div class="time">${time} min</div>
</div>
</div>
<ul class ="ingredients"></ul>
<ul class="tags"></ul>
<p class = instructions>${instructions}</p>
<button class="add-btn js-add-btn" type="button">Add to favorite</button>
`;
if (window.innerWidth > 768) {
  modalWindow.insertAdjacentHTML('beforeend', markup)}
  else{modalWindow.insertAdjacentHTML('beforeend', markupMobile)}

const creatIngredients = document.querySelector('.ingredients');
  const markupIngradient = ingredients
    .map(
      ({ name, measure }) =>
        `<li class="title-ingredients"><div>${name}</div><div class="measure">${measure}</div></li>`
    )
    .join('');
  creatIngredients.innerHTML = markupIngradient;
  console.log(arr);
  const creatTags = document.querySelector('.tags');
  const markupTags = tags
    .map(tag => `<li class ="title-tags"><p>#${tag}</p></li>`)
    .join('');
  creatTags.innerHTML = markupTags;
}

backdropElem.addEventListener('click', onclickBackdrop);
modalClose.addEventListener('click', onCloseBtn);
document.addEventListener('keydown', onClickEscape);

async function onCloseBtn() {
  backdropElem.classList.add('is-hidden-recipe-backdrop');

   
}

function onclickBackdrop(evt) {
  if (evt.target === backdropElem) {
    backdropElem.classList.toggle('is-hidden-recipe-backdrop');
    backdropElem.removeEventListener('click', onclickBackdrop);
  }
}

function onClickEscape(evt) {
  if (evt.code === 'Escape') {
    backdropElem.classList.toggle('is-hidden-recipe-backdrop');
    document.removeEventListener("keydown", onClickEscape) 
  }

}
