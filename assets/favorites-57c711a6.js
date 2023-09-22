import{b as p,o as f,a as v,i as c}from"./vanilla-back-to-top-c8f8cb5c.js";const n=document.querySelector(".favorite-recipes-list"),u=document.querySelector(".categories"),i=JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[],y=document.querySelector(".category-btn"),m=document.querySelectorAll(".category-button"),g=new Set,b=document.querySelector(".empty-favorites-container"),k="https://tasty-treats-backend.p.goit.global/api/recipes";async function S(o){try{return await v.get(`${k}/${o}`)}catch(e){console.error(`Failed to fetch images: ${e}`)}}function $(o){const{_id:e,title:s,preview:t,description:a,rating:r,category:l}=o,d=(JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[]).includes(o);return`<li class="blok-recipes blok-recipes-fav" id="${e}">
        
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
  
         <img class="img-blok-recipes " src="${t}" alt="${s}" />
  
   <div class="context-blok-recipes "> <h3 class="title-blok-recipes">${s}</h3>
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
  
  </li>`}i.length>0?i.map(o=>{S(o).then(e=>{n.insertAdjacentHTML("beforeend",$(e.data)),E(e.data),[...document.querySelectorAll(".btn-blok-recipes-see")].forEach(function(a){const r=a.id;a.addEventListener("click",()=>{F(r)})});const t=e.data.category;if(t){g.add(t);const a=[...g].map(r=>`
      <button class="category-button" data-category="${r}">${r}</button>
  `).join("");u.innerHTML=a}})}):(n.innerHTML="",u.innerHTML="",y.style.display="none",b.innerHTML=h());function h(){return`
    <img class="hero-hat-icon" src="../../img/hero/hat.png" alt="hat">
<p class="empty-favorites-text">It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.
</p>
`}n&&n.addEventListener("change",C);function C(o){const e=o.target.id,s=i.indexOf(e);if(s!==-1){i.splice(s,1),localStorage.setItem("saveCheckedFavorite",JSON.stringify(i));const t=document.getElementById(`${e}`),a=t.getAttribute("data-category");if(t.remove(),location.reload(),document.querySelectorAll(".category-buttons"),L(a),i.length===0){const r=h(),l=document.getElementById("favoritesContainer");l&&(l.innerHTML=r)}}}function L(o){const e=new Set;n.querySelectorAll(".blok-recipes").forEach(s=>{const t=s.getAttribute("data-category");t&&e.add(t)}),o&&m.forEach(s=>{const t=s.getAttribute("data-category");t===o&&(s.remove(),e.delete(t))})}function E(){document.querySelectorAll(".blok-recipes-fav").forEach(e=>{const s=parseFloat(e.querySelector(".text-number-blok-recipes").textContent),t=e.querySelectorAll(".star-icon");for(let a=0;a<t.length;a++)a<Math.floor(s)&&t[a].classList.add("star-color-icon")})}function F(o){p.classList.remove("is-hidden-recipe-backdrop"),f(o)}
