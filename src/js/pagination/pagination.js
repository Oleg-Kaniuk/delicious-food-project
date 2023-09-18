
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { createMarkupElForFilter } from '/js/recipes/recipes.js';

const containerForRecipes = document.querySelector('.container-for-recipes');
const paginationContainer = document.querySelector(".tui-pagination");
console.log(paginationContainer);
const options = { 
     totalItems: 0,
     itemsPerPage: 6,
     visiblePages: 3,
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
    containerForRecipes.innerHTML = createMarkupElForFilter(recipes.results);
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











