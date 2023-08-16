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
  // Function to determine marker size
  function markerSize(magnitude) {
    return magnitude * 4;
  };
  // Function to determine the marker color
  function chooseColor(depth) {
    switch(true) {
      case depth > 90:
        return "red";
      case depth > 70:
        return "orangered";
      case depth > 50:
        return "orange";
      case depth > 30:
        return "gold";
      case depth > 10:
        return "yellow";
      default:
        return "lightgreen";
    }
  }

  L.geoJson(data, {
    pointToLayer: function (feature, coords) {
      return L.circleMarker(coords,
        {
          radius: markerSize(feature.properties.mag),
          fillColor: chooseColor(feature.geometry.coordinates[2]),
          fillOpacity: 0.7,
          color: "black",
          stroke: true,
          weight: 0.5
        }
      );
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3><hr><p>Date: "
      + new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
    }
  }).addTo(quakeEvents);
  // Add quakeEvents to map
  quakeEvents.addTo(map);

  // Legend creation
  let legend=L.control({position: "bottomright"});
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];
    
    div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"
  for (let i =0; i < depth.length; i++) {
    div.innerHTML += 
    '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' +
        depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
      }
    return div;
  };
  legend.addTo(map);
});

