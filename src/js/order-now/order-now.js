const modalCloseBtnOrder = document.querySelector('.modal-close-btn-order');
const backdropEl = document.querySelector('.backdrop');
const formOrder = document.querySelector('.modal-form-order');

const modalOrderNow = document.querySelector('.modal-order-now')


// клік на btnClose
modalCloseBtnOrder.addEventListener('click', onBtnClose);
// клік на backdropEl
backdropEl.addEventListener('click', onclickBackdrop);
// клік на Escape
document.addEventListener("keydown", onClickEscape);
// клік на Send
formOrder.addEventListener('submit', onClickSend);


function onBtnClose() {
  backdropEl.classList.add('is-hidden');
// modalCloseBtnOrder.removeEventListener('click', onBtnClose);
}

function onclickBackdrop(e) {
  
 if (e.target===backdropEl) {
   backdropEl.classList.toggle('is-hidden');
  backdropEl.removeEventListener('click', onclickBackdrop);
}

 
}

function onClickEscape(e) {
  if (e.code === "Escape") {
 backdropEl.classList.toggle('is-hidden')

    console.log("Closing window...");
    document.removeEventListener("keydown", onClickEscape) } //  знімаємо слухача на Escape
 
}

function onClickSend(evt) {

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
      formOrder.removeEventListener('submit', onClickSend);
         backdropEl.classList.toggle('is-hidden');

  }
  
   
}