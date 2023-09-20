

async function allInfoRecipes(id) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
  const response = await fetch(`${BASE_URL}recipes/${id}`);
  const recipes = await response.json();
  return recipes;
}
const modalClose = document.querySelector('.modal-close-recipe-btn');
const modalWindow = document.querySelector('.recipe-info');
export const backdropElem = document.querySelector('.recipe-backdrop');

const addLocalRecipeSeeBtn = document.querySelector(".js-add-btn")  



export function onModal(id) {
  document.addEventListener('keydown', onClickEscapeModalSee);
  backdropElem.addEventListener('click', onclickBackdropModalSee);
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

  if (addLocalRecipeSeeBtn) {
    addLocalRecipeSeeBtn.id = _id;
}


  const youtubeWatch = youtube.replace('https://www.youtube.com/watch?v=', '');
  const youtubeEmbed = `<iframe class="modal-recipe-image" src="https://www.youtube.com/embed/${youtubeWatch}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`;
  const imgData = `<img class="modal-recipe-image" src="${thumb}" alt="${title}" max-width="295px" height="295px"></img>`
  const markup = `<h2 class= "modal-title">${area}</h2>
 

${youtubeWatch ? youtubeEmbed : imgData}
<div class ="block-info">
<ul class="tags"></ul>
<div class="block-time">

<div class="rating"><p class="rating-value">${rating}</p><div class="div class="block-stars">
<svg class="svg-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="svg-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="svg-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="svg-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="svg-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
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
<p class="rating-value">${rating}</p><div class="block-stars">
<svg class="svg-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="svg-stars" width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="svg-stars " width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="svg-stars " width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="svg-stars " width="18" height="18">
        <use href="/img/icon-sprite.svg#icon-star"></use>
      </svg></div>
<div class="time">${time} min</div>
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
  onGoldSfgStar(rating)
  
}



if(backdropElem){

modalClose.addEventListener('click', onCloseModalSeeBtn);

};

function onCloseModalSeeBtn() {
  backdropElem.classList.add('is-hidden-recipe-backdrop');
  modalWindow.innerHTML = '';
  backdropElem.removeEventListener('click', onCloseModalSeeBtn);
}

function onclickBackdropModalSee(evt) {
  if (evt.target === backdropElem) {
    modalWindow.innerHTML = ''
    backdropElem.classList.toggle('is-hidden-recipe-backdrop');
   backdropElem.removeEventListener('click', onclickBackdropModalSee);
  }
}

function onClickEscapeModalSee(evt) {
  if (evt.code === 'Escape') {
    backdropElem.classList.add('is-hidden-recipe-backdrop');
    modalWindow.innerHTML = ''
    document.removeEventListener('keydown', onClickEscapeModalSee);
  }
}



// async function onGoldSfgStar(rating) {
//   const star = document.querySelectorAll('svg-stars');
//   let counter = 0;
// for (let i = 0; i < 5; i += 1) {
//     if (i < Math.floor(rating)) {
//       if (star) {
//         star[counter].classList.add('svg-stars-active');
//       }
//     }
//     counter += 1;
//   }
// }
// const modalCardSee = document.querySelector('.card-modal-see');
