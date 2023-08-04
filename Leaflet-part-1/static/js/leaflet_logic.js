function createMap(quakeEvents) {
  // Tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  //baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // overlayMaps object to hold the earthquake event layer.
  let overlayMaps = {
    "Earthquake Events": quakeEvents
  };
  
  //Map object with options.
  let map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, quakeEvents]
  });

  //Layer control
  L.control.layers(baseMaps, overlayMaps, { 
    collapsed: false
  }).addTo(map);
}


// THE FOLLOWING FUNCTION NEEDS COMPLETION
//*************** */
function createMarkers(response) {
    // Assign variable to features key in JSON, 
    // let features = response.features[0];

    // Array to hold quake markers
    let quakeMarkers = [];

    //Loop through quake array
    // for (i =0; i <features.length; i++)
    
}

let response = d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
console.log(response.data.features)
// console.log(data)
