import axios from "axios"
import debounce from "lodash.debounce"
import SlimSelect from 'slim-select';
// import "simplelightbox/dist/simple-lightbox.min.css";
// import 'slim-select/dist/slimselect.css'
import { createMarkupElForFilter, onCreateGoldStar} from "/js/recipes/recipes.js"
import {getRecipesByCategory, evtCategories,evtStartMarkup, galleryEl,responseFromCategoryFunction} from '/js/categories/categories.js'


 export const elements = {
    timeSelect: document.querySelector('.js-time-select'),
    areaSelect: document.querySelector('.js-area-select'),
    ingredientsSelect : document.querySelector('.js-ingredients-select'),
    inputFilter : document.querySelector('.js-input-filter'),
    filterForm : document.querySelector('.js-filter-form'),
    containerForRecipes: document.querySelector('.container-for-recipes'),
    iconClose : document.querySelector('.js-icon-close'),
    allResetButtonFilters : document.querySelector('.js-filters-reset')
}
// const containerForRecipes = document.querySelector('.container-for-recipes')
if (elements.inputFilter) {
  elements.inputFilter.addEventListener('input', onInputClose)
  elements.inputFilter.addEventListener('input', debounce(onInpitSearch, 300))
}
if (elements.iconClose) {
  elements.iconClose.addEventListener('click', onClickResetInput)
}
if (elements.allResetButtonFilters) {
  elements.allResetButtonFilters.addEventListener('click', onClickResetInputAll)
}

// функція для рендеру select time
marcupTime()
function marcupTime() {
    for (let i = 5; i <= 120; i+=5) {
     const sef = `<option value="${i} min">${i} min</option>`
     if (elements.timeSelect) {
      elements.timeSelect.insertAdjacentHTML('beforeend', sef)
     }
     
    }
  //   new SlimSelect({
  //     select: elements.timeSelect
  //  })
  }

// функця для запиту на бек-енд: країни
function serviceGetArea() {
    return axios("https://tasty-treats-backend.p.goit.global/api/areas")
    // перевірка чи щось прийшло з бек-енда
    // .then((resp) => {
    //           if (!resp.ok) {
    //             throw new Error(resp.statusText);
    //           }
    //           return resp.json();
    //         })

}

// функця для запиту на бек-енд: інградієнти
function serviceGetIngredients() {
    return axios("https://tasty-treats-backend.p.goit.global/api/ingredients")
    // .then((resp) => {
    //     if (!resp.ok) {
    //       throw new Error(resp.statusText);
    //     }
    //     console.log(resp);
    //     return resp;
    //   })
}

// функції для рендеру select area
serviceGetArea()
.then(data => {
  if (elements.areaSelect) {
    elements.areaSelect.innerHTML = markupArea(data.data)
  }
})
.catch(err => console.log(err))

function markupArea(elem) {
    return elem.map(({name}) =>
    `<option value="">${name}</option>`
    ).join('')
  }


// функції для рендеру select Ingredients
serviceGetIngredients()
.then(data => {
  // console.log(data.data);
  if (elements.ingredientsSelect) {
    elements.ingredientsSelect.innerHTML = markupIngredient(data.data)
  }
})
.catch(err => console.log(err))

function markupIngredient(elem) {
    return elem.map(({name}) =>
    `<option value="">${name}</option>`
    ).join('')
}


// функція для відправки масива об'єктів для рендеру розмітки
function onInpitSearch(event) {
  // console.log(event.target.value)
serviceGetResult(event.target.value)
.then(data => {
  // console.log(data.data.results)
  // createMarkupElForFilter(data.data.results)
  elements.containerForRecipes.innerHTML = createMarkupElForFilter(data.data.results)

  onCreateGoldStar(data.data.results)
})
.catch(err => console.log(err))
}
// функція для пошуку по ключевому слову
function serviceGetResult(value) {
  console.log(evtCategories)
if (evtCategories === '') {
  const API_URL = `https://tasty-treats-backend.p.goit.global/api/recipes?&title=${value.trim()}`
  return axios.get(API_URL)
}
  const API_URL = `https://tasty-treats-backend.p.goit.global/api/recipes?category=${evtCategories.target.textContent}&title=${value.trim()}`
  return axios.get(API_URL)
}



// функції для іконки стерання input
function onInputClose(event){
  if (event.target.value) {
    elements.iconClose.classList.remove('filter-is-hidden')
  } else{
    elements.iconClose.classList.add('filter-is-hidden')
  }
}
function onClickResetInput() {
  elements.inputFilter.value = ''
  elements.iconClose.classList.add('filter-is-hidden')
  if (elements.inputFilter.value === '') {
    if (evtCategories === '') {
      // console.log(evtStartMarkup)
      return galleryEl.innerHTML = createMarkupElForFilter(evtStartMarkup, OPLocalStorageId)
    }
    // console.log(evtCategories);
    getRecipesByCategory(evtCategories)
  }
}

function onClickResetInputAll() {
  if (elements.inputFilter.value !== '') {
    elements.inputFilter.value = ''
    elements.iconClose.classList.add('filter-is-hidden')
      if (evtCategories === '') {
        return galleryEl.innerHTML = createMarkupElForFilter(evtStartMarkup, OPLocalStorageId)
      }
  }
}
