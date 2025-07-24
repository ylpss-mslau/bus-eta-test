const map = L.map('map').setView([22.3964, 114.1095], 13);

L.Icon.Default.imagePath = '';

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let stopMarkers = L.layerGroup().addTo(map);

function showStops(lat, lng) {
  document.getElementById('location-info').innerHTML = `Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`;
  stopMarkers.clearLayers();
  const stopList = document.getElementById('stop-list');
  stopList.innerHTML = '<option value="">Select a stop</option>';

  stopList.onchange = () => {
    const stopId = stopList.value;
    if (stopId) {
      fetch('stop-data.json')
        .then(response => response.json())
        .then(data => {
          const stop = data.data.find(s => s.stop === stopId);
          if (stop) {
            showEta(stop);
            map.setView([stop.lat, stop.long], 17);
          }
        });
    }
  };

  fetch('stop-data.json')
    .then(response => response.json())
    .then(data => {
      const stopsWithDistance = data.data.map(stop => {
        const distance = map.distance([lat, lng], [stop.lat, stop.long]);
        return { ...stop, distance };
      });

      const nearbyStops = stopsWithDistance.filter(stop => stop.distance < 400);

      nearbyStops.sort((a, b) => a.distance - b.distance);

      if (nearbyStops.length > 0) {
        nearbyStops.forEach(stop => {
          const option = document.createElement('option');
          option.value = stop.stop;
          option.innerHTML = `${stop.name_en} (${Math.round(stop.distance)}m)`;
          stopList.appendChild(option);

          const marker = L.marker([stop.lat, stop.long], {icon: redIcon}).addTo(stopMarkers);
          marker.on('click', () => {
            showEta(stop);
            document.getElementById('stop-list').value = stop.stop;
          });
        });
      }
    });
}

function showEta(stop) {
  const etaList = document.getElementById('eta-list');
  etaList.innerHTML = `
    <div class="stop-info">
      <h3>${stop.name_en}</h3>
      <p>Stop ID: ${stop.stop}</p>
      <p>Latitude: ${stop.lat}</p>
      <p>Longitude: ${stop.long}</p>
    </div>
    <ul class="route-list" id="route-list-data"></ul>
  `;

  fetch(`https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stop.stop}`)
    .then(response => response.json())
    .then(data => {
      const routeList = document.getElementById('route-list-data');
      if (data.data.length > 0) {
        const now = new Date();
        const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

        const etasByRoute = {};

        data.data.forEach(route => {
          const etaDate = new Date(route.eta);
          if (etaDate > now && etaDate < oneHourLater) {
            const routeKey = `${route.route} to ${route.dest_en}`;
            if (!etasByRoute[routeKey]) {
              etasByRoute[routeKey] = [];
            }
            const waitingTime = Math.round((etaDate - now) / 60000);
            etasByRoute[routeKey].push({
              time: etaDate.toLocaleTimeString(),
              wait: waitingTime
            });
          }
        });

        routeList.innerHTML = ''; // Clear the list

        for (const routeKey in etasByRoute) {
          const routeEl = document.createElement('li');
          routeEl.innerHTML = `<b>${routeKey}</b>`;
          const subList = document.createElement('ul');
          etasByRoute[routeKey].forEach(eta => {
            const etaEl = document.createElement('li');
            etaEl.innerText = `${eta.time} (${eta.wait} minutes)`;
            subList.appendChild(etaEl);
          });
          routeEl.appendChild(subList);
          routeList.appendChild(routeEl);
        }


        if (Object.keys(etasByRoute).length === 0) {
          routeList.innerHTML = '<li>No ETA data available within the next hour.</li>';
        }
      } else {
        routeList.innerHTML = '<li>No ETA data available.</li>';
      }
    });
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    map.setView([latitude, longitude], 17);
    showStops(latitude, longitude);
  });
} else {
  // Default to Hong Kong if geolocation is not available
  showStops(22.3964, 114.1095);
}

map.on('click', e => {
  const { lat, lng } = e.latlng;
  map.setView([lat, lng]);
  showStops(lat, lng);
});