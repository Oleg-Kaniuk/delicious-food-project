
import {elements} from '/js/filters/filters.js'
import imgUrl from '../../img/icon-sprite.svg'

export function createMarkupElForFilter(arr) {
  
 return arr.map(({ _id, title, preview, description, rating }) => 
 
   `<div class="blok-recipes " id="${_id}">
      
      <input
        id="${_id}"
        type="checkbox"
        class="heart-icon-elem "
        name="heart-icon"
        
      />
      <label for="${_id}" aria-hidden="true" class="heart-icon-action ">
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






