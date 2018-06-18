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
      rooms: getRandom(LIST_ROOMS),
      guests: getRandom(LIST_GUESTS),
      checkin: getRandomArrayElement(LIST_CHECKINS),
      checkout: getRandomArrayElement(LIST_CHECKINS),
      features: getRandomFeatures(LIST_FEATURES),
      description: '',
      photos: shuffleArray(LIST_PHOTOS),
    }
  };
  return poster;
};

var posters = [];

for (var i = 0; i < 8; i++) {
  posters[i] = getPoster(i);
}
