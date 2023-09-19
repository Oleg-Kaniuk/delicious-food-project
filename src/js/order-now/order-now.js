const modalCloseBtnOrder = document.querySelector('.modal-close-btn-order');
const backdropElNow = document.querySelector('.backdrop');
const formOrder = document.querySelector('.modal-form-order');

const modalOrderNow = document.querySelector('.modal-order-now')


// клік на btnClose
  modalCloseBtnOrder.addEventListener('click', onBtnCloseNow);

// клік на backdropEl
  backdropElNow.addEventListener('click', onClickBackdropNow);

// клік на Escape
  document.addEventListener("keydown", onClickEscapeNow);

// клік на Send
 formOrder.addEventListener('submit', onClickSendNow);

function onBtnCloseNow() {
  backdropElNow.classList.toggle('is-hidden');
}

function onClickBackdropNow(e) {
   if (e.target===backdropElNow) {
   backdropElNow.classList.toggle('is-hidden');
}
}

function onClickEscapeNow(e) {
  if (e.code === "Escape") {
    backdropElNow.classList.add('is-hidden')
  }
}

function onClickSendNow(evt) {

  evt.preventDefault();  

    const { user_name, user_phone, user_mail_modal, modal_comment  } = evt.target.elements;
 
    // перевірка чи заповнені поля вводу
    if (user_phone === "" || user_mail_modal.value === "" || user_name.value === '' || modal_comment.value ==='') {
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
         backdropElNow.classList.toggle('is-hidden');

  }
}