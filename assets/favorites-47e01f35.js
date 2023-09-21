import{b as p,o as v,a as f,i as c}from"./vanilla-back-to-top-f14b1564.js";const n=document.querySelector(".favorite-recipes-list"),d=document.querySelector(".categories");document.querySelector("empty-favorites-container");const i=JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[],u=new Set,y=d.querySelectorAll(".category-button");document.querySelector(".all-categories-button");const m=document.querySelector(".empty-favorites-container"),b="https://tasty-treats-backend.p.goit.global/api/recipes";async function k(t){try{return await f.get(`${b}/${t}`)}catch(e){console.error(`Failed to fetch images: ${e}`)}}function S(t){const{_id:e,title:o,preview:s,description:a,rating:r,category:l}=t,g=(JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[]).includes(t);return`<li class="blok-recipes blok-recipes-fav" id="${e}">
        
        <input
          id="${e}"
          data-category-card="${l}"
          type="checkbox"
          class="heart-icon-elem"
          name="heart-icon"
          ${g?"":"checked"} 
          
        />
        <label for="${e}" aria-hidden="true" class="${g?"heart-icon-action  svg-active":"heart-icon-action "}">
          <svg class="icon-heart-svg " width="22" height="22">
            <use href="${c}#icon-heart"></use>
          </svg>
        </label>
  
         <img class="img-blok-recipes " src="${s}" alt="${o}" />
  
   <div class="context-blok-recipes "> <h3 class="title-blok-recipes">${o}</h3>
    <p class="text-blok-recipes">${a}</p>
    <div class="num-stars-btn "><div class="blok-rating">
      <p class="text-number-blok-recipes ">${r}</p>
       <div class="stars ">
       <svg class="star-icon " width="18" height="18">
          <use href="${c}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${c}#icon-star"></use>
        </svg>
        <svg class="star-icon " width="18" height="18">
          <use href="${c}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${c}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${c}#icon-star"></use>
        </svg>
        </div>
        </div>
    
    <button id="${e}" class="btn-blok-recipes-see" type="button">See recipe</button></div>
    </div>
  
  </li>`}i.length>0?i.map(t=>{k(t).then(e=>{n.insertAdjacentHTML("beforeend",S(e.data)),C(e.data),[...document.querySelectorAll(".btn-blok-recipes-see")].forEach(function(a){const r=a.id;a.addEventListener("click",()=>{E(r)})});const s=e.data.category;if(s){u.add(s);const a=[...u].map(r=>`
      <button class="category-button" data-category="${r}">${r}</button>
  `).join("");d.innerHTML=a}})}):(n.innerHTML="",d.innerHTML="",m.innerHTML=h());function h(){return`
<svg width="68" height="58" viewBox="0 0 37 32">
<use xlink:href="./img/icon-sprite.svg#icon-hat"></use>
</svg>
<p class="empty-favorites-text">It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.
</p>
`}n&&n.addEventListener("change",$);function $(t){const e=t.target.id,o=i.indexOf(e);if(o!==-1){i.splice(o,1),localStorage.setItem("saveCheckedFavorite",JSON.stringify(i));const s=document.getElementById(`${e}`),a=s.getAttribute("data-category");if(s.remove(),i.length===0){const r=h(),l=document.getElementById("favoritesContainer");l.innerHTML=r}L(a)}}function L(t){const e=new Set;n.querySelectorAll(".blok-recipes").forEach(o=>{const s=o.getAttribute("data-category");s&&e.add(s)}),t&&y.forEach(o=>{o.getAttribute("data-category")===t&&o.remove()})}function C(t){const e=document.querySelectorAll(".star-icon");let o=0;for(let s=0;s<5;s+=1)s<Math.floor(t.rating)&&e&&e[o].classList.add("star-color-icon"),o+=1}function E(t){p.classList.remove("is-hidden-recipe-backdrop"),v(t)}
