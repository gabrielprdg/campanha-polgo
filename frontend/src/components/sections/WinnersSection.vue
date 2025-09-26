<template>
  <section id="winners" class="winners-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Ganhadores</h2>
        <p class="section-subtitle">Conheça quem já foi premiado em nossa promoção</p>
      </div>

      <div class="winners-overview">
        <div class="overview-stats">
          <div class="stat-card">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <span class="stat-number">{{ totalWinners.toLocaleString() }}</span>
              <span class="stat-label">Ganhadores</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
              <span class="stat-number">R$ {{ totalPrizeValue.toLocaleString() }}</span>
              <span class="stat-label">Distribuídos</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📍</div>
            <div class="stat-content">
              <span class="stat-number">{{ totalStates }}</span>
              <span class="stat-label">Estados</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎁</div>
            <div class="stat-content">
              <span class="stat-number">{{ todayWinners }}</span>
              <span class="stat-label">Hoje</span>
            </div>
          </div>
        </div>
      </div>

      <div class="winners-content">
        <div class="map-section">
          <h3 class="map-title">🗺️ Ganhadores por Estado</h3>
          <div class="brazil-map-container">
            <div class="brazil-map">
              <div
                v-for="state in brazilStates"
                :key="state.code"
                :class="['state', `state-${state.code.toLowerCase()}`]"
                :style="{
                  fill: getStateColor(state.winners),
                  opacity: state.winners > 0 ? 1 : 0.3
                }"
                @mouseover="highlightState(state)"
                @mouseleave="unhighlightState()"
                @click="selectState(state)"
              >
                <title>{{ state.name }}: {{ state.winners }} ganhadores</title>
              </div>
            </div>
            <div class="map-legend">
              <h4>Legenda</h4>
              <div class="legend-items">
                <div class="legend-item">
                  <div class="legend-color" style="background: #48bb78"></div>
                  <span>100+ ganhadores</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background: #ffd700"></div>
                  <span>50-99 ganhadores</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background: #ed8936"></div>
                  <span>10-49 ganhadores</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background: #e53e3e"></div>
                  <span>1-9 ganhadores</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background: #a0aec0"></div>
                  <span>Nenhum ganhador</span>
                </div>
              </div>
            </div>
            <div v-if="hoveredState" class="state-tooltip">
              <h4>{{ hoveredState.name }}</h4>
              <p>{{ hoveredState.winners }} ganhadores</p>
              <p>R$ {{ hoveredState.totalValue.toLocaleString() }} em prêmios</p>
            </div>
          </div>
        </div>

        <div class="winners-list-section">
          <div class="list-header">
            <h3>📋 Lista de Ganhadores</h3>
            <div class="list-filters">
              <select v-model="selectedState" class="filter-select">
                <option value="">Todos os Estados</option>
                <option v-for="state in brazilStates" :key="state.code" :value="state.code">
                  {{ state.name }}
                </option>
              </select>
              <select v-model="selectedPrizeType" class="filter-select">
                <option value="">Todos os Prêmios</option>
                <option value="cash">Dinheiro</option>
                <option value="electronics">Eletrônicos</option>
                <option value="vehicle">Veículos</option>
                <option value="appliance">Eletrodomésticos</option>
              </select>
              <input
                v-model="searchWinner"
                type="text"
                placeholder="Buscar por nome..."
                class="search-winner"
              />
            </div>
          </div>

          <div class="winners-table">
            <div class="table-header">
              <div class="header-cell">Ganhador</div>
              <div class="header-cell">Prêmio</div>
              <div class="header-cell">Valor</div>
              <div class="header-cell">Estado</div>
              <div class="header-cell">Data</div>
            </div>
            <div class="table-body">
              <div
                v-for="winner in paginatedWinners"
                :key="winner.id"
                class="table-row"
              >
                <div class="cell winner-info">
                  <div class="winner-avatar">
                    {{ winner.name.charAt(0).toUpperCase() }}
                  </div>
                  <div class="winner-details">
                    <span class="winner-name">{{ formatWinnerName(winner.name) }}</span>
                    <span class="winner-city">{{ winner.city }}</span>
                  </div>
                </div>
                <div class="cell prize-info">
                  <span class="prize-name">{{ winner.prize }}</span>
                  <span class="prize-type">{{ getPrizeTypeLabel(winner.prizeType) }}</span>
                </div>
                <div class="cell prize-value">
                  R$ {{ winner.value.toLocaleString() }}
                </div>
                <div class="cell winner-state">
                  {{ winner.state }}
                </div>
                <div class="cell winner-date">
                  {{ formatDate(winner.date) }}
                </div>
              </div>
            </div>
          </div>

          <div class="pagination">
            <button
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
              class="pagination-btn"
            >
              ← Anterior
            </button>
            <span class="pagination-info">
              Página {{ currentPage }} de {{ totalPages }}
              ({{ filteredWinners.length }} ganhadores)
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

      <div class="recent-winners">
        <h3>🔥 Últimos Ganhadores</h3>
        <div class="recent-grid">
          <div v-for="recent in recentWinners" :key="recent.id" class="recent-card">
            <div class="recent-avatar">{{ recent.name.charAt(0) }}</div>
            <div class="recent-info">
              <h4>{{ formatWinnerName(recent.name) }}</h4>
              <p class="recent-prize">{{ recent.prize }}</p>
              <p class="recent-value">R$ {{ recent.value.toLocaleString() }}</p>
              <p class="recent-location">{{ recent.city }} - {{ recent.state }}</p>
              <span class="recent-time">{{ getTimeAgo(recent.date) }}</span>
            </div>
            <div class="recent-celebration">🎉</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Winner {
  id: number
  name: string
  city: string
  state: string
  prize: string
  prizeType: string
  value: number
  date: Date
}

