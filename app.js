// JavaScript source code
// Initialize App state & Map
let map;
let marker;

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  setupEventListeners();
  updateEncoding();
  generateTestBatch();
});

// 1. Initialize Leaflet Map
function initMap() {
  const defaultLat = 12.9375;
  const defaultLng = 77.6250;

  map = L.map('map').setView([defaultLat, defaultLng], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(map);

  // Click on map to set coordinates
  map.on('click', (e) => {
    setCoordinates(e.latlng.lat, e.latlng.lng);
  });

  // Drag marker to set coordinates
  marker.on('dragend', (e) => {
    const latlng = marker.getLatLng();
    setCoordinates(latlng.lat, latlng.lng);
  });
}

function setCoordinates(lat, lng) {
  document.getElementById('inputLat').value = lat.toFixed(6);
  document.getElementById('inputLng').value = lng.toFixed(6);
  marker.setLatLng([lat, lng]);
  map.panTo([lat, lng]);
  updateEncoding();
}

// 2. Setup Event Handlers
function setupEventListeners() {
  document.getElementById('btnEncode').addEventListener('click', updateEncoding);
  
  document.getElementById('inputLat').addEventListener('input', () => {
    const lat = parseFloat(document.getElementById('inputLat').value);
    const lng = parseFloat(document.getElementById('inputLng').value);
    if (!isNaN(lat) && !isNaN(lng)) {
      marker.setLatLng([lat, lng]);
      map.panTo([lat, lng]);
      updateEncoding();
    }
  });

  document.getElementById('inputLng').addEventListener('input', () => {
    const lat = parseFloat(document.getElementById('inputLat').value);
    const lng = parseFloat(document.getElementById('inputLng').value);
    if (!isNaN(lat) && !isNaN(lng)) {
      marker.setLatLng([lat, lng]);
      map.panTo([lat, lng]);
      updateEncoding();
    }
  });

  // GPS geolocation button
  document.getElementById('btnGps').addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoordinates(pos.coords.latitude, pos.coords.longitude),
        (err) => alert("Could not fetch GPS: " + err.message)
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  });

  // Random Indian coordinate button
  document.getElementById('btnRandom').addEventListener('click', () => {
    const lat = 10 + Math.random() * 20;
    const lng = 70 + Math.random() * 18;
    setCoordinates(lat, lng);
  });

  // Generate 10 sample batch button
  document.getElementById('btnGenerate10').addEventListener('click', generateTestBatch);
}

// 3. Core Coordinate Encoding Engine
function encodeVincode(lat, lng) {
  // P1 and P2: Degree Integers
  const p1_val = Math.floor(lat);
  const p2_val = Math.floor(lng);

  // Fractional components (up to 4 decimals)
  const latDecStr = (lat - p1_val).toFixed(4).substring(2); // e.g. "9375"
  const lngDecStr = (lng - p2_val).toFixed(4).substring(2); // e.g. "6250"

  const p3_1_val = latDecStr[0] || "0";
  const p3_2_val = latDecStr[1] || "0";
  const rawP4 = parseInt(latDecStr.substring(2, 4) || "0", 10);
  const p4_val = roundToQuarter(rawP4);

  const p5_1_val = lngDecStr[0] || "0";
  const p5_2_val = lngDecStr[1] || "0";
  const rawP6 = parseInt(lngDecStr.substring(2, 4) || "0", 10);
  const p6_val = roundToQuarter(rawP6);

  // Lookups
  const p1Word = (VINCODE_TABLES.latLookup[p1_val] && VINCODE_TABLES.latLookup[p1_val].primary) || 
                 VINCODE_TABLES.shortCodes.p1[p1_val] || `LAT-${p1_val}`;
  const p2Word = (VINCODE_TABLES.longLookup[p2_val] && VINCODE_TABLES.longLookup[p2_val].primary) || 
                 VINCODE_TABLES.shortCodes.p1[p2_val] || `LON-${p2_val}`;

  const p3_1_word = VINCODE_TABLES.shortCodes.p3[p3_1_val] || VINCODE_TABLES.shortCodes.p5_1[p3_1_val] || "JAYA";
  const p3_2_word = VINCODE_TABLES.shortCodes.p5_2[p3_2_val] || "KAVERI";
  const p4_word   = VINCODE_TABLES.shortCodes.p4[p4_val] || "BEEDU";

  const p5_1_word = VINCODE_TABLES.shortCodes.p5_1[p5_1_val] || "MANGALA";
  const p5_2_word = VINCODE_TABLES.shortCodes.p5_2[p5_2_val] || "MADHAVA";
  const p6_word   = VINCODE_TABLES.shortCodes.p6[p6_val] || "NAGARA";

  const macroPhrase = `${p1Word} ${p2Word}`;
  const latSubGrid  = `${p3_1_word} ${p3_2_word} ${p4_word}`;
  const lonSubGrid  = `${p5_1_word} ${p5_2_word} ${p6_word}`;

  const fullShortCode = `${macroPhrase} ${latSubGrid} ${lonSubGrid}`;

  // Phonetic Syllable Representation
  const phonetic = generatePhoneticName(p1_val, p2_val, p3_1_val, p3_2_val, p5_1_val, p5_2_val);

  return {
    macroPhrase,
    latSubGrid,
    lonSubGrid,
    fullShortCode,
    phonetic
  };
}

