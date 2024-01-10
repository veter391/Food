import { server, getData } from "../services/services";

function cards() {
  // :::::::::::::classes for cards:::::::::::::
  class MenuCard {
      constructor(parent, src, alt, title, text, price, ...classes) {
        this.parent = document.querySelector(parent);
        this.img = src;
        this.alt = alt;
        this.title = title;
        this.text = text;
        this.price = price;
        this.transfer = 27;
        // classes is a operathor rest, return the array
        this.classes = classes;

        // call method inside constructor
        this.changeToUAN();
      }

      changeToUAN() {
        this.price *= this.transfer;
      }

      render() {
        const element = document.createElement('div');

        // default class
        if (this.classes.length === 0) {
          element.classList.add('menu__item');
        } else {
          // add classes to element 
          this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = 
        `<img src=${this.img} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.text}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>`;

        this.parent.append(element);
      }

    }
    // create element and clear in script after creating.
    // new MenuCard(
    //   '.menu__field .container',
    //   'img/tabs/vegy.jpg', 
    //   'image', 
    //   'MyTitle', 
    //   'Lorem ipsum, numquam totam quam illo dolor officia architecto sit ipsum sequi? Reiciendis, ipsa! Totam sequi enim eius fugit ad blanditiis consectetur inventore suscipit nulla praesentium, debitis deserunt atque?', 
    //   50,
    //   'menu__item',
    //   'big',
    //   'other'
    // ).render();


    getData(server.get)
    .then(data => {
      // destructuritzation for not use the MenuCard(obj.img, obj.altimg, obj.title etc...)
      // destructuritzation {img, altimg, title, descr, price}
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard('.menu__field .container', img, altimg, title, descr, price, 'menu__item').render();
      });
    });

    // getData('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // // if no use class MenuCard
    // // lose the destructaritsation.
    // function createCard(data) {
    //   data.forEach(({img, altimg, title, descr, price}) => {
    //     const element = document.createElement('div');

    //     element.classList.add('menu__item');

    //     element.innerHTML = 
    //       `<img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>`;

    //     document.querySelector('.menu__field .container').append(element);
    //   });
    // }
}


export default cards;