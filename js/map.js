

var generateObjectData = function () {
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
        'http://o0.github .io/assets/images/tokyo/hotel3.jpg',
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
        "x" : Math.ceil(Math.random()*630),
        "y" : Math.ceil(Math.random()*630) + 129,
    };

    let author = {
         
        "avatar":'img/avatars/user0' + Math.ceil(Math.random()*8)
        
    };

    let offer = {
        "title" : titleFlat[Math.ceil(Math.random()*7)],
            "address" : locationMap.x + ',' + locationMap.y,
            "price" : Math.ceil(Math.random()*1000000) + 999,
            "type" : Math.ceil(Math.random()*4),
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
var unsolicitedAds = [];
for( var i = 0; i < 8; i++ ) {
    unsolicitedAds[i] = generateObjectData();
}


console.log(unsolicitedAds);
var listMapPins = document.querySelector('.map__pin');
var simularListMapPins = document.querySelector('template').content.querySelector('.map__card');
for ( var i = 0; i < unsolicitedAds.length; i++) {
    var mapElement = simularListMapPins.cloneNode(true);

    mapElement.querySelector('h3').textContent = unsolicitedAds[i].offer.title;
    mapElement.querySelector('.popup__avatar').src = unsolicitedAds[i].author.avatar;
    for (var j = 0; j < unsolicitedAds[i].offer.features.length; j++) {
        mapElement.querySelector('.feature--' + unsolicitedAds[i].offer.features[j]).textContent = unsolicitedAds[i].offer.features[j];
    }
    mapElement.style.left = unsolicitedAds[i].locationMap.x + "px";
    mapElement.style.top = unsolicitedAds[i].locationMap.y + "px";
    listMapPins.appendChild(mapElement);
}