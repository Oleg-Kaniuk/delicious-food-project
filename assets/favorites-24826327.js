import{b as h,o as v,a as p,i as c}from"./vanilla-back-to-top-ebe5e612.js";const f="data:image/png;base64,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",n=document.querySelector(".favorite-recipes-list"),g=document.querySelector(".categories"),i=JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[],b=document.querySelector(".category-btn"),m=document.querySelectorAll(".category-button"),A=new Set,y=document.querySelector(".empty-favorites-container"),B="https://tasty-treats-backend.p.goit.global/api/recipes";async function S(r){try{return await p.get(`${B}/${r}`)}catch(e){console.error(`Failed to fetch images: ${e}`)}}function I(r){const{_id:e,title:s,preview:t,description:o,rating:a,category:l}=r,d=(JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[]).includes(r);return`<li class="blok-recipes blok-recipes-fav" id="${e}">
        
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
    <p class="text-blok-recipes">${o}</p>
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
  
  </li>`}i.length>0?i.map(r=>{S(r).then(e=>{n.insertAdjacentHTML("beforeend",I(e.data)),w(e.data),[...document.querySelectorAll(".btn-blok-recipes-see")].forEach(function(o){const a=o.id;o.addEventListener("click",()=>{k(a)})});const t=e.data.category;if(t){A.add(t);const o=[...A].map(a=>`
      <button class="category-button" data-category="${a}">${a}</button>
  `).join("");g.innerHTML=o}})}):(n.innerHTML="",g.innerHTML="",b.style.display="none",y.innerHTML=u());function u(){return`
    <img class="hero-hat-icon" src="${f}" alt="hat">
<p class="empty-favorites-text">It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.
</p>
`}n&&n.addEventListener("change",E);function E(r){const e=r.target.id,s=i.indexOf(e);if(s!==-1){i.splice(s,1),localStorage.setItem("saveCheckedFavorite",JSON.stringify(i));const t=document.getElementById(`${e}`),o=t.getAttribute("data-category");if(t.remove(),location.reload(),document.querySelectorAll(".category-buttons"),C(o),i.length===0){const a=u(),l=document.getElementById("favoritesContainer");l&&(l.innerHTML=a)}}}function C(r){const e=new Set;n.querySelectorAll(".blok-recipes").forEach(s=>{const t=s.getAttribute("data-category");t&&e.add(t)}),r&&m.forEach(s=>{const t=s.getAttribute("data-category");t===r&&(s.remove(),e.delete(t))})}function w(){document.querySelectorAll(".blok-recipes-fav").forEach(e=>{const s=parseFloat(e.querySelector(".text-number-blok-recipes").textContent),t=e.querySelectorAll(".star-icon");for(let o=0;o<t.length;o++)o<Math.floor(s)&&t[o].classList.add("star-color-icon")})}function k(r){h.classList.remove("is-hidden-recipe-backdrop"),v(r)}
