
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { createMarkupElForFilter, onCreateGoldStar} from "/js/recipes/recipes.js"
import { backdropElem } from '/js/modal-recipe/modal-recipe.js';
import { onModal } from '/js/modal-recipe/modal-recipe.js';

const containerForRecipes = document.querySelector(".container-for-recipes");
const paginationContainer = document.querySelector("#pagination");
let pagePagination = 1; // початкова сторінка
let itemsPerPage = 6; //на сторінці

const options = { 
     totalItems: 0,
     itemsPerPage: 6,
     visiblePages: 2,
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
  },
//  функція що відслідковує кліки та змінює поточну сторінку  
   onPageClick: function (event) {
    console.log(event);
    console.log(clickedPage);
    const clickedPage = event.page;
    if (pagePagination !== clickedPage) {
      pagePagination = clickedPage;
      fetchData(pagePagination);
      
    }
      },
};

export const pagination = new Pagination(paginationContainer, options);

let totalItems;
const page = pagination.getCurrentPage();//почaткатова сторінка з опцій

 const onCardPerPage = () => {
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
    return recipes;
}
// генерує першу сторінку з інформацією  про к-сть всіх елементів 
function renderfirstPage(page) {
    onCardPerPage();
      fetchData(page)
        .then(recipes => {
    pagePagination++
    totalItems = recipes.totalPages * options.itemsPerPage;

    pagination.reset(totalItems);//передає заг к-сть елементів з бекенду в пагінацію
   
    })
          .catch(error => console.log('errorPagination'));
  }
renderfirstPage(page);

//генерує наступну сторінку 
function renderEvt(page) {
  fetchData(page)
  .then(recipes => {
    pagePagination++;
    containerForRecipes.innerHTML = createMarkupElForFilter(recipes.results);
    onCreateGoldStar(recipes.results);
    const cardsRecipesBtn = document.querySelectorAll(
      '.btn-blok-recipes-see'
  );
  [...cardsRecipesBtn].forEach(function(card) {
      const id = card.id;
      card.addEventListener('click', () => {
        onRecipeClickTwo(id);
      });
  });
  })
        .catch(error => console.log(error));
}

  // тут мають рендеритись різні сторінки за допомогою цього методу
pagination.on('afterMove', (event) => {
  const currentPage = event.page;
  if (currentPage < pagePagination) {
    renderEvt(currentPage);

    
  }
  renderEvt(currentPage);


});


 //функція оновлює пагінацію при кліку на якусь категорію нe на пагінацію
 export function updatePagination() {
  pagination.reset(totalItems);
}
function onRecipeClickTwo(id) {
  backdropElem.classList.remove('is-hidden-recipe-backdrop');
  onModal(id);
}
