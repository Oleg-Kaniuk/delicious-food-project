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

if (categoriesList) {
    const fetchCategories = async() => {
        try {
            const response = await axios.get(BASEURL_CATEGORIES);
            const categories = response.data;
            categories.forEach(category => {
                const listItem = document.createElement('li');
                const button = document.createElement('button');
                button.textContent = category.name;
                button.classList.add('categories-list-element');
                listItem.appendChild(button);
                categoriesList.appendChild(listItem);
            });
            fetchImages();
        } catch (error) {
            console.error(error);
        }
    };

    const getRecipesByCategory = async(event) => {
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
                    limit: cardsPerPage,
                },
            });
            galleryEl.innerHTML = '';
            galleryEl.innerHTML = createMarkupElForFilter(response.data.results);
        } catch (error) {
            console.error(`Failed to fetch images: ${error}`);
        }
    };

    const fetchImages = async() => {
        try {
            const response = await axios.get(BASEURL_RECIPES, {
                params: {
                    page: 1,
                    limit: cardsPerPage[getCardPerPage()],
                },
            });
            galleryEl.innerHTML = '';
            galleryEl.innerHTML = createMarkupElForFilter(response.data.results);
        } catch (error) {
            console.error(`Failed to fetch images: ${error}`);
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


    categoriesList.addEventListener('click', getRecipesByCategory);
    allCategoriesButton.addEventListener('click', handleAllCategoriesBtnClick);

    fetchCategories();
}



