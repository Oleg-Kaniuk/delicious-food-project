
import {elements} from '/js/filters/filters.js'
import imgUrl from '../../img/icon-sprite.svg'


export function createMarkupElForFilter(arr) {

  //  беремо дані зі сховища, так вони будуть актуальні 
  const localStorageIds = JSON.parse(localStorage.getItem('saveCheckedFavorite')) ?? [];
  return arr.map(({ _id, title, preview, description, rating }) => {
   
       const isIdInLocalStorage = localStorageIds.includes(_id);
 
       const labelClass = isIdInLocalStorage
      ? 'heart-icon-action  svg-active'
      : 'heart-icon-action ';
      // додаємо змінну в залежності від значення якої будемо додавати атрибут
    // checked на інпут, додаватись він буде якщо такий id вже є у сховищі
    // а отже користувач вже обрав цю страву
    const isChecked = isIdInLocalStorage

    
  return  `<div class="blok-recipes " id="${_id}">
      
      <input
        id="${_id}"
        type="checkbox"
        class="heart-icon-elem "
        name="heart-icon"
        ${isChecked ? 'checked' : ''} 
        
      />
      <label for="${_id}" aria-hidden="true" class="${labelClass} ">
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

</div>`}).join(''); 
   
}


if (elements.containerForRecipes) {
  elements.containerForRecipes.addEventListener('change', onClickHeart)
}

function onClickHeart(e) {

  const uniqueArrForLocalStor = JSON.parse(localStorage.getItem('saveCheckedFavorite')) ?? [];
  
  const idCard = e.target.id 
 
  if (e.target.checked) {
       
    if (!uniqueArrForLocalStor.includes(idCard)) {
      uniqueArrForLocalStor.push(idCard);
    
      localStorage.setItem('saveCheckedFavorite', JSON.stringify(uniqueArrForLocalStor));
    }
  }
  
  if (!e.target.checked) {

     const indexElCard = uniqueArrForLocalStor.indexOf(idCard);
    uniqueArrForLocalStor.splice(indexElCard, 1);
      localStorage.setItem('saveCheckedFavorite', JSON.stringify(uniqueArrForLocalStor));

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




