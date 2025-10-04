<template>
  <section id="stores" class="stores-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Lojas Participantes</h2>
        <p class="section-subtitle">Encontre a loja mais próxima de você para participar da promoção</p>
      </div>

      <div class="location-finder">
        <div class="finder-card">
          <h3>📍 Encontrar Lojas Próximas</h3>
          <div class="location-inputs">
            <div class="input-group">
              <input
                v-model="userLocation"
                type="text"
                placeholder="Digite seu CEP ou endereço..."
                class="location-input"
                @keyup.enter="findNearbyStores"
              />
              <button @click="findNearbyStores" class="find-btn" :disabled="loading">
                {{ loading ? '🔄' : '🔍' }} Buscar
              </button>
            </div>
            <button @click="getUserLocation" class="geolocation-btn" :disabled="loading">
              📍 Usar minha localização atual
            </button>
          </div>
          <div v-if="userCoordinates" class="location-status">
            <span class="status-icon">✅</span>
            <span>Localização encontrada! Mostrando lojas próximas.</span>
          </div>
        </div>
      </div>

      <div class="stores-content">
        <div class="stores-map-section">
          <div class="map-container">
            <div id="stores-map" class="leaflet-map"></div>
          </div>

          <div class="map-filters">
            <h4>Filtros</h4>
            <div class="distance-filter">
              <label>Distância máxima: {{ maxDistance }}km</label>
              <input
                type="range"
                v-model="maxDistance"
                min="1"
                max="50"
                @input="applyFilters"
                class="distance-slider"
              />
            </div>
          </div>
        </div>

        <div class="stores-list-section">
          <div class="list-header">
            <h3>{{ filteredStores.length }} lojas encontradas</h3>
            <div class="sort-controls">
              <select v-model="sortBy" @change="sortStores" class="sort-select">
                <option value="distance">Mais próximas</option>
                <option value="name">Nome (A-Z)</option>
                <option value="rating">Melhor avaliadas</option>
              </select>
            </div>
          </div>

          <div class="stores-list">
            <div
              v-for="store in paginatedStores"
              :key="store.id"
              :class="['store-card', { selected: selectedStore?.id === store.id }]"
              @click="selectStore(store)"
            >
              <div class="store-info">
                <div class="store-header">
                  <h4 class="store-name">{{ store.name }}</h4>
                  <div class="store-location-badge">
                    {{ store.city }} - {{ store.state }}
                  </div>
                </div>

                <div class="store-details">
                  <div class="detail-item">
                    <span class="detail-icon">📍</span>
                    <span>{{ store.address }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">🆔</span>
                    <span>CNPJ: {{ store.cnpj }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">📏</span>
                    <span>{{ store.distance }}km de distância</span>
                  </div>
                </div>

                <div class="store-actions">
                  <button class="action-btn primary" @click.stop="getDirections(store)">
                    🧭 Como chegar
                  </button>
                  <button class="action-btn secondary" @click.stop="shareStore(store)">
                    📤 Compartilhar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="pagination" v-if="totalPages > 1">
            <button
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
              class="pagination-btn"
            >
              ← Anterior
            </button>
            <span class="pagination-info">
              Página {{ currentPage }} de {{ totalPages }}
            </span>
            <button
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
              class="pagination-btn"
            >
              Próxima →
            </button>
          </div>
        </div>
      </div>

      <div class="store-stats">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon">🏪</div>
            <div class="stat-content">
              <span class="stat-number">{{ totalStores }}</span>
              <span class="stat-label">Lojas Participantes</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">🏙️</div>
            <div class="stat-content">
              <span class="stat-number">{{ totalCities }}</span>
              <span class="stat-label">Cidades</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">📍</div>
            <div class="stat-content">
              <span class="stat-number">{{ totalStates }}</span>
              <span class="stat-label">Estados</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { storeService } from '@/services/storeService'
import { geocodingService } from '@/services/geocodingService'
import type { Store as ApiStore } from '@/types/store'

interface StoreDisplay {
  id: string
  name: string
  address: string
  city: string
  state: string
  cnpj: string
  distance: number
  lat: number
  lng: number
}

const userLocation = ref('')
const userCoordinates = ref<{ lat: number; lng: number } | null>(null)
const loading = ref(false)
const selectedStore = ref<StoreDisplay | null>(null)
const currentPage = ref(1)
const itemsPerPage = 6
const sortBy = ref('distance')
const maxDistance = ref(50)

const stores = ref<StoreDisplay[]>([])
let map: L.Map | null = null
let markersLayer: L.LayerGroup | null = null
let userMarker: L.Marker | null = null

const filteredStores = computed(() => {
  let filtered = stores.value

  // Apply distance filter
  filtered = filtered.filter(store => store.distance <= maxDistance.value)

  return filtered
})

const sortedStores = computed(() => {
  const sorted = [...filteredStores.value]

  switch (sortBy.value) {
    case 'distance':
      return sorted.sort((a, b) => a.distance - b.distance)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
})

const paginatedStores = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedStores.value.slice(start, end)
})

const visibleStores = computed(() => {
  // Return filtered stores - markers are handled by Leaflet
  return filteredStores.value
})

const totalPages = computed(() => Math.ceil(filteredStores.value.length / itemsPerPage))

const totalStores = computed(() => stores.value.length)
const totalCities = computed(() => new Set(stores.value.map(s => s.city)).size)
const totalStates = computed(() => new Set(stores.value.map(s => s.state)).size)


const findNearbyStores = async () => {
  if (!userLocation.value.trim()) return

  loading.value = true

  try {
    // Try to geocode the user input (CEP or address)
    // For now, we'll use a simple approach - you could integrate a CEP API here
    const [city, state] = userLocation.value.split(',').map(s => s.trim())

    if (city && state) {
      const coords = await geocodingService.geocode(city, state)
      if (coords) {
        userCoordinates.value = coords
        updateStoreDistances()
        updateMapMarkers()
      } else {
        alert('Localização não encontrada. Tente usar sua localização atual.')
      }
    } else {
      alert('Digite no formato: Cidade, Estado (ex: São Paulo, SP)')
    }
  } catch (error) {
    console.error('Erro ao buscar localização:', error)
    alert('Erro ao buscar localização. Tente novamente.')
  } finally {
    loading.value = false
  }
}

const getUserLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocalização não é suportada pelo seu navegador')
    return
  }

  loading.value = true

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userCoordinates.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      updateStoreDistances()
      updateMapMarkers()
      loading.value = false
    },
    (error) => {
      console.error('Erro ao obter localização:', error)
      alert('Não foi possível obter sua localização. Verifique as permissões do navegador.')
      loading.value = false
    }
  )
}

