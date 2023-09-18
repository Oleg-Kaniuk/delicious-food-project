import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
console.log(Pagination);
const containerForRecipes = document.querySelector('.container-for-recipes');
const paginationContainer = document.querySelector(".tui-pagination");
console.log(paginationContainer);
const options = { 
     totalItems: 0,
     itemsPerPage: 6,
     visiblePages: 4,
     page: 1,
     centerAlign: true,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
     template: {
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
         moveButton:
             '<a href="#" class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</a>',
         disabledMoveButton:
             '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>',
         moreButton:
             '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                 '<span class="tui-ico-ellip">...</span>' +
             '</a>'
     }
};
const pagination = new Pagination('pagination', options);
 console.log(pagination);

let totalItems;
const page = pagination.getCurrentPage();//початова сторінка з опцій
console.log(page);

async function fetchData() {
    const BASEURL_RECIPES =
    'https://tasty-treats-backend.p.goit.global/api/recipes';
    const response = await fetch(`${BASEURL_RECIPES}`);
    const recipes = await response.json();
    console.log(recipes);
    return recipes;
}
// генерує першу сторінку з інформацією  про к-сть всіх елементів 
function renderfirstPage(page) {
      fetchData(page)
  .then(recipes => {
    console.log(recipes);
    console.log(recipes.totalPages);
    console.log(options.itemsPerPage);
    totalItems = recipes.totalPages * options.itemsPerPage;
    console.log(totalItems);
    pagination.reset(totalItems);//передає заг к-сть елементів з бекенду в пагінацію
   createMarkup(recipes.results)
    })
          .catch(error => console.log('errorPagination'));
  }
renderfirstPage(page);
console.log(page);

//генерує наступну сторінку 
function renderEvt(page) {
  console.log(page);
  fetchData(page)
  .then(recipes => {
    console.log(recipes);
    createMarkup(recipes.results);
    console.log(recipes.results);
  })
        .catch(error => console.log(error));
}

  // тут мають рендеритись різні сторінки за допомогою цього методу
pagination.on('afterMove', (event) => {
  const currentPage = event.page;
  console.log(currentPage);// це поточна сторінка яка має передаватись у ф-ю генерації інших сторінок
  renderEvt(currentPage);
});


function createMarkup(arr) {
  
  const markup =  arr.map(({ _id, title, preview, description, rating }) =>
 
    `<div class="blok-recipes id="${_id}">
      
   <input
        id="${_id}"
        type="checkbox"
        class="heart-icon-elem"
        name="heart-icon"
        value="off"
      />
      <label for="heart" aria-hidden="true" class="heart-icon-action">
        <svg class="icon-heart-svg" width="22" height="22">
          <use href="/img/icon-sprite.svg#icon-heart"></use>
        </svg>
      </label>

       <img class="img-blok-recipes" src="${preview}" alt="${title}" />

 <div class="context-blok-recipes"> <h3 class="title-blok-recipes">${title}</h3>
  <p class="text-blok-recipes">${description}</p>
  <div class="num-stars-btn"><div class="blok-rating">
    <p class="text-number-blok-recipes">${rating}</p>
     <div class="stars">
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
      </svg>
      </div>
      </div>
  
  <button class="btn-blok-recipes-see" type="button">See recipe</button></div>
  </div>

</div>`).join('');
    containerForRecipes.innerHTML = markup;
}











