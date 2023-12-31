import axios from 'axios';
import Swiper from 'swiper/bundle';
// import styles bundle
// import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/bundle';

// Swiper.use([Pagination, Navigation])


const swiperwrap = document.querySelector('.swiper-wrapper')




function initSlider() {
  new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 36,
    breakpoints: {
      768: {
        spaceBetween: 82,
      }
    },
    loop: true,
    grabCursor: true,
    // freeMode: true,
    // spaceBetween:8,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
}


async function onMastersEvents() {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
  try {
    const response = await axios(`${BASE_URL}/events`)
    const data = creatMarkup(response.data)
    swiperwrap.insertAdjacentHTML('beforeend', data)
    // дозволить Swiper оновити свою структуру DOM і працювати з новим вмістом
    initSlider()
  }
  catch (error) {
    console.error(error)
  }
}
onMastersEvents()


function creatMarkup(data) {
    return data.map(({ cook, topic }) => `
  <!-- Slides -->
    <li class="swiper-slide">
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
                <div class= "preview-text">
                <h2 class="preview-title">${topic.name}</h2>
                <p class="preview-country">${topic.area}</p>
                </div>
              </div>
              <div class="slide-dish">
                <img
                  class="slide-dish-img"
                  src="${topic.imgUrl}"
                  alt=""
                />
              </div>
            </div>
    </li>`).join('')
}
