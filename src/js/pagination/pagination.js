
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
 console.log(pagination);

let totalItems;
const page = pagination.getCurrentPage();//почaткатова сторінка з опцій


let pagePagination = 1; // початкова сторінка
const itemsPerPage = 6; //на сторінці

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
  console.log(page);
  fetchData(page)
  .then(recipes => {
    console.log(recipes);
    pagePagination++;
    containerForRecipes.innerHTML = createMarkupElForFilter(recipes.results);
    console.log(recipes.results);
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


