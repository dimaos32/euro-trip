'use strict';

var mainNav = document.querySelector('.main-nav');
var mainNavToggle = mainNav.querySelector('.main-nav__toggle');
var mainNavList = mainNav.querySelector('.main-nav__list');

var tabList = document.querySelector('.countries__tabs');
var slideList = document.querySelector('.countries__slides');
var slides = slideList.querySelectorAll('.countries__slide');

var openMenu = function () {
  mainNav.classList.remove('main-nav--closed');
  mainNav.classList.add('main-nav--opened');
  mainNavList.addEventListener('click', onOutsideMenuPress);
  document.addEventListener('keydown', onOpenMenuEscPress);
};

var closeMenu = function () {
  mainNav.classList.remove('main-nav--opened');
  mainNav.classList.add('main-nav--closed');
  mainNavList.removeEventListener('click', onOutsideMenuPress);
  document.removeEventListener('keydown', onOpenMenuEscPress);
};

var changeSlide = function (newSlideId) {
  var currentSlide = slideList.querySelector('.countries__slide--current');

  var newSlide;

  for (var slide of slides) {
    if (slide.dataset.id === newSlideId) {
      newSlide = slide;
    };
  }

  currentSlide.classList.remove('countries__slide--current');
  newSlide.classList.add('countries__slide--current');
}

var onOutsideMenuPress = function () {
  closeMenu();
};

var onOpenMenuEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMenu();
  }
};

var onSlideListClick = function (evt) {
  evt.preventDefault();

  var currentTab = tabList.querySelector('.countries__tab-link--current');

  currentTab.classList.remove('countries__tab-link--current');
  evt.target.classList.add('countries__tab-link--current');

  changeSlide(evt.target.dataset.id);
};

mainNav.classList.remove('main-nav--nojs');
mainNav.classList.add('main-nav--closed');

mainNavToggle.addEventListener('click', function () {
  if (mainNav.classList.contains('main-nav--opened')) {
    closeMenu();
  } else {
    openMenu();
  }
});

tabList.addEventListener('click', onSlideListClick);
