import axios from 'axios';
import imgUrl from '../../img/icon-sprite.svg';
// import { onRecipeClick } from 'js/categories/categories.js'
import { getRecipesByCategory } from '/js/categories/categories.js';
import { onModal, backdropElem } from '/js/modal-recipe/modal-recipe.js';
const favList = document.querySelector('.favorite-recipes-list');
const categories = document.querySelector('.categories');
const favorite = JSON.parse(localStorage.getItem('saveCheckedFavorite')) || [];
const allBtn = document.querySelector('.category-btn');
const categoryButtons = document.querySelectorAll('.category-button');
const uniqueCategories = new Set();
const favoritesContainer = document.querySelector('.empty-favorites-container');
const BASE_FAV_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
let currentCategory = null;
let cardArr = '';

async function fetchFavImages(id) {
    try {
        const response = await axios.get(`${BASE_FAV_URL}/${id}`);
        return response;
    } catch (error) {
        console.error(`Failed to fetch images: ${error}`);
    }
}

function createMarkupForFilter(el) {
    const { _id, title, preview, description, rating, category } = el;

    const idFromLocalSorage =
        JSON.parse(localStorage.getItem('saveCheckedFavorite')) || [];
    const includesIdAtLocalStorage = idFromLocalSorage.includes(el);
    const heartClass = includesIdAtLocalStorage ?
        'heart-icon-action  svg-active' :
        'heart-icon-action ';
    const checked = includesIdAtLocalStorage;

    return `<li class="blok-recipes blok-recipes-fav" id="${_id}">
        
        <input
          id="${_id}"
          data-category-card="${category}"
          type="checkbox"
          class="heart-icon-elem"
          name="heart-icon"
          ${checked ? '' : 'checked'} 
          
        />
        <label for="${_id}" aria-hidden="true" class="${heartClass}">
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
  
  </li>`;
}

if (favorite.length > 0) {
    favorite.map(idEl => {
        fetchFavImages(idEl).then(data => {
            favList.insertAdjacentHTML('beforeend', createMarkupForFilter(data.data));
            createGoldStarOneEl(data.data);
            const btnSeeRecipe = document.querySelectorAll('.btn-blok-recipes-see');
            [...btnSeeRecipe].forEach(function(card) {
                const id = card.id;
                card.addEventListener('click', () => {
                    onBtnRecipeClick(id);
                });
            });

            const recipeCategory = data.data.category;
            if (recipeCategory) {
                uniqueCategories.add(recipeCategory);
                const categoryButtonsHTML = [...uniqueCategories]
                    .map(
                        category => `
      <button class="category-button" data-category="${category}">${category}</button>
  `
                    )
                    .join('');

                categories.innerHTML = categoryButtonsHTML;
            }
        });
    });
} else {
    favList.innerHTML = '';
    categories.innerHTML = '';
    allBtn.style.display = 'none';
    favoritesContainer.innerHTML = createMarkupForEmptyFav();
}

function createMarkupForEmptyFav() {
    return `
<svg width="68" height="58" viewBox="0 0 37 32">
<use xlink:href="../../img/icon-sprite.svg#icon-hat"></use>
</svg>
<p class="empty-favorites-text">It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.
</p>
`;
}

if (favList) {
    favList.addEventListener('change', clickHeart);
}

function clickHeart(e) {
    const idCard = e.target.id;
    const indexElCard = favorite.indexOf(idCard);

    if (indexElCard !== -1) {
        favorite.splice(indexElCard, 1);

        localStorage.setItem('saveCheckedFavorite', JSON.stringify(favorite));

        const cardElement = document.getElementById(`${idCard}`);
        const removedCategory = cardElement.getAttribute('data-category');
        cardElement.remove();
        location.reload();
        const categoryButtons = document.querySelectorAll('.category-buttons');
        cardArr = categoryButtons;

        updateCategories(removedCategory);
        if (favorite.length === 0) {
            const emptyFavoriteMarkup = createMarkupForEmptyFav();
            const favoritesContainer = document.getElementById('favoritesContainer');

            if (favoritesContainer) {
                favoritesContainer.innerHTML = emptyFavoriteMarkup;
            }
        }
    }
}

// видалення категорій. працює тільки коли обновити сторінку
function updateCategories(removedCategory) {
    const existingCategories = new Set();

    favList.querySelectorAll('.blok-recipes').forEach(recipe => {
        const category = recipe.getAttribute('data-category');
        if (category) {
            existingCategories.add(category);
        }
    });

    if (removedCategory) {
        categoryButtons.forEach(categoryButton => {
            const category = categoryButton.getAttribute('data-category');
            if (category === removedCategory) {
                categoryButton.remove();
                existingCategories.delete(category);
            }
        });
    }
}

export function createGoldStarOneEl() {
    const cards = document.querySelectorAll('.blok-recipes-fav');
    cards.forEach(card => {
        const rating = parseFloat(
            card.querySelector('.text-number-blok-recipes').textContent
        );
        const stars = card.querySelectorAll('.star-icon');

        for (let i = 0; i < stars.length; i++) {
            if (i < Math.floor(rating)) {
                stars[i].classList.add('star-color-icon');
            }
        }
    });
}

function onBtnRecipeClick(id) {
    backdropElem.classList.remove('is-hidden-recipe-backdrop');
    onModal(id);
}