interface BrazilState {
  code: string
  name: string
  winners: number
  totalValue: number
}

const selectedState = ref('')
const selectedPrizeType = ref('')
const searchWinner = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const hoveredState = ref<BrazilState | null>(null)

// Mock data - in real app this would come from API
const winners = ref<Winner[]>([])
const brazilStates = ref<BrazilState[]>([
  { code: 'SP', name: 'São Paulo', winners: 245, totalValue: 850000 },
  { code: 'RJ', name: 'Rio de Janeiro', winners: 180, totalValue: 620000 },
  { code: 'MG', name: 'Minas Gerais', winners: 156, totalValue: 520000 },
  { code: 'RS', name: 'Rio Grande do Sul', winners: 134, totalValue: 450000 },
  { code: 'PR', name: 'Paraná', winners: 112, totalValue: 380000 },
  { code: 'SC', name: 'Santa Catarina', winners: 98, totalValue: 330000 },
  { code: 'BA', name: 'Bahia', winners: 87, totalValue: 290000 },
  { code: 'GO', name: 'Goiás', winners: 76, totalValue: 260000 },
  { code: 'PE', name: 'Pernambuco', winners: 65, totalValue: 220000 },
  { code: 'CE', name: 'Ceará', winners: 54, totalValue: 180000 },
  { code: 'DF', name: 'Distrito Federal', winners: 43, totalValue: 150000 },
  { code: 'ES', name: 'Espírito Santo', winners: 32, totalValue: 110000 },
  { code: 'PB', name: 'Paraíba', winners: 21, totalValue: 70000 },
  { code: 'RN', name: 'Rio Grande do Norte', winners: 18, totalValue: 60000 },
  { code: 'AL', name: 'Alagoas', winners: 15, totalValue: 50000 },
  { code: 'SE', name: 'Sergipe', winners: 12, totalValue: 40000 },
  { code: 'PI', name: 'Piauí', winners: 9, totalValue: 30000 },
  { code: 'TO', name: 'Tocantins', winners: 8, totalValue: 25000 },
  { code: 'MA', name: 'Maranhão', winners: 7, totalValue: 22000 },
  { code: 'MT', name: 'Mato Grosso', winners: 6, totalValue: 20000 },
  { code: 'MS', name: 'Mato Grosso do Sul', winners: 5, totalValue: 18000 },
  { code: 'RO', name: 'Rondônia', winners: 4, totalValue: 15000 },
  { code: 'AC', name: 'Acre', winners: 3, totalValue: 12000 },
  { code: 'AP', name: 'Amapá', winners: 2, totalValue: 8000 },
  { code: 'RR', name: 'Roraima', winners: 1, totalValue: 5000 },
  { code: 'AM', name: 'Amazonas', winners: 25, totalValue: 85000 },
  { code: 'PA', name: 'Pará', winners: 19, totalValue: 65000 }
])

const totalWinners = computed(() => brazilStates.value.reduce((sum, state) => sum + state.winners, 0))
const totalPrizeValue = computed(() => brazilStates.value.reduce((sum, state) => sum + state.totalValue, 0))
const totalStates = computed(() => brazilStates.value.filter(state => state.winners > 0).length)
const todayWinners = ref(12)

const filteredWinners = computed(() => {
  let filtered = winners.value

  if (selectedState.value) {
    filtered = filtered.filter(winner => winner.state === selectedState.value)
  }

  if (selectedPrizeType.value) {
    filtered = filtered.filter(winner => winner.prizeType === selectedPrizeType.value)
  }

  if (searchWinner.value) {
    const search = searchWinner.value.toLowerCase()
    filtered = filtered.filter(winner =>
      winner.name.toLowerCase().includes(search) ||
      winner.city.toLowerCase().includes(search)
    )
  }

  return filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
})

const totalPages = computed(() => Math.ceil(filteredWinners.value.length / itemsPerPage))

const paginatedWinners = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredWinners.value.slice(start, end)
})

const recentWinners = computed(() => winners.value.slice(0, 6))

const getStateColor = (winnersCount: number) => {
  if (winnersCount === 0) return '#a0aec0'
  if (winnersCount >= 100) return '#48bb78'
  if (winnersCount >= 50) return '#ffd700'
  if (winnersCount >= 10) return '#ed8936'
  return '#e53e3e'
}

const formatWinnerName = (name: string) => {
  const parts = name.split(' ')
  if (parts.length <= 2) return name
  return `${parts[0]} ${parts[1][0]}.`
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('pt-BR')
}

