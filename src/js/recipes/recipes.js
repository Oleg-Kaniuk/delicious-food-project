
import {elements} from '/js/filters/filters.js'
import imgUrl from '../../img/icon-sprite.svg'
import { backdropElem} from "/js/modal-recipe/modal-recipe.js"
import { onModal} from "/js/modal-recipe/modal-recipe.js"


export function createMarkupElForFilter(arr) {
  
 return arr.map(({ _id, title, preview, description, rating }) => 
 
   `<div class="blok-recipes dark-theme" id="${_id}">
      
      <input
        id="${_id}"
        type="checkbox"
        class="heart-icon-elem dark-theme"
        name="heart-icon"
        
      />
      <label for="${_id}" aria-hidden="true" class="heart-icon-action dark-theme">
        <svg class="icon-heart-svg dark-theme" width="22" height="22">
          <use href="${imgUrl}#icon-heart"></use>
        </svg>
      </label>

       <img class="img-blok-recipes dark-theme" src="${preview}" alt="${title}" />

 <div class="context-blok-recipes dark-theme"> <h3 class="title-blok-recipes dark-theme">${title}</h3>
  <p class="text-blok-recipes dark-theme">${description}</p>
  <div class="num-stars-btn dark-theme"><div class="blok-rating">
    <p class="text-number-blok-recipes dark-theme">${rating}</p>
     <div class="stars dark-theme">
     <svg class="star-icon dark-theme" width="18" height="18">
        <use href="${imgUrl}#icon-star"></use>
      </svg>
      <svg class="star-icon dark-theme" width="18" height="18">
        <use href="${imgUrl}#icon-star"></use>
      </svg>
      <svg class="star-icon dark-theme" width="18" height="18">
        <use href="${imgUrl}#icon-star"></use>
      </svg>
      <svg class="star-icon dark-theme" width="18" height="18">
        <use href="${imgUrl}#icon-star"></use>
      </svg>
      <svg class="star-icon dark-theme" width="18" height="18">
        <use href="${imgUrl}#icon-star"></use>
      </svg>
      </div>
      </div>
  
  <button id="${_id}" class="btn-blok-recipes-see dark-theme" data-modal-open-recipe type="button">See recipe</button></div>
  </div>

</div>`).join(''); 
   
}

export const KEY_FEEDBACK = 'saveCheckedFavorite';

if (elements.containerForRecipes) {
  elements.containerForRecipes.addEventListener('change', onClickHeart)
}

function onClickHeart(e) {

  const uniqueArrForLocalStor = JSON.parse(localStorage.getItem(KEY_FEEDBACK)) ?? [];
  
  // const iconSvg = document.querySelector('.icon-heart-svg');
  // const iconSvg = document.querySelector('.heart-icon-action');
  const idCard = e.target.id 
 
  if (e.target.checked) {
    for (const el of uniqueArrForLocalStor) {
      if (e.target.id === el) {
        console.log(e.target);
        e.target.nextElementSibling.classList.add('svg-active')
        
        const searchSvg = [...e.target.nextElementSibling.children]
        console.log(searchSvg);
       searchSvg.classList.add('svg-active')
      }
      
    }
    // console.log(e.target.nextElementSibling);
    
    if (!uniqueArrForLocalStor.includes(idCard)) {
      uniqueArrForLocalStor.push(idCard);
      // iconSvg.classList.add('svg-active')
          // iconSvg.children[0].classList.add('svg-active')

      localStorage.setItem(KEY_FEEDBACK, JSON.stringify(uniqueArrForLocalStor));
    }
  }
  
  if (!e.target.checked) {

    // iconSvg.classList.remove('svg-active')
  // iconSvg.children[0].classList.remove('svg-active')

    
  // console.log("Я видаляю");
    const indexElCard = uniqueArrForLocalStor.indexOf(idCard);
    uniqueArrForLocalStor.splice(indexElCard, 1);
    // console.log(uniqueArrForLocalStor);
      localStorage.setItem(KEY_FEEDBACK, JSON.stringify(uniqueArrForLocalStor));

  } 
 }


//  stars section
export function onCreateGoldStar(arr) {
 const starIcon= document.querySelectorAll('.star-icon')
 let counter = 0;
  arr.map(recipe => {
      for (let i = 0; i < 5; i+=1) {
          if (i < Math.floor(recipe.rating)) {
            if (starIcon) {
              starIcon[counter].classList.add('star-color-icon')
            }
              
          }
          counter += 1;
      }
  })
}


//  Відкриття модалки see recipe


const modalSeeRecipeBtn = document.querySelector('.btn-blok-recipes-see');
console.log(modalSeeRecipeBtn);
if (modalSeeRecipeBtn) {
  modalSeeRecipeBtn.addEventListener('click', toggleModalSeeRecipe)

}

function toggleModalSeeRecipe(e) {
   backdropElem.classList.remove('is-hidden-recipe-backdrop')
 onModal(id)
}




