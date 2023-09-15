import axios from 'axios';
import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';

// Swiper.use([Pagination, Navigation])


const swiperwrap = document.querySelector('.swiper-wrapper')

const mySwiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 8,
    // loop: true,
    grabCursor: true,
    // freeMode: true,
    // spaceBetween:8,
  pagination: {
    el:'.swiper-pagination',
      clickable: true,
    type: 'bullets',
  },
});

console.log(mySwiper)
async function onMastersEvents() {
    const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api'
    const response = await axios(`${BASE_URL}/events`)
    const data = creatMarkup(response.data)
  swiperwrap.insertAdjacentHTML('beforeend',data)
}
onMastersEvents()


function creatMarkup(data) {
    return data.map(({ cook, topic }) => `
  <!-- Slides -->
    <div class="swiper-slide">
     <div class="slide-cont">
              <div class="slide-chef">
                <img
                  class="slide-chef-img"
                  src="${cook.imgUrl}"
                  alt="${cook.name}"
                />
              </div>
              <div class="slide-preview">
                <img
                  class="slide-preview-img"
                  src="${topic.previewUrl}"
                  alt=""
                />
                <h2 class="preview-title">${topic.name}</h2>
                <p class="preview-country">${topic.area}</p>
              </div>
              <div class="slide-dish">
                <img
                  class="slide-dish-img"
                  src="${topic.imgUrl}"
                  alt=""
                />
              </div>
            </div>
    </div>`).join('')
}