const updateStoreDistances = () => {
  if (!userCoordinates.value) return

  stores.value.forEach(store => {
    store.distance = geocodingService.calculateDistance(
      userCoordinates.value!,
      { lat: store.lat, lng: store.lng }
    )
  })

  // Sort stores by distance after updating
  stores.value.sort((a, b) => a.distance - b.distance)
}

const selectStore = (store: StoreDisplay) => {
  selectedStore.value = store
}

const applyFilters = () => {
  currentPage.value = 1
}

const sortStores = () => {
  currentPage.value = 1
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const getDirections = (store: StoreDisplay) => {
  const query = encodeURIComponent(`${store.address}, ${store.city} - ${store.state}`)
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank')
}

const shareStore = (store: StoreDisplay) => {
  if (navigator.share) {
    navigator.share({
      title: store.name,
      text: `Confira esta loja participante: ${store.name}`,
      url: window.location.href
    })
  } else {
    // Fallback for browsers without Web Share API
    const text = `Confira esta loja participante: ${store.name} - ${store.address}, ${store.city} - ${store.state}`
    navigator.clipboard.writeText(text)
    alert('Informações copiadas para a área de transferência!')
  }
}

// Initialize Leaflet map
const initMap = () => {
  if (map) return

  // Create map centered on Brazil
  map = L.map('stores-map').setView([-15.7801, -47.9292], 4)

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)

  // Create layer group for markers
  markersLayer = L.layerGroup().addTo(map)
}

// Update map markers
const updateMapMarkers = () => {
  if (!map || !markersLayer) return

  // Clear existing markers
  markersLayer.clearLayers()

  // Add store markers
  filteredStores.value.forEach(store => {
    if (store.lat && store.lng) {
      const marker = L.marker([store.lat, store.lng], {
        icon: L.divIcon({
          className: 'custom-store-marker',
          html: '<div class="marker-pin">🏪</div>',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })
      })

      marker.bindPopup(`
        <div class="marker-popup">
          <h4>${store.name}</h4>
          <p>${store.city} - ${store.state}</p>
          <p>${store.distance ? store.distance + 'km de distância' : ''}</p>
        </div>
      `)

      marker.on('click', () => {
        selectStore(store)
      })

      marker.addTo(markersLayer!)
    }
  })

  // Add user marker if location is available
  if (userCoordinates.value) {
    if (userMarker) {
      userMarker.setLatLng([userCoordinates.value.lat, userCoordinates.value.lng])
    } else {
      userMarker = L.marker([userCoordinates.value.lat, userCoordinates.value.lng], {
        icon: L.divIcon({
          className: 'custom-user-marker',
          html: '<div class="marker-pin user">📍</div>',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })
      }).addTo(markersLayer!)

      userMarker.bindPopup('<div class="marker-popup"><strong>Você está aqui</strong></div>')
    }

    // Center map on user location
    map.setView([userCoordinates.value.lat, userCoordinates.value.lng], 10)
  }
}

