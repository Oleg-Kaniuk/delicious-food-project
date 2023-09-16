import axios from 'axios';
import { createMarkupElForFilter } from '../recipes/recipes.js';

const BASEURL_CATEGORIES = 'https://tasty-treats-backend.p.goit.global/api/categories';
const BASEURL_RECIPES = 'https://tasty-treats-backend.p.goit.global/api/recipes';

const allCategoriesButton = document.querySelector('.js-all-categories-button');
const categoriesList = document.querySelector('.categories-list');
const galleryEl = document.querySelector('.container-for-recipes');

if (categoriesList) {
    // Создаем кнопку для всех категорий

    // Функция для получения и отображения категорий
    const fetchCategories = async() => {
        try {
            const response = await axios.get(BASEURL_CATEGORIES);
            const categories = response.data;
            categories.forEach(category => {
                const listItem = document.createElement('li');
                const button = document.createElement('button');
                button.textContent = category.name;
                button.classList.add('categories-list-element');
                categoriesList.appendChild(button);
                categoriesList.appendChild(listItem);
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Функция для получения и отображения рецептов по выбранной категории
    const getRecipesByCategory = async(event) => {
        const buttons = document.querySelectorAll('.categories-list-element');

        buttons.forEach(button => {
            button.classList.remove('is-active');
        });

        event.target.classList.add('is-active');
        const checkedCategory = event.target.textContent;
        let cardsPerPage = 0;
        let pageCounter = 1;

        const windowWidth = document.documentElement.clientWidth;
        if (windowWidth < 768) {
            cardsPerPage = 6;
        } else if (windowWidth >= 768 && windowWidth < 1200) {
            cardsPerPage = 8;
        } else {
            cardsPerPage = 9;
        }

        try {
            const response = await axios.get(BASEURL_RECIPES, {
                params: {
                    category: checkedCategory,
                    page: pageCounter,
                    limit: cardsPerPage,
                },
            });

            galleryEl.innerHTML = '';

            // Используем функцию createMarkupElForFilter для создания разметки
            galleryEl.innerHTML = createMarkupElForFilter(response.data.results);
        } catch (error) {
            console.error(`Failed to fetch images: ${error}`);
        }
    };
    const fetchImages = async() => {
        try {
            const response = await axios.get(BASEURL_RECIPES);
            galleryEl.innerHTML = '';
            // Використовуйте вашу функцію createMarkupElForFilter для створення розмітки
            galleryEl.innerHTML = createMarkupElForFilter(response.data.results);
        } catch (error) {
            console.error(`Failed to fetch images: ${error}`);
        }
    };
    // Функция для обработки нажатия кнопки "All Categories"
    const handleAllCategoriesBtnClick = () => {
        const buttons = document.querySelectorAll('.categories-list-element');

        buttons.forEach(button => {
            button.classList.remove('is-active');
        });

        allCategoriesButton.classList.add('is-active');

        galleryEl.innerHTML = '';
        // Вызов функции для получения всех рецептов
        fetchImages(); // Вам нужно определить функцию fetchImages
    };

    // Добавляем обработчики событий
    categoriesList.addEventListener('click', getRecipesByCategory);
    allCategoriesButton.addEventListener('click', handleAllCategoriesBtnClick);

    // Инициируем загрузку категорий при загрузке страницы
    fetchCategories();
}