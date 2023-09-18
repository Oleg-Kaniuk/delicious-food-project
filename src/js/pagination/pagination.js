import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
console.log(Pagination);

const paginationContainer = document.querySelector(".tui-pagination");
const options = { // below default value of options
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
 console.log(pagination);

let totalItems;
const page = pagination.getCurrentPage();

async function fetchData() {
    const BASEURL_RECIPES =
    'https://tasty-treats-backend.p.goit.global/api/recipes';
    const response = await fetch(`${BASEURL_RECIPES}`);
    const recipes = await response.json();
    console.log(recipes);
    return recipes;
}

function renderfirstPage(page) {
      fetchData(page)
  .then(recipes => {
    console.log(recipes);
    console.log(recipes.totalPages);
    console.log(options.itemsPerPage);
    totalItems = recipes.totalPages * options.itemsPerPage;
    console.log(totalItems);
    pagination.reset(totalItems);

    })
          .catch(error => console.log('errorPagination'));
  }
renderfirstPage(page);


function renderEvt(page) {
    fetchData(page)
  .then(recipes => {
    console.log(recipes);
    pagination.reset(totalItems)
    console.log(totalItems);
  })
        .catch(error => console.log(error));
}

  
pagination.on('afterMove', (event) => {
  const currentPage = event.page;
  console.log(currentPage);
  renderEvt(currentPage);
});













