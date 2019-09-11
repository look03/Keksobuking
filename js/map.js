
var generateObjectData = function () {
    var WIDTH_POPUB = 168;
    var TOP_POSITION_POPAP_MIN = 40;
    var TOP_POSITION_POPAP_MAX = 476;
    var titleFlat = [
        'Большая уютная квартира',
        'Маленькая неуютная квартира',
        'Огромный прекрасный дворец',
        'Маленький ужасный дворец',
        'Красивый гостевой домик',
        'Некрасивый него степриимный домик',
        'Уютное бунгало далеко от моря',
        'Неуютное бунгало по коле но в воде'
     ];
    var typeFlat = ['palace', 'flat', 'house', 'bungalo'];
    var checkinTime = ['12:00', '13:00', '14:00'];
    var featuresHouse = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var photosHouse = [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    ];
    
    var generationFeatures = function (featuresHouse) {
        legnthMass = Math.ceil(Math.random()*6);
        feturesMass = [];
        for (var i = 0; i < legnthMass; i++) {
           feturesMass[i] = featuresHouse[i];
        }
       return feturesMass;
    }
    
    var generationPhotos = function (photosHouse) {
        for (var i = photosHouse.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = photosHouse[i];
            photosHouse[i] = photosHouse[j];
            photosHouse[j] = temp;
        }
        return photosHouse;
    }

    let locationMap = {
        "x" : Math.ceil(Math.random()*630 + WIDTH_POPUB),
        "y" : Math.ceil(Math.random()*(630 - TOP_POSITION_POPAP_MAX) ) + 129 - TOP_POSITION_POPAP_MIN,
    };

    let author = {
         
        "avatar":'img/avatars/user0' + Math.ceil(Math.random()*8)+'.png',
        
    };

    let offer = {
        "title" : titleFlat[Math.ceil(Math.random()*7)],
            "address" : '"'+locationMap.x + ',' + locationMap.y+'"',
            "price" : Math.ceil(Math.random()*1000000) + 999,
            "type" : typeFlat[Math.ceil(Math.random()*3)],
            "rooms" : Math.ceil(Math.random()*5),
            "guests" : Math.ceil(Math.random()*30) + 10,
            "checkin" : checkinTime[Math.ceil(Math.random()*2)],
            "checkout" : checkinTime[Math.ceil(Math.random()*2)],
            "features" : generationFeatures(featuresHouse),
            "description" : '',
            "photos" : generationPhotos(photosHouse),
    };

    return { author, locationMap, offer }
}

var newArray = function() {
    var array = [];
    for( var i = 0; i < 8; i++ ) {
        array[i] = generateObjectData();
    }
    return array;
}
var removeChilds = function(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

var addPopupToPage = function() {
    var unsolicitedAds = newArray();
    var listMapPins = document.querySelector('.map__filters-container');
    var simularListMapPins = document.querySelector('template').content.querySelector('.map__card');

    var mapElement = simularListMapPins.cloneNode(true);
    mapElement.querySelector('.popup__title').textContent = unsolicitedAds[0].offer.title;
    mapElement.querySelector('.popup__text--address').textContent = unsolicitedAds[0].offer.address;
    mapElement.querySelector('.popup__text--price').textContent = unsolicitedAds[0].offer.price;
    mapElement.querySelector('.popup__type').textContent = unsolicitedAds[0].offer.type;
    mapElement.querySelector('.popup__text--capacity').textContent = unsolicitedAds[0].offer.rooms + " комнаты для " + unsolicitedAds[0].offer.guests+ " гостей";
    mapElement.querySelector('.popup__text-time').textContent = "Заезд после " + unsolicitedAds[0].offer.checkin + ", выезд до " + unsolicitedAds[0].offer.checkout;
    removeChilds(mapElement.querySelector('.popup__features'));
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < unsolicitedAds[0].offer.features.length; j++) {
        var elementList = document.createElement('li')
        elementList.classList.add('feature');
        elementList.classList.add('feature--' + unsolicitedAds[0].offer.features[j]);
        fragment.appendChild(elementList);
    }
    mapElement.querySelector('.popup__features').appendChild(fragment);
    mapElement.querySelector('.popup__description').textContent =  unsolicitedAds[0].offer.description;

    removeChilds(mapElement.querySelector('.popup__pictures'));

    var imageFragment = document.createDocumentFragment();

    for (var i = 0; i < unsolicitedAds[0].offer.photos.length; i++ ) {
        var elementImage = document.createElement('li');
        var imgEl = document.createElement('img');
        imgEl.src = unsolicitedAds[0].offer.photos[i];
        imgEl.height = 50;
        imgEl.width = 50;
        elementImage.appendChild(imgEl);
        imageFragment.appendChild(elementImage);
    }
    mapElement.querySelector('.popup__pictures').appendChild(imageFragment);
    mapElement.querySelector('.popup__avatar').src = unsolicitedAds[0].author.avatar;
    listMapPins.before(mapElement);
}

addPopupToPage();