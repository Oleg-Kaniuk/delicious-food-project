import { backdropElem} from "/js/modal-recipe/modal-recipe.js"
import { onModal} from "/js/modal-recipe/modal-recipe.js"
const popularRecipes = document.querySelector(".cards-popular-recipes");

async function servicePopularRecipes() {
    const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
    const response = await fetch(`${BASE_URL}recipes/popular`);
    const recipes = await response.json();
    return recipes;
}
   
servicePopularRecipes()
    .then(recipes => {
        console.log(recipes);
        createMarkupRecipes(recipes);
        
        const cardPopularRecipes = document.querySelectorAll(".card-recipes");
        cardPopularRecipes.forEach(function (card) {
            const id = card.dataset.recipeId;
            console.log(id);
            card.addEventListener('click', () => {
                onPopularRecipesClick(id);
 
            });
        
        });
    })
    .catch(error => console.log(error));
       

function createMarkupRecipes(arr) {
    const markup = arr.map(({ _id, preview, title, description }) => 
        `<div class = "card-recipes" data-recipe-id = "${_id}">
        <div><img class ="img-popular" src="${preview}" alt="${title}" loading="lazy" width = "64" height = "64"/></div> 
          <div class="popular-title-description">
            <h3 class = "title-third">${title}</h3>
           <div class = "description-container"><p class = "popular-description">${description}</p></div> 
          </div>
        </div> `).join('')
    popularRecipes.innerHTML = markup;
    
}
function onPopularRecipesClick(id) {
backdropElem.classList.remove('is-hidden-recipe-backdrop')
 onModal(id)
};
   
