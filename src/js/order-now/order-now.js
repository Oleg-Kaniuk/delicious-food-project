const modalCloseBtnOrder = document.querySelector('.modal-close-btn-order');
const backdropElNow = document.querySelector('.js-backdrop-order');
const formOrder = document.querySelector('.modal-form-order');

const modalOrderNow = document.querySelector('.modal-order-now')


const heroModalBtn = document.querySelector('.js-hero-btn')
const backdrop = document.querySelector('.js-backdrop-order')

heroModalBtn.addEventListener('click', heroModalOpen)


function heroModalOpen(evt) {
  // клік на Escape

  backdrop.classList.toggle("is-hidden")
    document.addEventListener("keydown", onClickEscapeNow);
}

// клік на btnClose
  modalCloseBtnOrder.addEventListener('click', onBtnCloseNow);

// клік на backdropEl
  backdropElNow.addEventListener('click', onClickBackdropNow);



// клік на Send
 formOrder.addEventListener('submit', onClickSendNow);

function onBtnCloseNow() {
  backdropElNow.classList.toggle('is-hidden');
}

function onClickBackdropNow(e) {
   if (e.target===backdropElNow) {
     backdropElNow.classList.toggle('is-hidden');
      // backdropElNow.removeEventListener('click', onClickBackdropNow);
}
}

function onClickEscapeNow(e) {
  console.log(e)
  if (e.code === "Escape") {
    backdropElNow.classList.add('is-hidden')
     document.removeEventListener("keydown", onClickEscapeNow)
  }
}

function onClickSendNow(evt) {

  evt.preventDefault();  

    const { user_name, user_phone, user_mail_modal, modal_comment  } = evt.target.elements;
 
    // перевірка чи заповнені поля вводу
    if (user_phone === "" || user_mail_modal.value === "" || user_name.value === '' ) {
        alert('All fields must be filled')
    }
    else {
      console.log({
        'Name': user_name.value,
        'Phone number': user_phone.value,
        'Email': user_mail_modal.value,
        'Comment': modal_comment.value
      })
      
      formOrder.reset()   //очищаємо поле
       formOrder.removeEventListener('submit', onClickSendNow);
      backdropElNow.classList.toggle('is-hidden');
      

  }
}