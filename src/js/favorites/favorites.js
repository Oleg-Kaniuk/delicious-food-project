import axios from 'axios';
import { createMarkupElForFilter } from '/js/recipes/recipes.js'
import { onCreateGoldStar } from '/js/recipes/recipes.js'
import imgUrl from '../../img/icon-sprite.svg'
const favList = document.querySelector('.favorite-recipes-list');
const emptyFav = document.querySelector('empty-favorites-container')
const favorite = JSON.parse(localStorage.getItem('saveCheckedFavorite')) || [];

const BASE_FAV_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

async function fetchFavImages(id) {
    try {
        const response = await axios.get(`${BASE_FAV_URL}/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(`Failed to fetch images: ${error}`);
    }
};


if (favorite.length > 0) {
    favorite.map((idEl) => {
        console.log(idEl);
        const fetchObj = fetchFavImages(idEl).then((data) => {
            console.log(data);
            favList.insertAdjacentHTML('beforeend', createMarkupForFilter(data.data));
            console.log(data.data);
        });

        // emptyFav.style.display = "none";
    })
} else {
    console.error("Помилка");
    // emptyFav.style.display = "block";
}

function createMarkupForFilter(el) {
    const { _id, title, preview, description, rating } = el;

    // const isIdInLocalStorage = localStorageIds.includes(_id);

    // const labelClass = isIdInLocalStorage ?
    //     'heart-icon-action  svg-active' :
    //     'heart-icon-action ';

    return `<div class="blok-recipes " id="${_id}">
        
        <input
          id="${_id}"
          type="checkbox"
          class="heart-icon-elem "
          name="heart-icon"
          
        />
        <label for="${_id}" aria-hidden="true" class="">
          <svg class="icon-heart-svg " width="22" height="22">
            <use href="${imgUrl}#icon-heart"></use>
          </svg>
        </label>
  
         <img class="img-blok-recipes " src="${preview}" alt="${title}" />
  
   <div class="context-blok-recipes "> <h3 class="title-blok-recipes">${title}</h3>
    <p class="text-blok-recipes">${description}</p>
    <div class="num-stars-btn "><div class="blok-rating">
      <p class="text-number-blok-recipes ">${rating}</p>
       <div class="stars ">
       <svg class="star-icon " width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon " width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${imgUrl}#icon-star"></use>
        </svg>
        </div>
        </div>
    
    <button id="${_id}" class="btn-blok-recipes-see" type="button">See recipe</button></div>
    </div>
  
  </div>`
};




// favList.innerHTML = '';
//         favList.innerHTML = createMarkupElForFilter(response.data.results, favorite);
//         onCreateGoldStar(response.data.results);
//         //  модалка  рецепт
//         const cardsRecipesBtn = document.querySelectorAll(".btn-blok-recipes-see");
//         [...cardsRecipesBtn].forEach(function(card) {
//             const id = card.id;
//             card.addEventListener('click', () => {
//                 onRecipeClick(id);

//             });

//         });