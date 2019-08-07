/*! stylelint-disable */
ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
    center: [59.938631, 30.323055],
    zoom: 17,
    controls: []
  }),

  myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-pin.png',
    iconImageSize: [124, 106],
    iconImageOffset: [-65, -100]
  });

  myMap.geoObjects.add(myPlacemark);
});