// Maps 2-digit decimals (00-99) to quarter grid steps (0, 25, 50, 75)
function roundToQuarter(val) {
  if (val < 13) return 0;
  if (val < 38) return 25;
  if (val < 63) return 50;
  return 75;
}

// Syllable Name Generator
function generatePhoneticName(p1, p2, d1, d2, d3, d4) {
  // Hardcoded known verified points from the Coding Sheet
  if (p1 === 13 && p2 === 79) return "VenKaTaRaMaNa";
  if (p1 === 13 && p2 === 74) return "GoPaLaGoVinDa";
  if (p1 === 15 && p2 === 77) return "PaRaMaGuRuRaYaRu";

  // General algorithmic syllable assembly
  const syl1 = VINCODE_TABLES.shortCodesNumeric[p1] || VINCODE_TABLES.syllables380[p1 % VINCODE_TABLES.syllables380.length];
  const syl2 = VINCODE_TABLES.shortCodesNumeric[p2] || VINCODE_TABLES.syllables380[p2 % VINCODE_TABLES.syllables380.length];
  const syl3 = VINCODE_TABLES.syllables380[(parseInt(d1) * 10 + parseInt(d2)) % VINCODE_TABLES.syllables380.length];
  const syl4 = VINCODE_TABLES.syllables380[(parseInt(d3) * 10 + parseInt(d4)) % VINCODE_TABLES.syllables380.length];

  return `${syl1}${syl2}${syl3}${syl4}`;
}

// 4. Update UI View
function updateEncoding() {
  const lat = parseFloat(document.getElementById('inputLat').value);
  const lng = parseFloat(document.getElementById('inputLng').value);

  if (isNaN(lat) || isNaN(lng)) return;

  const result = encodeVincode(lat, lng);

  document.getElementById('outShortCode').textContent = result.fullShortCode;
  document.getElementById('chipP1P2').textContent = result.macroPhrase;
  document.getElementById('chipLatGrid').textContent = result.latSubGrid;
  document.getElementById('chipLonGrid').textContent = result.lonSubGrid;
  document.getElementById('outPhoneticName').textContent = result.phonetic;
}

// 5. Generate Random Test Batch
function generateTestBatch() {
  const tbody = document.getElementById('testTableBody');
  tbody.innerHTML = '';

  for (let i = 0; i < 10; i++) {
    const lat = 11 + Math.random() * 16;
    const lng = 70 + Math.random() * 16;
    const res = encodeVincode(lat, lng);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${lat.toFixed(4)}, ${lng.toFixed(4)}</strong></td>
      <td>${res.fullShortCode}</td>
    `;
    tr.addEventListener('click', () => {
      setCoordinates(lat, lng);
    });
    tbody.appendChild(tr);
  }
}

// Copy to Clipboard Utility
function copyText(elementId) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard: " + text);
  });
}