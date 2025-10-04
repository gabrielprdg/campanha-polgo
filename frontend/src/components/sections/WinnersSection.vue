<template>
  <section id="winners" class="winners-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Mapa de Ganhadores</h2>
        <p class="section-subtitle">Veja onde estão os ganhadores da nossa promoção</p>
      </div>

      <div class="winners-content">
        <div class="winners-map-section">
          <div class="map-container">
            <div id="winners-map" class="leaflet-map"></div>
          </div>

          <div class="map-filters">
            <h4>Filtros</h4>
            <div class="state-filter">
              <label>Estado</label>
              <select v-model="selectedState" @change="applyFilters" class="state-select">
                <option value="">Todos os estados</option>
                <option v-for="state in uniqueStates" :key="state" :value="state">
                  {{ state }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="winners-list-section">
          <div class="list-header">
            <h3>{{ totalWinners }} ganhadores{{ selectedState ? ` em ${selectedState}` : '' }}</h3>
            <div class="sort-controls">
              <select v-model="sortBy" @change="sortWinners" class="sort-select">
                <option value="date">Mais recentes</option>
                <option value="name">Nome (A-Z)</option>
                <option value="city">Cidade (A-Z)</option>
              </select>
            </div>
          </div>

          <div class="winners-list">
            <div
              v-for="winner in paginatedWinners"
              :key="winner.id"
              :class="['winner-card', { selected: selectedWinner?.id === winner.id }]"
              @click="selectWinner(winner)"
            >
              <div class="winner-info">
                <div class="winner-header">
                  <h4 class="winner-name">{{ winner.name }}</h4>
                  <div class="winner-location-badge">
                    {{ winner.city }} - {{ winner.state }}
                  </div>
                </div>

                <div class="winner-details">
                  <div class="detail-item">
                    <span class="detail-icon">🏆</span>
                    <span>{{ winner.prize }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">📅</span>
                    <span>{{ formatDate(winner.date) }}</span>
                  </div>
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

      <div class="winner-stats">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <span class="stat-number">{{ totalWinners }}</span>
              <span class="stat-label">Ganhadores</span>
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
import { winnerService } from '@/services/winnerService'
import { geocodingService } from '@/services/geocodingService'
import type { Winner } from '@/types/winner'

interface WinnerDisplay extends Winner {
  lat: number
  lng: number
}

const selectedState = ref('')
const selectedWinner = ref<WinnerDisplay | null>(null)
const currentPage = ref(1)
const itemsPerPage = 10
const sortBy = ref('date')
const totalWinnersCount = ref(0)
const totalPagesCount = ref(0)

const winners = ref<WinnerDisplay[]>([])
const allWinnersForMap = ref<WinnerDisplay[]>([]) // For map display (no pagination)
let map: L.Map | null = null
let markersLayer: L.LayerGroup | null = null

const filteredWinnersForMap = computed(() => {
  let filtered = allWinnersForMap.value

  // Apply state filter for map
  if (selectedState.value) {
    filtered = filtered.filter(winner => winner.state === selectedState.value)
  }

  return filtered
})

const sortedWinners = computed(() => {
  const sorted = [...winners.value]

  switch (sortBy.value) {
    case 'date':
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'city':
      return sorted.sort((a, b) => a.city.localeCompare(b.city))
    default:
      return sorted
  }
})

const paginatedWinners = computed(() => sortedWinners.value)

const totalPages = computed(() => totalPagesCount.value)

const totalWinners = computed(() => totalWinnersCount.value)
const totalCities = computed(() => new Set(allWinnersForMap.value.map(w => w.city)).size)
const totalStates = computed(() => new Set(allWinnersForMap.value.map(w => w.state)).size)
const uniqueStates = computed(() => {
  return Array.from(new Set(allWinnersForMap.value.map(w => w.state))).sort()
})

// Initialize Leaflet map
const initMap = () => {
  if (map) return

  // Create map centered on Brazil
  map = L.map('winners-map').setView([-15.7801, -47.9292], 4)

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

  // Group winners by location to show multiple winners at same location
  const winnersByLocation = new Map<string, WinnerDisplay[]>()

  filteredWinnersForMap.value.forEach(winner => {
    const key = `${winner.lat},${winner.lng}`
    if (!winnersByLocation.has(key)) {
      winnersByLocation.set(key, [])
    }
    winnersByLocation.get(key)!.push(winner)
  })

  // Add markers for each location
  winnersByLocation.forEach((locationWinners, location) => {
    const [lat, lng] = location.split(',').map(Number)
    const count = locationWinners.length

    const marker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: 'custom-winner-marker',
        html: `<div class="marker-pin winner">🏆${count > 1 ? `<span class="marker-count">${count}</span>` : ''}</div>`,
        iconSize: [50, 50],
        iconAnchor: [25, 25]
      })
    })

    // Create popup content with all winners at this location
    const popupContent = `
      <div class="marker-popup">
        <h4>${locationWinners[0].city} - ${locationWinners[0].state}</h4>
        <div class="winners-list-popup">
          ${locationWinners.map(w => `
            <div class="winner-item-popup">
              <strong>${w.name}</strong>
              <p>${w.prize}</p>
              <small>${new Date(w.date).toLocaleDateString('pt-BR')}</small>
            </div>
          `).join('')}
        </div>
      </div>
    `

    marker.bindPopup(popupContent, {
      maxWidth: 300,
      className: 'winner-popup'
    })

    marker.on('click', () => {
      if (locationWinners.length === 1) {
        selectWinner(locationWinners[0])
      }
    })

    marker.addTo(markersLayer!)
  })
}

