import{i as t,a as n}from"./vanilla-back-to-top-b68a1fed.js";const l=document.querySelector(".favorite-recipes-list");document.querySelector("empty-favorites-container");const r=JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[],h="https://tasty-treats-backend.p.goit.global/api/recipes";async function g(s){try{const e=await n.get(`${h}/${s}`);return console.log(e),e}catch(e){console.error(`Failed to fetch images: ${e}`)}}r.length>0?r.map(s=>{console.log(s),g(s).then(e=>{console.log(e),l.insertAdjacentHTML("beforeend",v(e.data)),console.log(e.data)})}):console.error("Помилка");function v(s){const{_id:e,title:i,preview:c,description:o,rating:a}=s;return`<div class="blok-recipes " id="${e}">
        
        <input
          id="${e}"
          type="checkbox"
          class="heart-icon-elem "
          name="heart-icon"
          
        />
        <label for="${e}" aria-hidden="true" class="">
          <svg class="icon-heart-svg " width="22" height="22">
            <use href="${t}#icon-heart"></use>
          </svg>
        </label>
  
         <img class="img-blok-recipes " src="${c}" alt="${i}" />
  
   <div class="context-blok-recipes "> <h3 class="title-blok-recipes">${i}</h3>
    <p class="text-blok-recipes">${o}</p>
    <div class="num-stars-btn "><div class="blok-rating">
      <p class="text-number-blok-recipes ">${a}</p>
       <div class="stars ">
       <svg class="star-icon " width="18" height="18">
          <use href="${t}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${t}#icon-star"></use>
        </svg>
        <svg class="star-icon " width="18" height="18">
          <use href="${t}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${t}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${t}#icon-star"></use>
        </svg>
        </div>
        </div>
    
    <button id="${e}" class="btn-blok-recipes-see" type="button">See recipe</button></div>
    </div>
  
  </div>`}
