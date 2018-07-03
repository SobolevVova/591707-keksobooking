'use strict';

var LIST_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var LIST_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var LIST_ROOMS = [1, 2, 3, 4, 5];
var LIST_GUESTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var LIST_CHECKINS = ['12:00', '13:00', '14:00'];
var LIST_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var LIST_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var getRandomArrayElement = function (arr) {
  var indexRandom = getRandom(0, arr.length - 1);
  return arr[indexRandom];
};

var getRandomFeatures = function (arr) {
  var features = [];
  var numbers = getRandom(1, arr.length);
  for (var i = 0; i < numbers; i++) {
    features[i] = arr[i];
  }
  return features;
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var getPoster = function (number) {
  var locationX = getRandom(300, 900);
  var locationY = getRandom(100, 500);

  var poster = {
    author: {
      avatar: 'img/avatars/user0' + (number + 1) + '.png'
    },
    location: {
      x: locationX,
      y: locationY
    },
    offer: {
      title: getRandomArrayElement(LIST_TITLES),
      address: locationX + ',' + locationY,
      price: getRandom(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(LIST_TYPES),
      rooms: getRandomArrayElement(LIST_ROOMS),
      guests: getRandomArrayElement(LIST_GUESTS),
      checkin: getRandomArrayElement(LIST_CHECKINS),
      checkout: getRandomArrayElement(LIST_CHECKINS),
      features: getRandomFeatures(LIST_FEATURES),
      description: '',
      photos: shuffleArray(LIST_PHOTOS)
    }
  };
  return poster;
};

var posters = [];

for (var i = 0; i < 8; i++) {
  posters[i] = getPoster(i);
}

// Задание 2

var cityMap = document.querySelector('.map');

// Задание 3

var getPin = function (obj, number) {
  var buttonPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
  var imgPin = buttonPin.querySelector('img');

  buttonPin.setAttribute('tabindex', '0');
  buttonPin.setAttribute('data-id', number);
  buttonPin.classList.add('map__pin');
  buttonPin.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
  buttonPin.style.top = obj.location.y - PIN_HEIGHT + 'px';

  imgPin.style.width = '40' + 'px';
  imgPin.style.height = '40' + 'px';
  imgPin.draggable = false;
  imgPin.src = obj.author.avatar;
  imgPin.alt = 'Метка объявления';

  return buttonPin;
};

// Задание 4

var mapPins = document.querySelector('.map__pins');

var getPins = function (pins) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < pins.length; j++) {
    fragment.appendChild(getPin(pins[j], j));
  }
  return fragment;
};


// Задание 5
var mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
var map = document.querySelector('.map');
var filterContainer = document.querySelector('.map__filters-container');

var getPhotos = function (arr, picture) {
  var fragment = document.createDocumentFragment();
  var photos = picture.querySelector('.popup__photos');
  photos.innerHTML = '';

  for (var j = 0; j < arr.length; j++) {
    var newImg = document.createElement('img');
    newImg.src = arr[j];
    newImg.classList.add('popup__photo');
    newImg.width = '45';
    newImg.height = '40';
    newImg.alt = 'Уютное гнездышко для молодоженов';
    fragment.appendChild(newImg);
  }

  photos.appendChild(fragment);
};

var getFeatures = function (arr, parent) {
  var fragment = document.createDocumentFragment();
  var features = parent.querySelector('.popup__features');
  features.innerHTML = '';

  for (var j = 0; j < arr.length; j++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add(('popup__feature--') + arr[j]);
    fragment.appendChild(newElement);
  }

  features.appendChild(fragment);
};

var getTitleType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец ';
  }
  return 'Вам повезёт';
};

var getMapCard = function (obj) {
  mapCard.querySelector('.popup__title').innerText = obj.offer.title;
  mapCard.querySelector('.popup__text--address').innerText = obj.offer.address;
  mapCard.querySelector('.popup__text--price').innerHTML = obj.offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').innerText = getTitleType(obj.offer.type);
  mapCard.querySelector('.popup__text--capacity').innerText = obj.offer.rooms + ' ' + 'комнаты для' + ' ' + obj.offer.guests + ' ' + 'гостей';
  mapCard.querySelector('.popup__text--time').innerText = 'Заезд после' + ' ' + obj.offer.checkin + ',' + 'выезд до' + ' ' + obj.offer.checkout;
  mapCard.querySelector('.popup__description').innerText = obj.offer.description;
  getFeatures(obj.offer.features, mapCard);
  getPhotos(obj.offer.photos, mapCard);
  return mapCard;
};

// map.insertBefore(getMapCard(posters[0]), filterContainer);

// Задание 6
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');

var getField = function () {
  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].setAttribute('disabled', 'disabled');
  }
};

getField();

form.classList.add('ad-form--disabled');

var onmapMouseUp = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  mapPins.appendChild(getPins(posters));

  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].removeAttribute('disabled');
  }
};

mainPin.addEventListener('mouseup', onmapMouseUp);

document.addEventListener('click', function () {
  map.insertBefore(getMapCard(posters[0]), filterContainer);
});
