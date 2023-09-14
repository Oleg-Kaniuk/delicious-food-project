


const elements ={
    timeSelect: document.querySelector('.js-time-select'),
    areaSelect: document.querySelector('.js-area-select'),
    ingredientsSelect : document.querySelector('.js-ingredients-select')
}
// функція для рендеру select time
marcupTime()
function marcupTime() {
    for (let i = 5; i <= 120; i+=5) {
     const sef = `<option value="${i} min">${i} min</option>`
     elements.timeSelect.insertAdjacentHTML('beforeend', sef)
    }
   }

// функця для запиту на бек-енд: країни
function serviceGetArea() {
    return fetch("https://tasty-treats-backend.p.goit.global/api/areas")
    // перевірка чи щось прийшло з бек-енда
    .then((resp) => {
              if (!resp.ok) {
                throw new Error(resp.statusText);
              }
              return resp.json();
            })

}

// функця для запиту на бек-енд: інградієнти
function serviceGetIngredients() {
    return fetch ("https://tasty-treats-backend.p.goit.global/api/ingredients")
    .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      })
}

// функції для рендеру select area
serviceGetArea()
.then(data => {
    elements.areaSelect.innerHTML = markupArea(data)
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
    elements.ingredientsSelect.innerHTML = markupIngredient(data)
})
.catch(err => console.log(err))

function markupIngredient(elem) {
    return elem.map(({name}) =>
    `<option value="">${name}</option>`
    ).join('')
}