const getTimeAgo = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d atrás`
  if (hours > 0) return `${hours}h atrás`
  return 'Agora'
}

const getPrizeTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    cash: 'Dinheiro',
    electronics: 'Eletrônicos',
    vehicle: 'Veículo',
    appliance: 'Eletrodoméstico'
  }
  return labels[type] || type
}

const highlightState = (state: BrazilState) => {
  hoveredState.value = state
}

const unhighlightState = () => {
  hoveredState.value = null
}

const selectState = (state: BrazilState) => {
  selectedState.value = state.code
  currentPage.value = 1
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Generate mock winners data
onMounted(() => {
  const names = [
    'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza',
    'Juliana Lima', 'Fernando Alves', 'Patrícia Mendes', 'Roberto Ferreira', 'Luciana Rocha',
    'Eduardo Santos', 'Camila Araújo', 'Rafael Cardoso', 'Débora Machado', 'Gustavo Barbosa'
  ]

  const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Curitiba']
  const prizes = ['iPhone 15 Pro', 'PlayStation 5', 'R$ 10.000', 'Smart TV 65"', 'Honda Civic']
  const prizeTypes = ['electronics', 'electronics', 'cash', 'appliance', 'vehicle']
  const values = [8999, 4999, 10000, 3999, 120000]

  const mockWinners: Winner[] = []
  for (let i = 1; i <= 150; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)]
    const randomCity = cities[Math.floor(Math.random() * cities.length)]
    const randomState = brazilStates.value[Math.floor(Math.random() * brazilStates.value.length)].code
    const prizeIndex = Math.floor(Math.random() * prizes.length)

    mockWinners.push({
      id: i,
      name: randomName,
      city: randomCity,
      state: randomState,
      prize: prizes[prizeIndex],
      prizeType: prizeTypes[prizeIndex],
      value: values[prizeIndex],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Last 30 days
    })
  }

  winners.value = mockWinners
})
</script>

<style scoped>
.winners-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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

.winners-overview {
  margin-bottom: 4rem;
}

.overview-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
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

.winners-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.map-section,
.winners-list-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.map-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.brazil-map-container {
  position: relative;
}

.brazil-map {
  width: 100%;
  height: 400px;
  background: #f7fafc;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Simplified Brazil map representation */
.brazil-map::before {
  content: '🇧🇷';
  font-size: 15rem;
  opacity: 0.1;
  position: absolute;
}

.state {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid white;
}

.state:hover {
  transform: scale(1.2);
  z-index: 10;
}

/* Simplified state positioning - in real app would use proper SVG map */
.state-sp { top: 60%; left: 45%; }
.state-rj { top: 65%; left: 50%; }
.state-mg { top: 55%; left: 40%; }
.state-rs { top: 80%; left: 35%; }
.state-pr { top: 70%; left: 35%; }
.state-sc { top: 75%; left: 40%; }
.state-ba { top: 45%; left: 50%; }
.state-go { top: 50%; left: 35%; }

.map-legend {
  margin-top: 1rem;
}

.map-legend h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: #4a5568;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.state-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  pointer-events: none;
  z-index: 100;
  top: 10px;
  right: 10px;
}

.list-header {
  margin-bottom: 1.5rem;
}

.list-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.list-filters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.filter-select,
.search-winner {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-family: 'Poppins', sans-serif;
}

.winners-table {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
}

.header-cell {
  padding: 1rem;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  border-bottom: 1px solid #f1f5f9;
}

.table-row:hover {
  background: #f8fafc;
}

.cell {
  padding: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.winner-info {
  gap: 0.5rem;
}

.winner-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.winner-details {
  display: flex;
  flex-direction: column;
}

.winner-name {
  font-weight: 600;
  color: #2d3748;
}

.winner-city {
  font-size: 0.8rem;
  color: #718096;
}

.prize-info {
  flex-direction: column;
  align-items: flex-start;
}

.prize-name {
  font-weight: 500;
  color: #2d3748;
}

.prize-type {
  font-size: 0.8rem;
  color: #718096;
}

.prize-value {
  font-weight: 600;
  color: #48bb78;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
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

.recent-winners {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.recent-winners h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.recent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (min-width: 1280px) {
  .recent-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
}

@media (min-width: 1920px) {
  .recent-grid {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2.5rem;
  }
}

.recent-card {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  transition: transform 0.3s ease;
}

.recent-card:hover {
  transform: translateY(-2px);
}

.recent-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.recent-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.2rem;
}

.recent-prize {
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.2rem;
}

.recent-value {
  font-weight: 600;
  color: #48bb78;
  margin-bottom: 0.2rem;
}

.recent-location {
  font-size: 0.8rem;
  color: #718096;
  margin-bottom: 0.2rem;
}

.recent-time {
  font-size: 0.8rem;
  color: #ed8936;
  font-weight: 500;
}

.recent-celebration {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }

  .overview-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .winners-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .list-filters {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }

  .header-cell,
  .cell {
    padding: 0.5rem;
  }

  .cell {
    border-bottom: 1px solid #f1f5f9;
  }

  .recent-grid {
    grid-template-columns: 1fr;
  }
}
</style>