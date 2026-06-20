let allListings = [
  { id:1, type:'rent', title:'2 BHK Apartment', city:'Diphu', locality:'Matipung', price:12000, bhk:'2 BHK', furnish:'furnished', area:950, desc:'Spacious 2 BHK apartment with attached bathrooms, 24/7 water supply, and car parking. Close to markets and hospitals.', name:'Kanghon Terang', phone:'**********', date: Date.now()-86400000 },
  { id:2, type:'pg', title:'Ladies PG near Diphu govt. college', city:'Diphu', locality:'Diphu', price:5500, bhk:'Single Room', furnish:'semi', area:120, desc:'Safe and clean PG for women. Meals included, WiFi, geyser, CCTV. Warden available 24 hours.', name:'Priya Sharma', phone:'********** ', date: Date.now()-172800000 },
  { id:3, type:'land', title:'Prime Plot in Manja Town', city:'Manja', locality:'AT Road', price:1500000, bhk:'-', furnish:'-', area:3200, desc:'Corner plot with road access on three sides. Suitable for commercial or residential construction. Clear documents.', name:'abhupen atokbi', phone:'*******', date: Date.now()-259200000 },
  { id:4, type:'rent', title:'1 BHK Studio Flat', city:'Volongkom Aji', locality:'Volongkom Aji', price:7500, bhk:'1 BHK', furnish:'semi', area:550, desc:'Ideal for working professionals. Quiet locality, kitchen attached, on 2nd floor with balcony.', name:'Muku Terang', phone:'*********', date: Date.now()-345600000 },
  { id:5, type:'pg', title:'Gents PG near ITI Diphu', city:'Diphu', locality:'Taralangso', price:4200, bhk:'Single Room', furnish:'furnished', area:90, desc:'Students and working men welcome. Home-cooked meals, study room, high-speed internet, 10 mins from AEC.', name:'Hari Prasad', phone:'**********', date: Date.now()-432000000 },
  { id:6, type:'land', title:'Agricultural Land for Sale', city:'Dokmoka', locality:'Dokmoka', price:850000, bhk:'-', furnish:'-', area:15000, desc:'Fertile agricultural land near NH-37. Ideal for farming or agri-investment. Registered patta available.', name:'Bhupen Hanse', phone:'********* ', date: Date.now()-518400000 },
  { id:7, type:'rent', title:'3 BHK Independent House', city:'Dongka', locality:'Dongka', price:18000, bhk:'3 BHK', furnish:'unfurnished', area:1400, desc:'Spacious house with garden, separate servant quarter, power backup. Good for families.', name:'Sanjay Engti', phone:'*******', date: Date.now()-604800000 },
  { id:8, type:'land', title:'Residential Plot near Howrgaht Tini Ali', city:'Howraghat', locality:'Napam', price:2200000, bhk:'-', furnish:'-', area:5400, desc:'Flat land, boundary wall done on two sides. 5 minutes from Howraghat Tini Ali. Ideal for guest house or home.', name:'Anita kalita', phone:'*******', date: Date.now()-691200000 },
];

let activeType = 'all';
let currentSort = 'newest';

const typeEmoji = { rent:'🏠', pg:'🛏', land:'🌿' };
const typeLabel = { rent:'Rent', pg:'PG', land:'Land' };
const tagClass = { rent:'tag-rent', pg:'tag-pg', land:'tag-land' };

function formatPrice(listing) {
  if (listing.type === 'land') return '₹' + listing.price.toLocaleString('en-IN');
  return '₹' + listing.price.toLocaleString('en-IN') + '<span>/month</span>';
}

function renderCard(l) {
  return `
  <div class="card" onclick="openDetail(${l.id})">
    <div class="card-img">${typeEmoji[l.type]}</div>
    <div class="card-body">
      <div class="card-tag ${tagClass[l.type]}">${typeLabel[l.type]}</div>
      <div class="card-title">${l.title}</div>
      <div class="card-loc">📍 ${l.locality}, ${l.city}</div>
      <div class="card-price">${formatPrice(l)}</div>
      <div class="card-meta">
        ${l.area !== '-' ? `<div class="meta-pill">📐 ${l.area} sqft</div>` : ''}
        ${l.bhk !== '-' ? `<div class="meta-pill">🛏 ${l.bhk}</div>` : ''}
        ${l.furnish !== '-' ? `<div class="meta-pill">🪑 ${l.furnish}</div>` : ''}
      </div>
      <div class="card-footer">
        <div class="card-owner">👤 ${l.name}</div>
        <button class="btn-contact" onclick="event.stopPropagation(); callOwner('${l.phone}')">Contact</button>
      </div>
    </div>
  </div>`;
}

