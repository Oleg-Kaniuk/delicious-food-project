import{b as p,o as v,a as f,i as c}from"./vanilla-back-to-top-5048976b.js";const n=document.querySelector(".favorite-recipes-list"),u=document.querySelector(".categories"),i=JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[],y=document.querySelector(".category-btn"),b=document.querySelectorAll(".category-button"),g=new Set,m=document.querySelector(".empty-favorites-container"),k="https://tasty-treats-backend.p.goit.global/api/recipes";async function S(s){try{return await f.get(`${k}/${s}`)}catch(e){console.error(`Failed to fetch images: ${e}`)}}function $(s){const{_id:e,title:o,preview:t,description:r,rating:a,category:l}=s,d=(JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[]).includes(s);return`<li class="blok-recipes blok-recipes-fav" id="${e}">
        
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
  
  </li>`}i.length>0?i.map(s=>{S(s).then(e=>{n.insertAdjacentHTML("beforeend",$(e.data)),E(e.data),[...document.querySelectorAll(".btn-blok-recipes-see")].forEach(function(r){const a=r.id;r.addEventListener("click",()=>{F(a)})});const t=e.data.category;if(t){g.add(t);const r=[...g].map(a=>`
      <button class="category-button" data-category="${a}">${a}</button>
  `).join("");u.innerHTML=r}})}):(n.innerHTML="",u.innerHTML="",y.style.display="none",m.innerHTML=h());function h(){return`
<svg width="68" height="58" viewBox="0 0 37 32">
<use xlink:href="../../img/icon-sprite.svg#icon-hat"></use>
</svg>
<p class="empty-favorites-text">It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.
</p>
`}n&&n.addEventListener("change",C);function C(s){const e=s.target.id,o=i.indexOf(e);if(o!==-1){i.splice(o,1),localStorage.setItem("saveCheckedFavorite",JSON.stringify(i));const t=document.getElementById(`${e}`),r=t.getAttribute("data-category");if(t.remove(),location.reload(),document.querySelectorAll(".category-buttons"),L(r),i.length===0){const a=h(),l=document.getElementById("favoritesContainer");l&&(l.innerHTML=a)}}}function L(s){const e=new Set;n.querySelectorAll(".blok-recipes").forEach(o=>{const t=o.getAttribute("data-category");t&&e.add(t)}),s&&b.forEach(o=>{const t=o.getAttribute("data-category");t===s&&(o.remove(),e.delete(t))})}function E(){document.querySelectorAll(".blok-recipes-fav").forEach(e=>{const o=parseFloat(e.querySelector(".text-number-blok-recipes").textContent),t=e.querySelectorAll(".star-icon");for(let r=0;r<t.length;r++)r<Math.floor(o)&&t[r].classList.add("star-color-icon")})}function F(s){p.classList.remove("is-hidden-recipe-backdrop"),v(s)}
