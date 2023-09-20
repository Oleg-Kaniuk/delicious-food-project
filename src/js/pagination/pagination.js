
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
      fetchData(pagePagination)
    }
      },
};
const pagination = new Pagination(paginationContainer, options);

let totalItems;
const page = pagination.getCurrentPage();//почaткатова сторінка з опцій

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
    return recipes;
}
// генерує першу сторінку з інформацією  про к-сть всіх елементів 
function renderfirstPage(page) {
    getCardPerPage();
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

console.log(pagination);