function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const type = document.getElementById('typeFilter').value;
  const city = document.getElementById('cityFilter').value;
  const maxPrice = parseInt(document.getElementById('priceRange').value);
  const bhkSearch = document.getElementById('bedroomSearch').value;
  const furnishChecks = [...document.querySelectorAll('.check-group input:checked')].map(c => c.value);

  let filtered = allListings.filter(l => {
    if (type !== 'all' && l.type !== type) return false;
    if (city && l.city !== city) return false;
    if (l.price > maxPrice) return false;
    if (search && !(l.title.toLowerCase().includes(search) || l.city.toLowerCase().includes(search) || l.locality.toLowerCase().includes(search))) return false;
    if (bhkSearch && l.bhk !== bhkSearch) return false;
    if (furnishChecks.length > 0 && !furnishChecks.includes(l.furnish)) return false;
    return true;
  });

  // sort
  if (currentSort === 'price-low') filtered.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-high') filtered.sort((a,b) => b.price - a.price);
  else filtered.sort((a,b) => b.date - a.date);

  const grid = document.getElementById('listingsGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('listCount');

  grid.innerHTML = filtered.map(renderCard).join('');
  empty.style.display = filtered.length === 0 ? 'block' : 'none';
  count.textContent = filtered.length + ' Listing' + (filtered.length !== 1 ? 's' : '') + ' Found';
}

function sortListings(val) {
  currentSort = val;
  applyFilters();
}

function updateRange(el) {
  document.getElementById('rangeVal').textContent = 'Up to ₹' + parseInt(el.value).toLocaleString('en-IN');
  applyFilters();
}

function clearFilters() {
  document.getElementById('typeFilter').value = 'all';
  document.getElementById('cityFilter').value = '';
  document.getElementById('priceRange').value = 50000;
  document.getElementById('rangeVal').textContent = 'Up to ₹50,000';
  document.getElementById('searchInput').value = '';
  document.querySelectorAll('.check-group input').forEach(c => c.checked = false);
  activeType = 'all';
  applyFilters();
}

function filterByType(type) {
  document.getElementById('typeFilter').value = type;
  applyFilters();
}

function setHeroTab(el, type) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  filterByType(type);
}

// Post modal
let selectedPostType = 'rent';
function openPostModal() {
  document.getElementById('postModal').classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
function selectType(el, type) {
  document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedPostType = type;
  document.getElementById('postType').value = type;
  document.getElementById('bhkGroup').style.display = type === 'land' ? 'none' : '';
  document.getElementById('furnishGroup').style.display = type === 'land' ? 'none' : '';
}
function submitListing() {
  const title = document.getElementById('postTitle').value.trim();
  const price = parseInt(document.getElementById('postPrice').value);
  const name = document.getElementById('postName').value.trim();
  const phone = document.getElementById('postPhone').value.trim();
  if (!title || !price || !name || !phone) {
    alert('Please fill in all required fields.'); return;
  }
  const newListing = {
    id: Date.now(),
    type: selectedPostType,
    title,
    city: document.getElementById('postCity').value,
    locality: document.getElementById('postLocality').value || 'City Centre',
    price,
    bhk: selectedPostType === 'land' ? '-' : document.getElementById('postBHK').value,
    furnish: selectedPostType === 'land' ? '-' : document.getElementById('postFurnish').value,
    area: parseInt(document.getElementById('postArea').value) || 0,
    desc: document.getElementById('postDesc').value || 'No description provided.',
    name, phone,
    date: Date.now()
  };
  allListings.unshift(newListing);
  closeModal('postModal');
  applyFilters();
  showToast('✅ Listing posted successfully!');
  // clear form
  ['postTitle','postPrice','postName','postPhone','postLocality','postArea','postDesc'].forEach(id => document.getElementById(id).value = '');
}

// Detail modal
function openDetail(id) {
  const l = allListings.find(x => x.id === id);
  if (!l) return;
  document.getElementById('dm-tag-title').textContent = typeLabel[l.type] + ' Details';
  document.getElementById('dm-emoji').textContent = typeEmoji[l.type];
  document.getElementById('dm-price').innerHTML = formatPrice(l);
  document.getElementById('dm-title').textContent = l.title;
  document.getElementById('dm-loc').textContent = '📍 ' + l.locality + ', ' + l.city;
  document.getElementById('dm-desc').textContent = l.desc;
  document.getElementById('dm-name').textContent = l.name;
  document.getElementById('dm-phone').textContent = '📞 ' + l.phone;
  document.getElementById('dm-call').onclick = () => callOwner(l.phone);
  const grid = document.getElementById('dm-grid');
  grid.innerHTML = `
    <div class="detail-item"><div class="di-label">Area</div><div class="di-val">${l.area} sq ft</div></div>
    <div class="detail-item"><div class="di-label">Type</div><div class="di-val">${typeLabel[l.type]}</div></div>
    ${l.bhk !== '-' ? `<div class="detail-item"><div class="di-label">Bedrooms</div><div class="di-val">${l.bhk}</div></div>` : ''}
    ${l.furnish !== '-' ? `<div class="detail-item"><div class="di-label">Furnishing</div><div class="di-val" style="text-transform:capitalize">${l.furnish}</div></div>` : ''}
  `;
  document.getElementById('detailModal').classList.add('open');
}

function callOwner(phone) {
  window.location.href = 'tel:+91' + phone;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => { if (e.target === el) el.classList.remove('open'); });
});

// Init
applyFilters();