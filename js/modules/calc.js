function calc() {
  //:::::::::::CALC::::::::::: 
  const result = document.querySelector('.calculating__result span')
  let sex, height, weight, age, ratio;

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      return result.textContent = '....';
    }

    if (sex == 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(`${selector} div`);

    elements.forEach(item => {
      item.classList.remove(activeClass);

      if (item.getAttribute('id') === localStorage.getItem('sex')) {
        item.classList.add(activeClass)
      }
      if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        item.classList.add(activeClass)
      }
    });
  }

  function getStaticInfo(parent, activeClass) {
    const elements = document.querySelectorAll(`${parent} div`),
          parentSelector = document.querySelector(parent);
    
    elements.forEach(item => {
      if (localStorage.getItem('sex') == item.getAttribute('id') ) {
        sex = localStorage.getItem('sex');
      }

      if (localStorage.getItem('ratio') == item.getAttribute('data-ratio')) {
        ratio = localStorage.getItem('ratio');
      }
    
      if(item.classList.contains(activeClass) && item.getAttribute('data-ratio')) {
        ratio = +item.getAttribute('data-ratio');
      } else if (item.classList.contains(activeClass) && item.getAttribute('id')) {
        sex = item.getAttribute('id');
      }
    });

    parentSelector.addEventListener('click', e => {
      if (e.target.getAttribute('data-ratio')) {
        ratio = +e.target.getAttribute('data-ratio');
        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
      } else if(e.target.getAttribute('id')){
        sex = e.target.getAttribute('id');
        localStorage.setItem('sex', e.target.getAttribute('id'));

      }

      if(e.target != parentSelector) {
        // console.log(ratio, sex)
        elements.forEach(item => item.classList.remove(activeClass));
        e.target.classList.add(activeClass);
      }
      calcTotal();
    });
  }

  function getDinamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if(input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
        input.style.color = 'red';
      } else {
        input.style.border = 'none';
      }


      switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }

  calcTotal();
  getStaticInfo('#gender', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');
  initLocalSettings('#gender', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active')
  getDinamicInfo('#height');
  getDinamicInfo('#weight');
  getDinamicInfo('#age');
}

export default calc;