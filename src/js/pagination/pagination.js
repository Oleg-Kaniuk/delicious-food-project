import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import axios from 'axios';
import { createMarkupElForFilter } from '/js/recipes/recipes.js';

const options = {
  totalItems: 0,
  itemsPerPage: 6,
  visiblePages: 2,
  page: 1,
  centerAlign: false,
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
 
pagination.on('afterMove', (event) => {
    const currentPage = event.page;
    console.log(`${currentPage}`);
})



const containerForRecipes = document.querySelector('.container-for-recipes');
console.log(containerForRecipes);
const page = pagination.getCurrentPage();

async function fetchData() {
    const BASEURL_RECIPES =
    'https://tasty-treats-backend.p.goit.global/api/recipes';
    const response = await fetch(`${BASEURL_RECIPES}`);
    const recipes = await response.json();
    console.log(recipes);
    return recipes;
}


renderfirstPage(page)

function renderfirstPage(page) {
      fetchData(page)
  .then(recipes => {
      console.log(recipes);
       totalItems = recipes.totalPages * options.itemsPerPage;
      console.log(totalItems);
      pagination.reset(totalItems)

    })
          
    .catch(error => console.log(error));
  }


function renderEvt(page) {
      fetchData(page)
  .then(recipes => {
      console.log(recipes);
      pagination.reset(totalItems)
      
  })
        .catch(error => console.log(error));
}
  
 pagination.on('afterMove', (event) => {
  const currentPage = event.page;
  console.log(currentPage);
  renderEvt(currentPage)
});













