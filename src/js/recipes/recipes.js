
// Цей пошук потрібен лише для відмалювання, коли Діма доробить запит, то ми його видалимо


const containerForRecipes = document.querySelector('.container-for-recipes')


function fetchBreeds() {
    const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
        
  return fetch(`${BASE_URL}`)
    .then((resp) => {
    if (!resp.ok) {console.log('Oops! Something went wrong! Try reloading the page!')}
    return resp.json();
    })
    .catch(() =>console.log('Oops! Something went wrong! Try reloading the page!'))
}

  fetchBreeds().then((data) => {console.log(data.results);
    // const { _id, title, preview, description, rating } = data.results
    containerForRecipes.innerHTML = createMarkupElForFilter(data.results)
  }).catch(() => {
    console.log('err');
  })

// важлива create функція

function createMarkupElForFilter(arr) {
  
 return arr.map(({ _id, title, preview, description, rating }) => 
 
     `<div class="blok-recipes id="${_id}">
        <div class="heart-icon">
  <svg class="icon-heart-svg" width="22" height="22">
    <use href="./img/icon-sprite.svg#icon-heart"></use>
  </svg>
  <input
    id="heart"
    type="checkbox"
    class="heart-icon-elem"
    name="heart-icon"
    value="false"
  />
  <label for="heart" class="heart-icon-action"></label>
</div>
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
  

