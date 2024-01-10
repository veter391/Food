function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  //:::::::::::SLIDER::::::::::: 
  class Slider {
    constructor(slides, next, prev, current, total) {
      this.slides = document.querySelectorAll(slides);
      this.prev = document.querySelector(prev);
      this.next = document.querySelector(next);
      this.total = document.querySelector(total);
      this.current = document.querySelector(current);
      this.index = 1;
    }

    showSlide(item) {
      if (item > this.slides.length) {
        // if current slide is a last slide
        this.index = 1;
      } else if (item < 1) {
        // if current slide is a first slide
        this.index = this.slides.length;
      } else if (typeof item !== 'number'){
        // if error
        console.error(`Function can't work with ${typeof(item)} take the number`)
      }

      // hide all slides
      this.slides.forEach(allSlides => {
        allSlides.style.display = 'none';
        allSlides.style.visibility = 'hidden';
      });

      // show current slide
      this.slides[this.index - 1].style.display = 'block';
      this.slides[this.index - 1].style.visibility = 'visible';

      // add current number to page
      if (this.current) {
        this.current.textContent = getZero(this.index);
      }
    }

    startIndex(n) {
      this.showSlide(this.index += n);
    }

    others() {
      this.showSlide(this.index);
      if(this.total) {
        this.total.textContent = getZero(this.slides.length);
      }
    }

    run() {
      this.others();
      
      if(this.prev) {
        this.prev.addEventListener('click' , () => {
          this.startIndex(-1)
        });
      }

      this.next.addEventListener('click' , () => {
        this.startIndex(1)
      });
    }
  }
  // new Slider(slide, nextArrow, prevArrow, currentCounter ,totalCounter).run();


  class SliderCarousel{
    constructor(slider) {

      this.slider = document.querySelector(slider);
      this.wrapper = this.slider.querySelector(wrapper);
      this.inner = this.slider.querySelector(field);

      this.slides = this.slider.querySelectorAll(slide);
      this.prev = this.slider.querySelector(prevArrow);
      this.next = this.slider.querySelector(nextArrow);
      this.total = this.slider.querySelector(totalCounter);
      this.current = this.slider.querySelector(currentCounter);

      // check wrapper width
      this.width = window.getComputedStyle(this.wrapper).width;
      // index and offset
      this.index = 1;
      this.offset = 0;
      // check slide variavles 
      this.offsetWidth = +this.width.replace(/\D/g, '');
      // this.offsetWidth = +this.width.slice(0, this.width.length - 2);
      this.lastSlide = this.offsetWidth * (this.slides.length - 1);
      // create elements
      this.dots = document.createElement('ol');
      this.dotsArray = [];
    }

    start() {
      this.total.textContent = this.getZero(this.slides.length);
      this.current.textContent = this.getZero(this.index);

      // slider styles
      this.slider.style.position = 'relative';

      // wrapper styles
      this.wrapper.style.overflow = 'hidden';

      // inner styles
      this.inner.style.width = `${100 * this.slides.length}%`;
      this.inner.style.display = 'flex';
      this.inner.style.transition = `all .5s`;

      // dots styles
      this.dots.classList.add('carusel-indicators');
      this.dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 8px;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
      `;
      // add dots tu slider and add dots inside list
      this.slider.append(this.dots);
      for(let i = 1; i <= this.slides.length; i++) {
        // create item
        const dot = document.createElement('li');
        // add atribute and styles to item
        dot.setAttribute('data-slide-to', i);
        dot.style.cssText = `
          box-sizing: border-box;
          flex: 0 1 auto;
          width: 25px;
          height: 25px;
          margin:0 5px;
          padding:5px;
          font-size:14px;
          text-align: center;
          cursor: pointer;
          color:blue;
          background-color: #fff;
          border-radius: 50%;
          opacity: .5;
          transition: opacity .6s ease;
        `;

        // add index
        dot.textContent = i;

        // add opacity to current dot
        if (i === this.index) {
          dot.style.opacity = 1;
        }
        // add item tu list
        this.dots.append(dot);
        // create array with dots
        this.dotsArray.push(dot);
      }

      // add width to slides
      this.slides.forEach(item => item.style.width = this.width);
    }

    getZero(num){
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } 
  
      return num;
    }

    showSlide(state) {
      // check pass +1 or -1
      if(state === 'next') {
        // if to go next
        if(this.offset === this.lastSlide) {
          this.offset = 0;
        } else {
          this.offset += this.offsetWidth;
        }

        // add index
        if (this.index >= this.slides.length) {
          this.index = 1;
        } else {
          this.index++;
        }
      } else if (state === 'prev') {
        // if to go prev
        if(this.offset === 0) {
          this.offset = this.lastSlide;
        } else {
          this.offset -= this.offsetWidth;
        }

        // add index
        if (this.index <= 1) {
          this.index = this.slides.length;
        } else {
          this.index--;
        }
      }

      this.inner.style.transform = `translateX(-${this.offset}px)`;
      this.current.textContent = this.getZero(this.index)

      // check active dot
      this.dotsArray.forEach(dot => dot.style.opacity = '.5');
      this.dotsArray[this.index - 1].style.opacity = 1;
    }

    run() {
      this.start();

      this.dotsArray.forEach(dot => {
        dot.addEventListener('click', e => {
          this.index = e.target.getAttribute('data-slide-to');
          this.offset = this.offsetWidth * (this.index - 1);
          // call custom changes from function
          this.showSlide();
        })
      });

      this.next.addEventListener('click', () => {
        this.showSlide('next')
      });

      this.prev.addEventListener('click',() => {
        this.showSlide('prev')
      });
    }
  }

  new SliderCarousel(container).run();


}

export default slider;