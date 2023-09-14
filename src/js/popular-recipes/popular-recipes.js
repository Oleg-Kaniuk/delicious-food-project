const popularRecipes = document.querySelector(".cards-popular-recipes");
console.log(popularRecipes);

//https://tasty-treats-backend.p.goit.global/api/recipes/popular	
async function servicePopularRecipes() {
    
    const response = await fetch("https://tasty-treats-backend.p.goit.global/api/recipes/popular")
    const recipes = await response.json();
  return recipes;
}
    
servicePopularRecipes()
    .then(recipes =>
        createMarcupRecipes(recipes)
        
)
    
    .catch(error => console.log(error));
       
function createMarcupRecipes(arr){
    const markup = arr.map(({ preview, title, description }) => 
        `<div class = "card-recipes"><div><img class ="img-popular" src="${preview}" alt="${title}" loading="lazy" width = "64"/></div> 
          <div class="popular-title-description">
            <h3 class = "title-third">${title}</h3>
            <p class = "description">${description}</p></div>
        </div> `).join('')
    popularRecipes.innerHTML = markup;
   }