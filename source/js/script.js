'use strict';

var mainNav = document.querySelector('.main-nav');
var mainNavToggle = mainNav.querySelector('.main-nav__toggle');
var mainNavList = mainNav.querySelector('.main-nav__list');

var tabList = document.querySelector('.countries__tabs');
var tabs = document.querySelectorAll('.countries__tab-link');
var locationList = document.querySelector('.locations__list');
var slideList = document.querySelector('.countries__slides');
var slides = slideList.querySelectorAll('.countries__slide');

var offers = document.querySelector('.cost__offers');

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

var getNewActiveTab = function (newTabId) {
  var newTab;

  for (var tab of tabs) {
    if (tab.dataset.id === newTabId) {
      newTab = tab;
      break;
    };
  }

  return newTab;
}

var changeActiveTab = function (newActiveTab) {
  var currentTab = tabList.querySelector('.countries__tab-link--current');

  currentTab.classList.remove('countries__tab-link--current');
  newActiveTab.classList.add('countries__tab-link--current');
}

var changeSlide = function (newSlideId) {
  var currentSlide = slideList.querySelector('.countries__slide--current');

  var newSlide;

  for (var slide of slides) {
    if (slide.dataset.id === newSlideId) {
      newSlide = slide;
      break;
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

var onlocationCardClick = function (evt) {
  if (evt.target.closest('.location-card')) {
    var newTabId = evt.target.closest('.location-card').dataset.id;

    changeActiveTab(getNewActiveTab(newTabId));
    changeSlide(newTabId);
  }
};

var onSlideListClick = function (evt) {
  if (evt.target.classList.contains('countries__tab-link')) {
    evt.preventDefault();

    changeActiveTab(evt.target);
    changeSlide(evt.target.dataset.id);
  }
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

locationList.addEventListener('click', onlocationCardClick);
tabList.addEventListener('click', onSlideListClick);
