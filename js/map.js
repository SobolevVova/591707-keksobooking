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
cityMap.classList.remove('map--faded');

// Задание 3

var getPin = function (obj) {
  var buttonPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
  var imgPin = buttonPin.querySelector('img');

  buttonPin.classList.add('map__pin');
  buttonPin.style.left = obj.location.x + 'px';
  buttonPin.style.top = obj.location.y + 'px';

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
    fragment.appendChild(getPin(pins[j]));
  }
  return fragment;
};

mapPins.appendChild(getPins(posters));

// Задание 5

var getMapCard = function (obj) {
  var mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);

  mapCard.querySelector('.popup__title').innerText = obj.offer.title;
  mapCard.querySelector('.popup__text--address').innerText = obj.offer.address;
  mapCard.querySelector('.popup__text--address').innerHTML = obj.offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').innerText = obj.offer.type;
  mapCard.querySelector('.popup__text--capacity').innerText = obj.offer.rooms + 'комнаты для' + obj.offer.guests + 'гостей';
  mapCard.querySelector('.popup__text--time').innerText = 'Заезд после' + obj.offer.checkin + ',' + 'выезд до' + obj.offer.checkout;

  var fragment = document.createDocumentFragment();

  for (var j = 0; j < obj.length; j++) {
    fragment.appendChild(getMapCard(obj[j]));
  }


  var getFeature = function (arr) {
    mapCard.querySelector('.popup__features').innerHTML = '';

    for (var j = 0; j < arr.length; j++) {
      mapCard.querySelector('.popup__features').innerText = ('li.popup__feature--' + LIST_FEATURES[j]);
    }

  };

  mapCard.querySelector('.popup__description').innerText = 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.' + obj.offer.description;

  var getPhoto = function () {
    mapCard.querySelector('.popup__photos').innerHTML = '';

    mapCard.querySelector('.popup__photos').innerText = obj.offer.photos;
    var imgPhoto = mapCard.querySelector('.popup__photos');
    imgPhoto.classList.add('.popup__photo');
    imgPhoto.src = 'http://o0.github.io/assets/images/tokyo/hotel2.jpg';
    imgPhoto.src = 'http://o0.github.io/assets/images/tokyo/hotel3.jpg';
    imgPhoto.src = 'http://o0.github.io/assets/images/tokyo/hotel1.jpg';
    imgPhoto.style.width = '45' + 'px';
    imgPhoto.style.height = '40' + 'px';
    imgPhoto.alt = 'Уютное гнездышко для молодоженов';
  };

  return mapCard;
};

mapCard.insertBefore(getMapCard(posters[0]), '.map__filters-container');
