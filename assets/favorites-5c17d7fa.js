import{a as v,i as o}from"./vanilla-back-to-top-d646a1e4.js";const c=document.querySelector(".favorite-recipes-list"),l=document.querySelector(".categories");document.querySelector("empty-favorites-container");const i=JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[],u=new Set,p=l.querySelectorAll(".category-button");document.querySelector(".all-categories-button");const f="https://tasty-treats-backend.p.goit.global/api/recipes";async function y(t){try{return await v.get(`${f}/${t}`)}catch(e){console.error(`Failed to fetch images: ${e}`)}}function m(t){const{_id:e,title:s,preview:a,description:r,rating:n}=t,g=(JSON.parse(localStorage.getItem("saveCheckedFavorite"))||[]).includes(t);return`<li class="blok-recipes blok-recipes-fav" id="${e}">
        
        <input
          id="${e}"
          type="checkbox"
          class="heart-icon-elem"
          name="heart-icon"
          ${g?"":"checked"} 
          
        />
        <label for="${e}" aria-hidden="true" class="${g?"heart-icon-action  svg-active":"heart-icon-action "}">
          <svg class="icon-heart-svg " width="22" height="22">
            <use href="${o}#icon-heart"></use>
          </svg>
        </label>
  
         <img class="img-blok-recipes " src="${a}" alt="${s}" />
  
   <div class="context-blok-recipes "> <h3 class="title-blok-recipes">${s}</h3>
    <p class="text-blok-recipes">${r}</p>
    <div class="num-stars-btn "><div class="blok-rating">
      <p class="text-number-blok-recipes ">${n}</p>
       <div class="stars ">
       <svg class="star-icon " width="18" height="18">
          <use href="${o}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${o}#icon-star"></use>
        </svg>
        <svg class="star-icon " width="18" height="18">
          <use href="${o}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${o}#icon-star"></use>
        </svg>
        <svg class="star-icon" width="18" height="18">
          <use href="${o}#icon-star"></use>
        </svg>
        </div>
        </div>
    
    <button id="${e}" class="btn-blok-recipes-see" type="button">See recipe</button></div>
    </div>
  
  </li>`}if(i.length>0)i.map(t=>{y(t).then(e=>{c.insertAdjacentHTML("beforeend",m(e.data));const s=e.data.category;if(s){u.add(s);const a=[...u].map(r=>`
      <button class="category-button" data-category="${r}">${r}</button>
  `).join("");l.innerHTML=a}})});else{c.innerHTML="",l.innerHTML="";const t=h(),e=document.querySelector(".empty-favorites-container");e&&(e.innerHTML=t)}function h(){return`
<svg width="68" height="58" viewBox="0 0 37 32">
<use xlink:href="./img/icon-sprite.svg#icon-hat"></use>
</svg>
<p class="empty-favorites-text">It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.
</p>
`}c&&c.addEventListener("click",b);function b(t){const e=t.target.id,s=i.indexOf(e);if(s!==-1){i.splice(s,1),localStorage.setItem("saveCheckedFavorite",JSON.stringify(i));const a=document.getElementById(e),r=a.getAttribute("data-category");if(a.remove(),i.length===0){const n=h(),d=document.getElementById("favoritesContainer");d.innerHTML=n}k(r)}}function k(t){const e=new Set;c.querySelectorAll(".blok-recipes").forEach(s=>{const a=s.getAttribute("data-category");a&&e.add(a)}),t&&p.forEach(s=>{s.getAttribute("data-category")===t&&s.remove()})}
