import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import axios from 'axios';
import { createMarkupElForFilter } from '../recipes/recipes.js';

const BASEURL_CATEGORIES = 'https://tasty-treats-backend.p.goit.global/api/categories';
const BASEURL_RECIPES = 'https://tasty-treats-backend.p.goit.global/api/recipes';

const allCategoriesButton = document.querySelector('.js-all-categories-button');
const categoriesList = document.querySelector('.categories-list');
const galleryEl = document.querySelector('.container-for-recipes');
const cardsPerPage = {
    small: 6,
    medium: 8,
    large: 9,
};
const paginationContainer = document.querySelector(".pagination-container");
console.log(paginationContainer);
let page = 1;
let totalPages = 1;
let showEllipsis = false;


      const fetchImages = async(page) => {
        try {
          const response = await axios.get(BASEURL_RECIPES, {
                params: {
                    page: page,
                    limit: cardsPerPage[getCardPerPage()],
                },
            });
          
          galleryEl.innerHTML = '';
          galleryEl.innerHTML = createMarkupElForFilter(response.data.results);
          totalPages = response.data.totalPages;
          updatePaginationButtons();
        } catch (error) {
            console.error(`Failed to fetch images: ${error}`);
        }
    };

const updatePaginationButtons = () => {
  paginationContainer.innerHTML = '';
  
  const showEllipsis = totalPages > 3 && page < totalPages;
  for (let i = 1; i <= totalPages; i++){
    //if (i <= 3) {
      createMarkupPagination(i);

      // createMarkupEllipsis(i);
    // }
    // if (i >= 4 && showEllipsis) {
    //  //createMarkupEllipsis(i);
    //    createMarkupPagination(i);
    //  }
  }
    
};

const getCardPerPage = () => {
        const windowWidth = document.documentElement.clientWidth;

        if (windowWidth < 768) {
            console.log('small');
            return 'small';
        } else if (windowWidth < 1200) {
            console.log('medium');
            return 'medium';
        } else {
            console.log('large');
            return 'large';
        }
    };

const handlePaginationClick = (event) => {
  if (event.target.classList.contains('page-button')) {
    
    const newPage = parseInt(event.target.dataset.page);
    if (newPage !== page) {
      page = newPage;
      showEllipsis = true;
      fetchImages(page);
      if (newPage === totalPages + 1) {
        showEllipsis = false;
        fetchImages(page);
      } else {
        showEllipsis = true;
        updatePaginationButtons();
      }
      
    }
}
}
paginationContainer.addEventListener('click', handlePaginationClick);
fetchImages(page);


function createMarkupPagination(i) {
  const button = document.createElement('button');
  button.classList.add('page-button');
  button.dataset.page = i;
  button.textContent = i;
paginationContainer.appendChild(button);
}

function createMarkupEllipsis(arr) {
  const button = document.createElement('button');
  button.classList.add('page-button');
  button.textContent = '...';
paginationContainer.appendChild(button);
}