// Convert API store to display store
const convertApiStoreToDisplay = async (apiStore: ApiStore): Promise<StoreDisplay> => {
  // Use geocoding service to get coordinates
  const coords = await geocodingService.geocode(apiStore.city, apiStore.state)

  return {
    id: apiStore.id,
    name: apiStore.name,
    address: apiStore.address,
    city: apiStore.city,
    state: apiStore.state,
    cnpj: apiStore.cnpj,
    distance: 0, // Will be calculated when user location is available
    lat: coords?.lat || -15.7801, // Default to Brazil center if not found
    lng: coords?.lng || -47.9292
  }
}

// Load stores from API
const loadStores = async () => {
  try {
    loading.value = true
    const apiStores = await storeService.getAll()

    // Convert stores with geocoding (async)
    const storePromises = apiStores.map(store => convertApiStoreToDisplay(store))
    stores.value = await Promise.all(storePromises)

    // Update map markers after loading stores
    updateMapMarkers()
  } catch (error) {
    console.error('Erro ao carregar lojas:', error)
  } finally {
    loading.value = false
  }
}

// Watch for filter changes and update markers
watch([() => filteredStores.value, maxDistance], () => {
  updateMapMarkers()
})

onMounted(() => {
  initMap()
  loadStores()
})

onBeforeUnmount(() => {
  // Clean up map
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
.stores-section {
  padding: 5rem 0;
  background: white;
}

.container {
  width: 100%;
  max-width: 2200px;
  margin: 0 auto;
  padding: 0 4rem;
}

@media (max-width: 1535px) {
  .container {
    max-width: 1600px;
    padding: 0 3rem;
  }
}

@media (max-width: 1279px) {
  .container {
    max-width: 1200px;
    padding: 0 2rem;
  }
}

@media (max-width: 1023px) {
  .container {
    max-width: 768px;
    padding: 0 2rem;
  }
}

@media (max-width: 767px) {
  .container {
    max-width: 640px;
    padding: 0 1.5rem;
  }
}

@media (max-width: 639px) {
  .container {
    padding: 0 1rem;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #718096;
  max-width: 600px;
  margin: 0 auto;
}

.location-finder {
  margin-bottom: 3rem;
}

.finder-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 1rem;
  color: white;
  text-align: center;
}

.finder-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.location-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.location-input {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-family: 'Poppins', sans-serif;
}

.find-btn,
.geolocation-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}

.find-btn:hover,
.geolocation-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.find-btn:disabled,
.geolocation-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.location-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-weight: 500;
}

.stores-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.stores-map-section,
.stores-list-section {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 1rem;
}

.map-container {
  margin-bottom: 2rem;
}

.leaflet-map {
  height: 500px;
  border-radius: 0.5rem;
  overflow: hidden;
  z-index: 1;
}

/* Custom marker styles */
:deep(.custom-store-marker),
:deep(.custom-user-marker) {
  background: none;
  border: none;
}

:deep(.marker-pin) {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

:deep(.marker-pin:hover) {
  transform: scale(1.1);
}

:deep(.marker-pin.user) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0 2px 20px rgba(102, 126, 234, 0.6);
  }
}

/* Popup styles */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 0.5rem;
  padding: 0;
}

:deep(.marker-popup) {
  padding: 0.75rem;
  min-width: 150px;
}

:deep(.marker-popup h4) {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
}

:deep(.marker-popup p) {
  margin: 0.25rem 0;
  font-size: 0.875rem;
  color: #4a5568;
}

.map-filters h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.distance-filter label {
  display: block;
  font-size: 0.95rem;
  color: #4a5568;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.distance-slider {
  width: 100%;
  appearance: none;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  outline: none;
}

.distance-slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: #667eea;
  border-radius: 50%;
  cursor: pointer;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.list-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
}

.sort-select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: white;
  font-family: 'Poppins', sans-serif;
}

.stores-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.store-card {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.store-card:hover,
.store-card.selected {
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.store-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.store-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.store-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  flex: 1;
}

.store-location-badge {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
}

.store-details {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.8rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.95rem;
}

.detail-icon {
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.store-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.action-btn {
  padding: 0.4rem 0.8rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.action-btn.primary {
  background: #667eea;
  color: white;
}

.action-btn.primary:hover {
  background: #5a67d8;
}

.action-btn.secondary {
  background: #edf2f7;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.action-btn.secondary:hover {
  background: #e2e8f0;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.pagination-btn:hover:not(:disabled) {
  background: #f7fafc;
  border-color: #667eea;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.9rem;
  color: #718096;
}

.store-stats {
  background: #f8fafc;
  padding: 3rem;
  border-radius: 1rem;
  margin-top: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

@media (min-width: 1280px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
  }
}

@media (min-width: 1920px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 4rem;
  }
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
}

.stat-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
}

.stat-label {
  font-size: 0.9rem;
  color: #718096;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }

  .location-inputs {
    max-width: none;
  }

  .input-group {
    flex-direction: column;
  }

  .stores-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .store-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .store-location-badge {
    align-self: flex-start;
  }

  .store-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>