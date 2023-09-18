import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import axios from 'axios';

import { createMarkupElForFilter } from '/js/recipes/recipes.js';
import { onCreateGoldStar } from '/js/recipes/recipes.js';

const options = {
  totalItems: 0,
  itemsPerPage: 6,
  visiblePages: 5,
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

//  export const pagination = new Pagination('pagination', options);
const pagination = new Pagination('pagination', options);

// pagination.movePageTo(1);


const BASEURL_CATEGORIES =
    'https://tasty-treats-backend.p.goit.global/api/categories';
const BASEURL_RECIPES =
    'https://tasty-treats-backend.p.goit.global/api/recipes';

const allCategoriesButton = document.querySelector('.js-all-categories-button');
const categoriesList = document.querySelector('.categories-list');
const galleryEl = document.querySelector('.container-for-recipes');
const cardsPerPage = {
    small: 6,
    medium: 8,
    large: 9,
};

const page = pagination.getCurrentPage();
console.log(page);

const fetchImages = async(currentPage) => {
        try {
            const response = await axios.get(BASEURL_RECIPES, {
                params: {
                    page: currentPage,
                  //  limit: cardsPerPage[getCardPerPage()],
                  limit: options.itemsPerPage,
                },
            });
          
            galleryEl.innerHTML = '';
            galleryEl.innerHTML = createMarkupElForFilter(response.data.results);
          onCreateGoldStar(response.data.results);
          console.log(response);
         console.log(response.data.totalPages*options.itemsPerPage);
          pagination.reset({ totalItems: response.data.totalPages*options.itemsPerPage, });
        } catch (error) {
            console.error(`Failed to fetch images: ${error}`);
        }
    };


const getCardPerPage = () => {
    const windowWidth = document.documentElement.clientWidth;

    if (windowWidth < 768) {
        return 'small';
    } else if (windowWidth < 1200) {
        return 'medium';
    } else {
        return 'large';
    }
};
export async function getRecipesByCategory(event) {
    const buttons = document.querySelectorAll('.categories-list-element');
    buttons.forEach(button => {
        button.classList.remove('is-active');
    });
    event.target.classList.add('is-active');
    const checkedCategory = event.target.textContent;
    const currentCardPerPage = cardsPerPage[getCardPerPage()];
    try {
        const response = await axios.get(BASEURL_RECIPES, {
            params: {
                category: checkedCategory,
                page: 1,
                perPage: currentCardPerPage,
            },
        });
        galleryEl.innerHTML = '';
      galleryEl.innerHTML = createMarkupElForFilter(response.data.results);
      
        onCreateGoldStar(response.data.results);
    } catch (error) {
        console.error(`Failed to fetch images: ${error}`);
    }
}
if (categoriesList) {
    const fetchCategories = async() => {
        try {
            const response = await axios.get(BASEURL_CATEGORIES);
            const categories = response.data;
            const categoryButtons = categories
                .map(
                    category =>
                    `<li>
                <button class="categoreis-list-element">${category.name}</button>
                </li>`
                )
                .join('');
            categoriesList.innerHTML = categoryButtons;
          fetchImages();
          
        } catch (error) {
            console.error(error);
        }
    };

    
    const handleAllCategoriesBtnClick = () => {
        const buttons = document.querySelectorAll('.categories-list-element');
        buttons.forEach(button => {
            button.classList.remove('is-active');
        });
        allCategoriesButton.classList.add('is-active');
        galleryEl.innerHTML = '';
        fetchImages();
    };

    window.addEventListener('resize', fetchImages);
    window.addEventListener('load', fetchImages);

    categoriesList.addEventListener('click', getRecipesByCategory);
    allCategoriesButton.addEventListener('click', handleAllCategoriesBtnClick);

    fetchCategories(page);
}
pagination.on('afterMove', (event) => {
  const currentPage = event.page;
  console.log(currentPage);
  fetchImages(currentPage);
});

