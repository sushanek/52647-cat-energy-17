/*! stylelint-disable */
ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
    center: [59.938631, 30.323055],
    zoom: 17,
    controls: []
  }, {
    restrictMapArea: [
      [59.838, 29.511],
      [60.056, 30.829]
    ]
  });

  myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-pin.png',
    iconImageSize: [62, 53],
    iconImageOffset: [-31, -60]
  });

  myMap.geoObjects.add(myPlacemark);
});
