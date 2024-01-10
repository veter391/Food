import {modal} from './modal';
import {server, postData} from '../services/services';


function forms(formsSelector) {

  // Forms
  const forms = document.querySelectorAll(formsSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };


  forms.forEach( e => {
    bindPostData(e);
  });


  //:::::::::::SEND TO BACKEND WITHOUT JSON::::::::::: 
  // function postData(form) {
  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();

  //     // creating message html element
  //     let statusMessage = document.createElement('div');
  //     statusMessage.classList.add('status');
  //     statusMessage.textContent = message.loading;
  //     // add div with massage to form
  //     form.append(statusMessage);

  //     const request = new XMLHttpRequest();

  //     request.open('POST', 'server.php');

  //     // request header for send form data if FormData header not!!
  //     // request.setRequestHeader('Content-type', 'multipart/form-data');

  //     // for take data from the form. another format then json.
  //     // for formDAta is requaired name atribbute in html form inputs
  //     const formData = new FormData(form);

  //     request.send(formData);

  //     request.addEventListener('load', () => {
  //       if (request.status === 200) {
  //         console.log(request.response);
  //         statusMessage.textContent = message.success;
  //         // reset form
  //         form.reset();
  //         // remove form message and timeout
  //         setTimeout(() => {
  //           statusMessage.remove();
  //         }, 2000);
  //       } else {
  //         statusMessage.textContent = message.failure;
  //       }
  //     });
  //   });
  // }
  //:::::::::::SEND TO BACKEND USING JSON::::::::::: 

  // function postData(form) {
  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();

  //     // creating message html element
  //     let statusMessage = document.createElement('img');
  //     statusMessage.src = message.loading;
  //     statusMessage.style.cssText = `
  //       display: block;
  //       margin: 0 auto;
  //     `;
  //     // add img with massage after form
  //     // check this mhetod in 07 functions
  //     form.insertAdjacentElement('afterend', statusMessage);

  //     const request = new XMLHttpRequest();

  //     request.open('POST', 'server.php');

  //     // header for send json
  //     request.setRequestHeader('Content-type', 'application/json');

  //     // for take data from the form. another format then json.
  //     // for formDAta is requaired name atribbute in html form inputs
  //     const formData = new FormData(form);

  //     // FormData to object, and them to JSON
  //     const object = {};
  //     formData.forEach((value, key) => {
  //       object[key] = value;
  //     });

  //     // object to JSON
  //     const json = JSON.stringify(object);

  //     // send json
  //     // ---Backend--- php not work with json!!! => ubdate and optimize your php
  //     request.send(json);

  //     request.addEventListener('load', () => {
  //       if (request.status === 200) {
  //         console.log(request.response);
  //         showThanksModal(message.success);
  //         // reset form
  //         form.reset();
  //         // remove form message and timeout
  //         statusMessage.remove();
  //       } else {
  //         showThanksModal(message.failure);
  //       }
  //     });
  //   });
  // }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    modal.openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');

    thanksModal.innerHTML = 
    `<div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${message}</div>
    </div>`;

    modal.modWin.append(thanksModal);
    setTimeout(() => {
      // remove the modal status changed for user
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      modal.closeModal();
    }, 4000);
  }


  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // creating message html element
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // add img with massage after form
      // check this mhetod in 07 functions
      form.insertAdjacentElement('afterend', statusMessage);

      // for take data from the form. another format then json.
      // for formDAta is requaired name atribbute in html form inputs
      const formData = new FormData(form);

      // FormData to object, and them to JSON
      // ----- old -----
      // const object = {};
      // formData.forEach((value, key) => {
      //   object[key] = value;
      // });
      // ----- new -----
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // ---Backend--- php not work with json!!! => ubdate and optimize your php
      postData(server.post, json)
      .then(data => {
        console.log(data);
        showThanksModal(message.success);
        // remove form message and timeout
        statusMessage.remove();
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(() => {
        // reset form
        form.reset();
      });
    });
  }

  function deleteNotDigits(item) {
    return item.replace(/\D/g, '');
  }
}

export default forms;