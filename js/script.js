
require('es6-promise').polyfill();
// you can use this import use the polifils
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import {modal, Modal} from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
// const slider requare('./modules/slider');
// use => module.exports = calc;


window.addEventListener('DOMContentLoaded' , () => {
  console.log('script running ...');


  tabs('tabheader__item', 'tabcontent', 'tabheader__items', 'tabheader__item_active');
  timer('.timer', '2024-12-20');
  calc();
  forms('form');
  cards();
  slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    slide: '.offer__slide',
    totalCounter: '.total',
    prevArrow: '.offer__slider-prev',
    currentCounter: '.current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
});