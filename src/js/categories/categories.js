import axios from 'axios';
import { createMarkupElForFilter } from '/js/recipes/recipes.js';
import { onCreateGoldStar } from '/js/recipes/recipes.js';
// import { pagination } from '/js/pagination/pagination.js'
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
                perPage: cardsPerPage,
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
            onCreateGoldStar(response.data.results);
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

    window.addEventListener('resize', fetchImages);
    window.addEventListener('load', fetchImages);

    categoriesList.addEventListener('click', getRecipesByCategory);
    allCategoriesButton.addEventListener('click', handleAllCategoriesBtnClick);

    fetchCategories();
}