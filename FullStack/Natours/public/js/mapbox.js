export const displayMap = tourLocation => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZGFudGUwNTUiLCJhIjoiY2tpY3oxNW0wMGp1YTJwcnMzM3Rla3d3NyJ9.U5ujR9pKn5rwRTdAXV5jsQ';

  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dante055/ckid9h1gt1uyo19n1mzfqkg0j',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();
  const sanitizedTourLocations = [];

  tourLocation.forEach(loc => {
    bounds.extend(loc.coordinates);

    sanitizedTourLocations.push({
      type: 'Feature',
      properties: {
        description: `<p><b>${loc.description}</b> (Day ${loc.day})</p>`,
      },
      geometry: {
        type: loc.type,
        coordinates: loc.coordinates,
      },
    });
  });

  // --------- add marker image and show popup on hover --------------
  map.on('load', function () {
    map.loadImage(
      '/img/pin.png',

      // Add an image to use as a custom marker
      function (error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);

        map.addSource('places', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: sanitizedTourLocations,
          },
        });

        // Add a layer showing the places.
        map.addLayer({
          id: 'places',
          type: 'symbol',
          source: 'places',
          layout: {
            'icon-image': 'custom-marker',
            'icon-allow-overlap': true,
            'icon-size': 0.15,
            'icon-anchor': 'bottom',
          },
        });
      }
    );

    // Create a popup, but don't add it to the map yet.
    let popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on('mouseenter', 'places', function (e) {
      map.getCanvas().style.cursor = 'pointer';
      let coordinates = e.features[0].geometry.coordinates.slice();
      let description = e.features[0].properties.description;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'places', function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100,
    },
  });
};
