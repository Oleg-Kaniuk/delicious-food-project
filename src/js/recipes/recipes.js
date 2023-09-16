
// Цей пошук потрібен лише для відмалювання, коли Діма доробить запит, то ми його видалимо


const containerForRecipes = document.querySelector('.container-for-recipes')


function fetchBreeds() {
    const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
        
  return fetch(`${BASE_URL}`)
    .then((resp) => {
    if (!resp.ok) {console.log('Oops! Something went wrong! Try reloading the page!')}
    return resp.json();
    })
    .catch(() =>console.dir('Oops! Something went wrong! Try reloading the page!'))
}

  fetchBreeds().then((data) => {
    
    // const { _id, title, preview, description, rating } = data.results
    containerForRecipes.innerHTML = createMarkupElForFilter(data.results)
    

          // те що копіювати

    console.log(containerForRecipes.children.length);
    
    if (containerForRecipes.children.length) {
      // console.log(containerForRecipes);
       
      const iconSvg = document.querySelector('.icon-heart-svg');
      const heartIconElem = document.querySelectorAll('.heart-icon-elem');
      const KEY_FEEDBACK = 'saveCheckedFavorite';
      let arrLocalStor = [];
      let active = false;

      //перебираємо елементи та вішаємо на кожного слухач подій 
      heartIconElem.forEach(el => {
        el.addEventListener('change', onClickHeart);
      
        if (active === false) {
          if (arrLocalStor.includes(e.target.id)) {
            console.log(arrLocalStor.includes(e.target.id));
            iconSvg.classList.remove('svg-active');
            //  localStorage.removeItem(KEY_FEEDBACK)
            delete (arrLocalStor[e.target.id]);
            localStorage.setItem(KEY_FEEDBACK, JSON.stringify(arrLocalStor));
            el.removeEventListener('change', onClickHeart)
          }
        }
    
        function onClickHeart(e) {
        
      
          if (e.currentTarget.checked) {
          
            console.log(e.currentTarget.checked);
            active = true;

            console.log(e.currentTarget);
            arrLocalStor.push(e.target.id);
            iconSvg.classList.add('svg-active');
        
            localStorage.setItem(KEY_FEEDBACK, JSON.stringify(arrLocalStor));
          }

         
         
        }
      
    
      })
    
      
  // heartIconElem.addEventListener('change', onClickHeart);


      // SaveFavoritesToLocalStor()

    }
  }).catch(() => {
    console.log('err');
  })

// важлива create функція

export function createMarkupElForFilter(arr) {
  
 return arr.map(({ _id, title, preview, description, rating }) => 
 
   `<div class="blok-recipes id="${_id}">
       <input
        id="${_id}"
        type="checkbox"
        class="heart-icon-elem"
        name="heart-icon"
        value="on"
      />
      <label for="heart" aria-hidden="true" class="heart-icon-action">
        <svg class="icon-heart-svg" width="22" height="22">
          <use href="./img/icon-sprite.svg#icon-heart"></use>
        </svg>
      </label>

       <img class="img-blok-recipes" src="${preview}" alt="${title}" />
 <div class="context-blok-recipes"> <h3 class="title-blok-recipes">${title}</h3>
  <p class="text-blok-recipes">${description}</p>
  <div class="num-stars-btn"><div class="blok-rating">
    <p class="text-number-blok-recipes">${rating}</p>
     <div class="stars">
     <svg class="star-icon" width="18" height="18">
        <use href="./img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="./img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="./img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="./img/icon-sprite.svg#icon-star"></use>
      </svg>
      <svg class="star-icon" width="18" height="18">
        <use href="./img/icon-sprite.svg#icon-star"></use>
      </svg>
      </div>
      </div>
  
  <button class="btn-blok-recipes-see" type="button">See recipe</button></div>
  </div>
</div>`).join(''); 
   
}
  


 
  

// цей рядок зкопіювати- отримаити дані з local
// const dataFavorite = localStorage.getItem(KEY_FEEDBACK)




//  <div class="heart-icon">
//   <svg class="icon-heart-svg" width="22" height="22">
//     <use href="./img/icon-sprite.svg#icon-heart"></use>
//   </svg>
//   <input
//     id="heart"
//     type="checkbox"
//     class="heart-icon-elem"
//     name="heart-icon"
//     value="false"
//   />
//   <label for="heart" class="heart-icon-action"></label>
// </div>



// const iconSvg = document.querySelector('.icon-heart-svg')
// const heartIconElem = document.querySelector('.heart-icon-elem')
// console.log(heartIconElem);
// heartIconElem.addEventListener('change', onHeart)

// function onHeart(e) {console.log(e);
//     if (e.currentTarget.checked) {
//         console.log(e.currentTarget.checked);
//         iconSvg.classList.add('svg-active');
//         localStorage.setItem('saveCheckedFavorite', e.target._id);
//     } else {
//           iconSvg.classList.remove('svg-active');
//         localStorage.removeItem('saveCheckedFavorite', e.target._id);
//     }
    
// }



//  if (e.currentTarget.checked) {
//           console.log(e.currentTarget.checked);
//           active = true;
//           console.log(e.currentTarget);
//           arrLocalStor.push(e.target.id);
//           iconSvg.classList.add('svg-active');
//           localStorage.setItem(KEY_FEEDBACK, JSON.stringify(arrLocalStor));
//         } else {

//           if (arrLocalStor.includes(e.target.id)) {
//             console.log(arrLocalStor.includes(e.target.id));
//             iconSvg.classList.remove('svg-active');
//             //  localStorage.removeItem(KEY_FEEDBACK)
//             delete (arrLocalStor[e.target.id]);
//           }
         
//         }







