
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { createMarkupElForFilter, onCreateGoldStar} from "/js/recipes/recipes.js"

const containerForRecipes = document.querySelector(".container-for-recipes");
const paginationContainer = document.querySelector("#pagination");

const options = { 
     totalItems: 0,
     itemsPerPage: 6,
     visiblePages: 3,
     page: 1,
  centerAlign: true,
  //функція що відслідковує кліки та змінює поточну сторінку  
  onPageClick: function (event) {
    const clickedPage = event.page;
    if (pagePagination !== clickedPage) {
      pagePagination = clickedPage;
      fetchData(pagePagination);
    }
      },
};
const pagination = new Pagination(paginationContainer, options);
 console.log(pagination);

let totalItems;

let page = pagination.getCurrentPage();//почaткатова сторінка з опцій


let pagePagination = 1; // початкова сторінка
let itemsPerPage = 6; //на сторінці

const getCardPerPage = () => {
    const windowWidth = document.documentElement.clientWidth;
       
    if (windowWidth < 768) {
      itemsPerPage;
      
    } else if (windowWidth < 1200) {
      itemsPerPage = 8;
      
    } else {
      itemsPerPage = 9;
      
    }
};

async function fetchData(pagePagination) {
    const BASEURL_RECIPES =
    'https://tasty-treats-backend.p.goit.global/api/recipes';
    const response = await fetch(`${BASEURL_RECIPES}?page=${pagePagination}&limit=${itemsPerPage}`);
    const recipes = await response.json();
  console.log(recipes);
  console.log(page);
  console.log(pagePagination);
    return recipes;
}
// генерує першу сторінку з інформацією  про к-сть всіх елементів 
function renderfirstPage(page) {
      fetchData(page)
        .then(recipes => {
    pagePagination++
    totalItems = recipes.totalPages * options.itemsPerPage;
    console.log(totalItems);
    pagination.reset(totalItems);//передає заг к-сть елементів з бекенду в пагінацію
   
    })
          .catch(error => console.log('errorPagination'));
  }
renderfirstPage(page);

//генерує наступну сторінку 
function renderEvt(page) {
  getCardPerPage();
  console.log(page);
  fetchData(page,)
  .then(recipes => {
    console.log(recipes);
    pagePagination++;
    containerForRecipes.innerHTML = createMarkupElForFilter(recipes.results);

    onCreateGoldStar(recipes.results);
  })
        .catch(error => console.log(error));
}

  // тут мають рендеритись різні сторінки за допомогою цього методу
pagination.on('afterMove', (event) => {
  const currentPage = event.page;
  console.log(currentPage);// це поточна сторінка яка має передаватись у ф-ю генерації інших сторінок
  if (currentPage < pagePagination) {
    renderEvt(currentPage);
  }
  renderEvt(currentPage);
});

// function createMarkupElForPagination(arr) {
//  return arr.map(({ _id, title, imgUrl, preview, description, rating }) =>
//    `<div class="blok-recipes " id="${_id}">
      
//       <input
//         id="${_id}"
//         type="checkbox"
//         class="heart-icon-elem "
//         name="heart-icon"
        
//       />
//       <label for="${_id}" aria-hidden="true" class="${labelClass} ">
//         <svg class="icon-heart-svg " width="22" height="22">
//           <use href="${imgUrl}#icon-heart"></use>
//         </svg>
//       </label>

//        <img class="img-blok-recipes " src="${preview}" alt="${title}" />

//  <div class="context-blok-recipes "> <h3 class="title-blok-recipes">${title}</h3>
//   <p class="text-blok-recipes">${description}</p>
//   <div class="num-stars-btn "><div class="blok-rating">
//     <p class="text-number-blok-recipes ">${rating}</p>
//      <div class="stars ">
//      <svg class="star-icon " width="18" height="18">
//         <use href="${imgUrl}#icon-star"></use>
//       </svg>
//       <svg class="star-icon" width="18" height="18">
//         <use href="${imgUrl}#icon-star"></use>
//       </svg>
//       <svg class="star-icon " width="18" height="18">
//         <use href="${imgUrl}#icon-star"></use>
//       </svg>
//       <svg class="star-icon" width="18" height="18">
//         <use href="${imgUrl}#icon-star"></use>
//       </svg>
//       <svg class="star-icon" width="18" height="18">
//         <use href="${imgUrl}#icon-star"></use>
//       </svg>
//       </div>
//       </div>
  
//   <button id="${_id}" class="btn-blok-recipes-see" type="button">See recipe</button></div>
//   </div>

// </div>`).join(''); 
   
// }

