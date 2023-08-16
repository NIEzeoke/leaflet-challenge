// Tile layer that will be the background of our map.
let streetmap = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

//baseMaps object to hold the streetmap layer.
let baseMaps = {
  "Street Map": streetmap,
};
// Layer group
let quakeEvents = new L.LayerGroup();

// overlayMaps object to hold the earthquake event layer.
let overlayMaps = {
  "Earthquake Events": quakeEvents,
};

//Map object with options.
let map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 3,
  layers: [streetmap],
});

//Layer control
L.control
  .layers(baseMaps, overlayMaps, {
    collapsed: false,
  })
  .addTo(map);

d3.json(
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
).then(function (data) {
  console.log(data);

function styleInfo(styling) {
  return {
    color: 'red',
    fillColor: 'blue',
    radius: 6
  }
}

  L.geoJson(data, {
    pointToLayer: function (feature, coords) {
      return L.circleMarker(coords);
    },
    style: styleInfo
  }).addTo(quakeEvents);

  quakeEvents.addTo(map);
});

