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

var writeUsForm = document.querySelector('.write-us__form');
// var writeUsFormSubmitBtn = writeUsForm.querySelector('.modal__btn');
var writeUsPhone = writeUsForm.querySelector('#write-us-phone');
var writeUsEmail = writeUsForm.querySelector('#write-us-email');

var buyFormTemplate = document.querySelector('#buy-now')
  .content
  .querySelector('.modal');
var successMessageTemplate = document.querySelector('#form-success')
  .content
  .querySelector('.modal');
var modal;

var isStorageSupport = true;
var storage = '';

var openMenu = function () {
  mainNav.classList.remove('main-nav--closed');
  mainNav.classList.add('main-nav--opened');
  mainNavList.addEventListener('click', onOutsideMenuClick);
  document.addEventListener('keydown', onOpenMenuEscPress);
};

var closeMenu = function () {
  mainNav.classList.remove('main-nav--opened');
  mainNav.classList.add('main-nav--closed');
  mainNavList.removeEventListener('click', onOutsideMenuClick);
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

var removeModal = function () {
  modal.remove();

  document.removeEventListener('click', onOpenModalEscPress);
}

var openSuccessMessage = function () {
  modal = successMessageTemplate.cloneNode(true);
  var modalCloseBtn = modal.querySelector('.modal__close-btn');

  document.body.append(modal);

  modalCloseBtn.addEventListener('click', onModalCloseBtnClick);
  modal.addEventListener('click', onOutsideModalContentClick);
  document.addEventListener('keydown', onOpenModalEscPress);
}

var onOutsideMenuClick = function () {
  closeMenu();
};

var onOpenMenuEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMenu();
  }
};

var onLocationCardClick = function (evt) {
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

var onModalFormSubmit = function (evt) {
  evt.preventDefault();

  var customerPhone = modal.querySelector('#phone');
  var customerEmail = modal.querySelector('#email');

  if (isStorageSupport) {
    localStorage.setItem('phone', customerPhone.value);
    localStorage.setItem('email', customerEmail.value);
  }

  removeModal();

  openSuccessMessage();
}

var onModalCloseBtnClick = function () {
  removeModal();
}

var onOutsideModalContentClick = function (evt) {
  if (!evt.target.closest('.modal__content')) {
    removeModal();
  }
}

var onOpenModalEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeModal();
  }
}

var onBuyBtnClick = function (evt) {
  if (evt.target.classList.contains('js-buy-btn')) {
    evt.preventDefault();

    modal = buyFormTemplate.cloneNode(true);
    var modalCloseBtn = modal.querySelector('.modal__close-btn');
    var modalForm = modal.querySelector('.modal__form');
    var modalFormSubmitBtn = modalForm.querySelector('.modal__btn');
    var customerPhone = modalForm.querySelector('#phone');
    var customerEmail = modalForm.querySelector('#email');

    document.body.append(modal);

    if (storage) {
      customerPhone.value = storage;
      customerEmail.value = localStorage.getItem('email');
      modalFormSubmitBtn.focus();
    } else {
      customerPhone.focus();
    }

    modalForm.addEventListener('submit', onModalFormSubmit);
    modalCloseBtn.addEventListener('click', onModalCloseBtnClick);
    modal.addEventListener('click', onOutsideModalContentClick);
    document.addEventListener('keydown', onOpenModalEscPress);
  }
};

try {
  storage = localStorage.getItem('phone');
} catch (err) {
  isStorageSupport = false;
}

if (storage) {
  writeUsPhone.value = storage;
  writeUsEmail.value = localStorage.getItem('email');
}

mainNav.classList.remove('main-nav--nojs');
mainNav.classList.add('main-nav--closed');

mainNavToggle.addEventListener('click', function () {
  if (mainNav.classList.contains('main-nav--opened')) {
    closeMenu();
  } else {
    openMenu();
  }
});

writeUsForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  if (isStorageSupport) {
    localStorage.setItem('phone', writeUsPhone.value);
    localStorage.setItem('email', writeUsEmail.value);
  }

  openSuccessMessage();
});

locationList.addEventListener('click', onLocationCardClick);
tabList.addEventListener('click', onSlideListClick);
offers.addEventListener('click', onBuyBtnClick);
slideList.addEventListener('click', onBuyBtnClick);
