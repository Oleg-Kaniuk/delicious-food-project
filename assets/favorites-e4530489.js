import{b as p,o as v,a as f,i as c}from"./vanilla-back-to-top-39df0cda.js";const n=document.querySelector(".favorite-recipes-list"),u=document.querySelector(".categories");document.querySelector("empty-favorites-container");const i=JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[],g=new Set,m=document.querySelector(".empty-favorites-container"),y="https://tasty-treats-backend.p.goit.global/api/recipes";async function b(s){try{return await f.get(`${y}/${s}`)}catch(e){console.error(`Failed to fetch images: ${e}`)}}function k(s){const{_id:e,title:o,preview:t,description:r,rating:a,category:l}=s,d=(JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[]).includes(s);return`<li class="blok-recipes blok-recipes-fav" id="${e}">
        
        <input
          id="${e}"
          data-category-card="${l}"
          type="checkbox"
          class="heart-icon-elem"
          name="heart-icon"
          ${d?"":"checked"} 
          
        />
        <label for="${e}" aria-hidden="true" class="${d?"heart-icon-action  svg-active":"heart-icon-action "}">
          <svg class="icon-heart-svg " width="22" height="22">
            <use href="${c}#icon-heart"></use>
          </svg>
        </label>
  
         <img class="img-blok-recipes " src="${t}" alt="${o}" />
  
   <div class="context-blok-recipes "> <h3 class="title-blok-recipes">${o}</h3>
    <p class="text-blok-recipes">${r}</p>
    <div class="num-stars-btn "><div class="blok-rating">
      <p class="text-number-blok-recipes ">${a}</p>
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
  
  </li>`}i.length>0?i.map(s=>{b(s).then(e=>{n.insertAdjacentHTML("beforeend",k(e.data)),C(e.data),[...document.querySelectorAll(".btn-blok-recipes-see")].forEach(function(r){const a=r.id;r.addEventListener("click",()=>{L(a)})});const t=e.data.category;if(t){g.add(t);const r=[...g].map(a=>`
      <button class="category-button" data-category="${a}">${a}</button>
  `).join("");u.innerHTML=r}})}):(n.innerHTML="",u.innerHTML="",m.innerHTML=h());function h(){return`
<svg width="68" height="58" viewBox="0 0 37 32">
<use xlink:href="../../img/icon-sprite.svg#icon-hat"></use>
</svg>
<p class="empty-favorites-text">It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.
</p>
`}n&&n.addEventListener("change",S);function S(s){const e=s.target.id,o=i.indexOf(e);if(o!==-1){i.splice(o,1),localStorage.setItem("saveCheckedFavorite",JSON.stringify(i));const t=document.getElementById(`${e}`),r=t.getAttribute("data-category");if(t.remove(),location.reload(),document.querySelectorAll(".category-buttons"),$(r),i.length===0){const a=h(),l=document.getElementById("favoritesContainer");l&&(l.innerHTML=a)}}}function $(s){const e=new Set;n.querySelectorAll(".blok-recipes").forEach(o=>{const t=o.getAttribute("data-category");t&&e.add(t)}),s&&categoryButtons.forEach(o=>{console.dir(o.dataset);const t=o.getAttribute("data-category");t===s&&(o.remove(),e.delete(t),console.dir(t),console.dir(e))})}function C(){document.querySelectorAll(".blok-recipes-fav").forEach(e=>{const o=parseFloat(e.querySelector(".text-number-blok-recipes").textContent),t=e.querySelectorAll(".star-icon");for(let r=0;r<t.length;r++)r<Math.floor(o)&&t[r].classList.add("star-color-icon")})}function L(s){p.classList.remove("is-hidden-recipe-backdrop"),v(s)}
