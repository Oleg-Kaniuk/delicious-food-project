import{a as v,i as a}from"./vanilla-back-to-top-3657e9fb.js";const c=document.querySelector(".favorite-recipes-list"),l=document.querySelector(".categories");document.querySelector("empty-favorites-container");const i=JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[],u=new Set,p=l.querySelectorAll(".category-button");document.querySelector(".all-categories-button");const f=document.querySelector(".empty-favorites-container"),y="https://tasty-treats-backend.p.goit.global/api/recipes";async function m(o){try{return await v.get(`${y}/${o}`)}catch(e){console.error(`Failed to fetch images: ${e}`)}}function b(o){const{_id:e,title:t,preview:s,description:r,rating:n}=o,g=(JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[]).includes(o);return`<li class="blok-recipes blok-recipes-fav" id="${e}">
        
        <input
          id="${e}"
          type="checkbox"
          class="heart-icon-elem"
          name="heart-icon"
          ${g?"":"checked"} 
          
        />
        <label for="${e}" aria-hidden="true" class="${g?"heart-icon-action  svg-active":"heart-icon-action "}">
          <svg class="icon-heart-svg " width="22" height="22">
            <use href="${a}#icon-heart"></use>
          </svg>
        </label>
  
         <img class="img-blok-recipes " src="${s}" alt="${t}" />
  
   <div class="context-blok-recipes "> <h3 class="title-blok-recipes">${t}</h3>
    <p class="text-blok-recipes">${r}</p>
    <div class="num-stars-btn "><div class="blok-rating">
      <p class="text-number-blok-recipes ">${n}</p>
       <div class="stars ">
       <svg class="star-icon " width="18" height="18">
          <use href="${a}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${a}#icon-star"></use>
        </svg>
        <svg class="star-icon " width="18" height="18">
          <use href="${a}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${a}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${a}#icon-star"></use>
        </svg>
        </div>
        </div>
    
    <button id="${e}" class="btn-blok-recipes-see" type="button">See recipe</button></div>
    </div>
  
  </li>`}i.length>0?i.map(o=>{m(o).then(e=>{c.insertAdjacentHTML("beforeend",b(e.data)),$(e.data);const t=e.data.category;if(t){u.add(t);const s=[...u].map(r=>`
      <button class="category-button" data-category="${r}">${r}</button>
  `).join("");l.innerHTML=s}})}):(c.innerHTML="",l.innerHTML="",f.innerHTML=h());function h(){return`
<svg width="68" height="58" viewBox="0 0 37 32">
<use xlink:href="./img/icon-sprite.svg#icon-hat"></use>
</svg>
<p class="empty-favorites-text">It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.
</p>
`}c&&c.addEventListener("click",k);function k(o){const e=o.target.id,t=i.indexOf(e);if(t!==-1){i.splice(t,1),localStorage.setItem("saveCheckedFavorite",JSON.stringify(i));const s=document.getElementById(e),r=s.getAttribute("data-category");if(s.remove(),i.length===0){const n=h(),d=document.getElementById("favoritesContainer");d.innerHTML=n}S(r)}}function S(o){const e=new Set;c.querySelectorAll(".blok-recipes").forEach(t=>{const s=t.getAttribute("data-category");s&&e.add(s)}),o&&p.forEach(t=>{t.getAttribute("data-category")===o&&t.remove()})}function $(o){const e=document.querySelectorAll(".star-icon");let t=0;for(let s=0;s<5;s+=1)s<Math.floor(o.rating)&&e&&e[t].classList.add("star-color-icon"),t+=1}
