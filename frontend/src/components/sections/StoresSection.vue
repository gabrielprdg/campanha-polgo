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
            <div class="interactive-map">
              <div class="map-placeholder">
                <div class="map-icon">🗺️</div>
                <p>Mapa Interativo das Lojas</p>
                <div class="map-controls">
                  <button @click="zoomIn" class="map-control">+</button>
                  <button @click="zoomOut" class="map-control">-</button>
                  <button @click="centerMap" class="map-control">📍</button>
                </div>
              </div>

              <!-- Mock store markers -->
              <div
                v-for="store in visibleStores"
                :key="store.id"
                :class="['store-marker', { selected: selectedStore?.id === store.id }]"
                :style="{
                  top: `${store.mapY}%`,
                  left: `${store.mapX}%`
                }"
                @click="selectStore(store)"
              >
                <div class="marker-icon">🏪</div>
                <div class="marker-tooltip">
                  <strong>{{ store.name }}</strong><br>
                  {{ store.distance }}km
                </div>
              </div>

              <!-- User location marker -->
              <div
                v-if="userCoordinates"
                class="user-marker"
                :style="{
                  top: '50%',
                  left: '50%'
                }"
              >
                <div class="user-icon">📍</div>
                <div class="user-tooltip">Você está aqui</div>
              </div>
            </div>
          </div>

          <div class="map-filters">
            <h4>Filtros</h4>
            <div class="filter-group">
              <label class="filter-item">
                <input type="checkbox" v-model="filters.openNow" @change="applyFilters">
                <span>Abertas agora</span>
              </label>
              <label class="filter-item">
                <input type="checkbox" v-model="filters.hasParking" @change="applyFilters">
                <span>Com estacionamento</span>
              </label>
              <label class="filter-item">
                <input type="checkbox" v-model="filters.wheelchair" @change="applyFilters">
                <span>Acessível</span>
              </label>
            </div>
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
              <div class="store-image">
                <img :src="store.image" :alt="store.name" />
                <div v-if="store.openNow" class="open-badge">Aberto</div>
                <div v-else class="closed-badge">Fechado</div>
              </div>

              <div class="store-info">
                <div class="store-header">
                  <h4 class="store-name">{{ store.name }}</h4>
                  <div class="store-rating">
                    <span class="rating-stars">{{ '⭐'.repeat(Math.floor(store.rating)) }}</span>
                    <span class="rating-number">({{ store.rating }})</span>
                  </div>
                </div>

                <div class="store-address">
                  <span class="address-icon">📍</span>
                  <span>{{ store.address }}</span>
                </div>

                <div class="store-details">
                  <div class="detail-item">
                    <span class="detail-icon">📏</span>
                    <span>{{ store.distance }}km de distância</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">⏰</span>
                    <span>{{ store.hours }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">📞</span>
                    <span>{{ store.phone }}</span>
                  </div>
                </div>

                <div class="store-features">
                  <span v-if="store.hasParking" class="feature-tag">🚗 Estacionamento</span>
                  <span v-if="store.wheelchair" class="feature-tag">♿ Acessível</span>
                  <span v-if="store.driveThru" class="feature-tag">🚙 Drive-thru</span>
                </div>

                <div class="store-actions">
                  <button class="action-btn primary" @click.stop="getDirections(store)">
                    🧭 Como chegar
                  </button>
                  <button class="action-btn secondary" @click.stop="callStore(store)">
                    📞 Ligar
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
          <div class="stat-item">
            <div class="stat-icon">⭐</div>
            <div class="stat-content">
              <span class="stat-number">{{ averageRating }}</span>
              <span class="stat-label">Avaliação Média</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Store {
  id: number
  name: string
  address: string
  city: string
  state: string
  phone: string
  hours: string
  rating: number
  distance: number
  openNow: boolean
  hasParking: boolean
  wheelchair: boolean
  driveThru: boolean
  image: string
  lat: number
  lng: number
  mapX: number
  mapY: number
}

const userLocation = ref('')
const userCoordinates = ref<{ lat: number; lng: number } | null>(null)
const loading = ref(false)
const selectedStore = ref<Store | null>(null)
const currentPage = ref(1)
const itemsPerPage = 6
const sortBy = ref('distance')
const maxDistance = ref(10)

const filters = ref({
  openNow: false,
  hasParking: false,
  wheelchair: false
})

const stores = ref<Store[]>([])

const filteredStores = computed(() => {
  let filtered = stores.value

  // Apply distance filter
  filtered = filtered.filter(store => store.distance <= maxDistance.value)

  // Apply other filters
  if (filters.value.openNow) {
    filtered = filtered.filter(store => store.openNow)
  }
  if (filters.value.hasParking) {
    filtered = filtered.filter(store => store.hasParking)
  }
  if (filters.value.wheelchair) {
    filtered = filtered.filter(store => store.wheelchair)
  }

  return filtered
})

const sortedStores = computed(() => {
  const sorted = [...filteredStores.value]

  switch (sortBy.value) {
    case 'distance':
      return sorted.sort((a, b) => a.distance - b.distance)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
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
  // Show only stores within the map bounds and current filters
  return filteredStores.value.slice(0, 20) // Limit markers for performance
})

const totalPages = computed(() => Math.ceil(filteredStores.value.length / itemsPerPage))

const totalStores = computed(() => stores.value.length)
const totalCities = computed(() => new Set(stores.value.map(s => s.city)).size)
const totalStates = computed(() => new Set(stores.value.map(s => s.state)).size)
const averageRating = computed(() => {
  const avg = stores.value.reduce((sum, s) => sum + s.rating, 0) / stores.value.length
  return avg.toFixed(1)
})

const findNearbyStores = async () => {
  if (!userLocation.value.trim()) return

  loading.value = true

  try {
    // Simulate geocoding API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock coordinates for demonstration
    userCoordinates.value = {
      lat: -23.5505 + (Math.random() - 0.5) * 0.1,
      lng: -46.6333 + (Math.random() - 0.5) * 0.1
    }

    // Update store distances based on new location
    updateStoreDistances()

  } catch (error) {
    console.error('Erro ao buscar localização:', error)
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
      loading.value = false
    },
    (error) => {
      console.error('Erro ao obter localização:', error)
      alert('Não foi possível obter sua localização')
      loading.value = false
    }
  )
}

const updateStoreDistances = () => {
  if (!userCoordinates.value) return

  stores.value.forEach(store => {
    // Calculate distance using Haversine formula (simplified)
    const dLat = (store.lat - userCoordinates.value!.lat) * Math.PI / 180
    const dLng = (store.lng - userCoordinates.value!.lng) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userCoordinates.value!.lat * Math.PI / 180) * Math.cos(store.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    store.distance = Math.round(6371 * c * 10) / 10 // Earth radius in km
  })
}

const selectStore = (store: Store) => {
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

const getDirections = (store: Store) => {
  const query = encodeURIComponent(store.address)
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank')
}

const callStore = (store: Store) => {
  window.open(`tel:${store.phone}`)
}

const shareStore = (store: Store) => {
  if (navigator.share) {
    navigator.share({
      title: store.name,
      text: `Confira esta loja participante: ${store.name}`,
      url: window.location.href
    })
  } else {
    // Fallback for browsers without Web Share API
    const text = `Confira esta loja participante: ${store.name} - ${store.address}`
    navigator.clipboard.writeText(text)
    alert('Informações copiadas para a área de transferência!')
  }
}

const zoomIn = () => {
  console.log('Zoom in')
}

const zoomOut = () => {
  console.log('Zoom out')
}

const centerMap = () => {
  console.log('Center map')
}

// Generate mock store data
onMounted(() => {
  const storeNames = [
    'Supermercado Central', 'Loja do João', 'Mercado São Paulo', 'Atacadão Popular',
    'Drogaria Saúde', 'Farmácia Bem Estar', 'Eletrônicos Tech', 'Casa & Construção',
    'Shopping da Cidade', 'Posto de Gasolina Rápido', 'Padaria do Bairro', 'Açougue Premium'
  ]

  const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Curitiba', 'Salvador']
  const states = ['SP', 'RJ', 'MG', 'RS', 'PR', 'BA']

  const mockStores: Store[] = []

  for (let i = 1; i <= 50; i++) {
    const cityIndex = Math.floor(Math.random() * cities.length)
    const lat = -23.5505 + (Math.random() - 0.5) * 2 // Around São Paulo area
    const lng = -46.6333 + (Math.random() - 0.5) * 2

    mockStores.push({
      id: i,
      name: storeNames[Math.floor(Math.random() * storeNames.length)],
      address: `Rua ${i}, ${Math.floor(Math.random() * 999) + 1} - Centro`,
      city: cities[cityIndex],
      state: states[cityIndex],
      phone: `(11) 9${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      hours: Math.random() > 0.5 ? '08:00 - 22:00' : '08:00 - 18:00',
      rating: Math.round((3 + Math.random() * 2) * 10) / 10, // 3.0 to 5.0
      distance: Math.round(Math.random() * 20 * 10) / 10, // 0 to 20km
      openNow: Math.random() > 0.3,
      hasParking: Math.random() > 0.4,
      wheelchair: Math.random() > 0.6,
      driveThru: Math.random() > 0.8,
      image: `https://via.placeholder.com/200x120/667eea/ffffff?text=Loja+${i}`,
      lat,
      lng,
      mapX: 20 + Math.random() * 60, // Random position on map
      mapY: 20 + Math.random() * 60
    })
  }

  stores.value = mockStores.sort((a, b) => a.distance - b.distance)
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

.interactive-map {
  height: 400px;
  background: #e2e8f0;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
}

.map-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #718096;
}

.map-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.map-controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.map-control {
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.store-marker,
.user-marker {
  position: absolute;
  cursor: pointer;
  z-index: 10;
}

.marker-icon,
.user-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
}

.store-marker.selected .marker-icon {
  background: #ffd700;
  transform: translate(-50%, -50%) scale(1.2);
}

.marker-tooltip,
.user-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  white-space: nowrap;
  margin-bottom: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.store-marker:hover .marker-tooltip,
.user-marker:hover .user-tooltip {
  opacity: 1;
}

.map-filters h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.filter-group {
  margin-bottom: 1rem;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #4a5568;
}

.distance-filter {
  margin-top: 1rem;
}

.distance-filter label {
  display: block;
  font-size: 0.9rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
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
  display: flex;
  gap: 1rem;
}

.store-card:hover,
.store-card.selected {
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.store-image {
  width: 120px;
  height: 120px;
  position: relative;
  flex-shrink: 0;
}

.store-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.open-badge,
.closed-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.7rem;
  font-weight: 600;
}

.open-badge {
  background: #48bb78;
  color: white;
}

.closed-badge {
  background: #e53e3e;
  color: white;
}

.store-info {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.store-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.store-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
}

.store-rating {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
}

.rating-number {
  color: #718096;
}

.store-address {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #4a5568;
  font-size: 0.9rem;
}

.store-details {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.8rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #718096;
}

.store-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.feature-tag {
  background: #edf2f7;
  color: #4a5568;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.7rem;
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

  .store-card {
    flex-direction: column;
  }

  .store-image {
    width: 100%;
    height: 150px;
  }

  .store-actions {
    flex-wrap: wrap;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>