const selectWinner = (winner: WinnerDisplay) => {
  selectedWinner.value = winner

  // Center map on selected winner
  if (map && winner.lat && winner.lng) {
    map.setView([winner.lat, winner.lng], 8)
  }
}

const applyFilters = () => {
  currentPage.value = 1
  loadWinners()
}

const sortWinners = () => {
  // Sorting is done client-side on the current page
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadWinners()
  }
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Convert API winner to display winner
const convertApiWinnerToDisplay = async (apiWinner: Winner): Promise<WinnerDisplay> => {
  // Use geocoding service to get coordinates
  const coords = await geocodingService.geocode(apiWinner.city, apiWinner.state)

  return {
    ...apiWinner,
    lat: coords?.lat || -15.7801, // Default to Brazil center if not found
    lng: coords?.lng || -47.9292
  }
}

// Load all winners for the map (no pagination)
const loadAllWinnersForMap = async () => {
  try {
    const apiWinners = await winnerService.getAll()

    // Convert winners with geocoding (async)
    const winnerPromises = apiWinners.map(winner => convertApiWinnerToDisplay(winner))
    allWinnersForMap.value = await Promise.all(winnerPromises)

    // Update map markers after loading winners
    updateMapMarkers()
  } catch (error) {
    console.error('Erro ao carregar ganhadores para o mapa:', error)
  }
}

// Load winners from API with pagination
const loadWinners = async () => {
  try {
    const response = await winnerService.getPaginated({
      page: currentPage.value,
      limit: itemsPerPage,
      state: selectedState.value || undefined
    })

    // Convert winners with geocoding (async)
    const winnerPromises = response.winners.map(winner => convertApiWinnerToDisplay(winner))
    winners.value = await Promise.all(winnerPromises)

    // Update pagination info
    totalWinnersCount.value = response.pagination.total
    totalPagesCount.value = response.pagination.totalPages
  } catch (error) {
    console.error('Erro ao carregar ganhadores:', error)
  }
}

// Watch for filter changes and update markers
watch([() => filteredWinnersForMap.value, selectedState], () => {
  updateMapMarkers()
})

onMounted(() => {
  initMap()
  loadWinners()
  loadAllWinnersForMap()
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
.winners-section {
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

.winners-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.winners-map-section,
.winners-list-section {
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

/* Custom winner marker styles */
:deep(.custom-winner-marker) {
  background: none;
  border: none;
}

:deep(.marker-pin.winner) {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.5);
  transition: transform 0.2s ease;
  position: relative;
}

:deep(.marker-pin.winner:hover) {
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.7);
}

:deep(.marker-pin.winner .marker-count) {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e53e3e;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  border: 2px solid white;
}

/* Popup styles */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 0.5rem;
  padding: 0;
}

:deep(.marker-popup) {
  padding: 0.75rem;
  min-width: 200px;
}

:deep(.marker-popup h4) {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  border-bottom: 2px solid #ffd700;
  padding-bottom: 0.5rem;
}

:deep(.winners-list-popup) {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
}

:deep(.winner-item-popup) {
  padding: 0.5rem;
  background: #f7fafc;
  border-radius: 0.25rem;
  border-left: 3px solid #ffd700;
}

:deep(.winner-item-popup strong) {
  display: block;
  color: #2d3748;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

:deep(.winner-item-popup p) {
  margin: 0.25rem 0;
  font-size: 0.875rem;
  color: #4a5568;
}

:deep(.winner-item-popup small) {
  display: block;
  color: #718096;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.map-filters h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.state-filter label {
  display: block;
  font-size: 0.95rem;
  color: #4a5568;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.state-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: white;
  font-family: 'Poppins', sans-serif;
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

.winners-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.winner-card {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.winner-card:hover,
.winner-card.selected {
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
  transform: translateY(-2px);
}

.winner-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.winner-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.winner-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  flex: 1;
}

.winner-location-badge {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #333;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
}

.winner-details {
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
  border-color: #ffd700;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.9rem;
  color: #718096;
}

.winner-stats {
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

  .winners-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .leaflet-map {
    height: 400px;
  }

  .winner-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .winner-location-badge {
    align-self: flex-start;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
