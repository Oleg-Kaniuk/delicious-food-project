const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

// Отримайте елементи DOM
const favoriteRecipesList = document.querySelector('.favorite-recipes-list');
const favoriteCategoriesList = document.querySelector('.categories-list');
const noFavoriteRecipesMessage = document.querySelector('.empty-favorites-text');
const favoriteHeroImg = document.querySelector('.hero-image')
    // Перевірте, чи є рецепти у localStorage
if (favoriteRecipes && favoriteRecipes.length > 0) {
    // Якщо рецепти є, додайте їх до списку
    favoriteRecipes.forEach(recipe => {
        const li = document.createElement('li');
        li.textContent = recipe;
        favoriteRecipesList.appendChild(li);
        favoriteHeroImg.style.display = 'block';
    });
} else {
    // Якщо рецептів немає, покажіть повідомлення
    noFavoriteRecipesMessage.style.display = 'block';


}