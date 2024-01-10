// ::::::::::::::MODAL::::::::::::
  class Modal {
    constructor(modBtn, modWin, addclass, speed = 3000) {
      this.modBtn = document.querySelectorAll(modBtn);
      this.modWin = document.querySelector(modWin);
      // this.closeData = this.modWin.querySelector('[data-close]');
      this.addclass = addclass;
      this.speed = +speed
      this.timer = setTimeout(() => {
        this.openModal();
      }, this.speed);
    }
  
    closeModal() {
      this.modWin.classList.remove(this.addclass);
      document.body.style.overflow = '';
    }

    openModal() {
      this.modWin.classList.add(this.addclass);
      document.body.style.overflow = 'hidden';

      if (this.timer) {
        clearTimeout(this.timer);
      }
    }

    addEvents() {
      // console.log('hello');
      // console.log(this.modBtn, this.modWin);
            // btn click
      this.modBtn.forEach(btn => {
        btn.addEventListener('click' , () => {
          this.openModal();
        });
      });
      // close btn click
      // this.closeData.addEventListener('click' , () => {
      //   this.closeModal();
      // });
      // close if click outside to element 
      this.modWin.addEventListener('click' , e => {
        // events delegation use the getattribute
        if (e.target === this.modWin || e.target.getAttribute('data-close') == '') {
          this.closeModal();
        }
      });
      // close if press key esc 
      document.addEventListener('keydown' , e => {
        // check key use the e.code
        if (e.code === "Escape" && this.modWin.classList.contains(this.addclass)) {
          this.closeModal();
        }
      });


      const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
          this.openModal();
          window.removeEventListener('scroll' , showModalByScroll);
        }
      };


      // open if yo arive to botom
      window.addEventListener('scroll' , showModalByScroll);
    }
  }

  // modal('[data-modal]', '[data-modalwindow]', 'modal-active');
  const modal = new Modal('[data-modal]', '[data-modalwindow]', 'modal-active', 300);
  modal.addEvents();

export {modal, Modal}