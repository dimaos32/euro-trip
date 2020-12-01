'use strict';

var mainNav = document.querySelector('.main-nav');
var mainNavToggle = mainNav.querySelector('.main-nav__toggle');
var mainNavList = mainNav.querySelector('.main-nav__list');

mainNav.classList.remove('main-nav--nojs');
mainNav.classList.add('main-nav--closed');

mainNavToggle.addEventListener('click', function () {
  mainNav.classList.toggle('main-nav--closed');
  mainNav.classList.toggle('main-nav--opened');
});

mainNavList.addEventListener('click', function () {
  if (mainNav.classList.contains('main-nav--opened')) {
    mainNav.classList.remove('main-nav--opened');
    mainNav.classList.add('main-nav--closed');
  }
});
