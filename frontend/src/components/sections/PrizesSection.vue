<template>
  <section id="prizes" class="prizes-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Prêmios Incríveis</h2>
        <p class="section-subtitle">Mais de R$ 1 milhão em prêmios esperando por você</p>
      </div>

      <div class="prize-categories">
        <div class="category-tabs">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="['tab-button', { active: activeCategory === category.id }]"
            @click="activeCategory = category.id"
          >
            {{ category.name }}
            <span class="tab-count">{{ category.prizes.length }}</span>
          </button>
        </div>

        <div class="prizes-grid">
          <div
            v-for="prize in activePrizes"
            :key="prize.id"
            class="prize-card"
            :class="{ featured: prize.featured }"
            @click="selectPrize(prize)"
          >
            <div class="prize-badge" v-if="prize.featured">
              ⭐ Destaque
            </div>
            <div class="prize-image">
              <img :src="prize.image" :alt="prize.name" />
            </div>
            <div class="prize-content">
              <h3 class="prize-name">{{ prize.name }}</h3>
              <p class="prize-description">{{ prize.description }}</p>
              <div class="prize-details">
                <div class="prize-value">{{ prize.value }}</div>
                <div class="prize-frequency">{{ prize.frequency }}</div>
              </div>
              <div class="prize-chances" v-if="prize.odds">
                <span class="chances-label">Chances:</span>
                <span class="chances-value">{{ prize.odds }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="instant-prizes">
        <div class="instant-header">
          <h3>🎯 Prêmios Instantâneos</h3>
          <p>Ganhe na hora ao cadastrar sua nota!</p>
        </div>
        <div class="instant-grid">
          <div v-for="instant in instantPrizes" :key="instant.id" class="instant-card">
            <div class="instant-icon">{{ instant.icon }}</div>
            <div class="instant-info">
              <h4>{{ instant.name }}</h4>
              <p>{{ instant.description }}</p>
              <span class="instant-chance">{{ instant.chance }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="total-prizes">
        <div class="total-content">
          <div class="total-stats">
            <div class="stat">
              <span class="stat-number">R$ 1.2M</span>
              <span class="stat-label">Valor Total</span>
            </div>
            <div class="stat">
              <span class="stat-number">5.000+</span>
              <span class="stat-label">Prêmios</span>
            </div>
            <div class="stat">
              <span class="stat-number">365</span>
              <span class="stat-label">Dias de Sorteio</span>
            </div>
          </div>
          <div class="total-cta">
            <h3>Não perca tempo!</h3>
            <p>Quanto mais você participa, maiores suas chances de ganhar</p>
            <button class="btn-primary">Ver Todas as Regras</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Prize Details Modal -->
    <div v-if="selectedPrize" class="modal-overlay" @click="closePrizeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closePrizeModal">×</button>
        <div class="modal-image">
          <img :src="selectedPrize.image" :alt="selectedPrize.name" />
        </div>
        <div class="modal-details">
          <h3>{{ selectedPrize.name }}</h3>
          <p class="modal-description">{{ selectedPrize.description }}</p>
          <div class="modal-specs" v-if="selectedPrize.specs">
            <h4>Especificações:</h4>
            <ul>
              <li v-for="spec in selectedPrize.specs" :key="spec">{{ spec }}</li>
            </ul>
          </div>
          <div class="modal-value">
            <span class="value-label">Valor:</span>
            <span class="value-amount">{{ selectedPrize.value }}</span>
          </div>
          <div class="modal-frequency">
            <span class="freq-label">Frequência:</span>
            <span class="freq-value">{{ selectedPrize.frequency }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Prize {
  id: number
  name: string
  description: string
  value: string
  frequency: string
  image: string
  featured?: boolean
  odds?: string
  specs?: string[]
}

interface Category {
  id: string
  name: string
  prizes: Prize[]
}

const activeCategory = ref('eletrônicos')
const selectedPrize = ref<Prize | null>(null)

const categories = ref<Category[]>([
  {
    id: 'eletrônicos',
    name: 'Eletrônicos',
    prizes: [
      {
        id: 1,
        name: 'iPhone 15 Pro Max',
        description: 'O smartphone mais avançado da Apple com tecnologia de ponta',
        value: 'R$ 8.999',
        frequency: 'Semanal',
        image: 'https://via.placeholder.com/300x200/667eea/ffffff?text=iPhone+15+Pro',
        featured: true,
        odds: '1 em 50.000',
        specs: ['128GB de armazenamento', 'Camera 48MP', 'Tela Super Retina XDR', 'Chip A17 Pro']
      },
      {
        id: 2,
        name: 'PlayStation 5',
        description: 'Console de videogame de última geração',
        value: 'R$ 4.999',
        frequency: 'Quinzenal',
        image: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=PlayStation+5',
        odds: '1 em 25.000',
        specs: ['SSD 825GB', 'Controle DualSense', '4K Gaming', 'Ray Tracing']
      },
      {
        id: 3,
        name: 'MacBook Air M2',
        description: 'Notebook Apple ultra-portátil com chip M2',
        value: 'R$ 12.999',
        frequency: 'Mensal',
        image: 'https://via.placeholder.com/300x200/48bb78/ffffff?text=MacBook+Air',
        featured: true,
        odds: '1 em 100.000'
      }
    ]
  },
  {
    id: 'carros',
    name: 'Veículos',
    prizes: [
      {
        id: 4,
        name: 'Honda Civic 2024',
        description: 'Sedan executivo completo zero quilômetro',
        value: 'R$ 120.000',
        frequency: 'Trimestral',
        image: 'https://via.placeholder.com/300x200/ed8936/ffffff?text=Honda+Civic',
        featured: true,
        odds: '1 em 500.000'
      },
      {
        id: 5,
        name: 'Motocicleta Honda CB 600F',
        description: 'Moto esportiva para aventuras inesquecíveis',
        value: 'R$ 35.000',
        frequency: 'Bimestral',
        image: 'https://via.placeholder.com/300x200/e53e3e/ffffff?text=Honda+CB',
        odds: '1 em 200.000'
      }
    ]
  },
  {
    id: 'casa',
    name: 'Casa & Eletro',
    prizes: [
      {
        id: 6,
        name: 'Smart TV 65" 4K',
        description: 'Televisor inteligente com qualidade 4K',
        value: 'R$ 3.999',
        frequency: 'Semanal',
        image: 'https://via.placeholder.com/300x200/38b2ac/ffffff?text=Smart+TV',
        odds: '1 em 15.000'
      },
      {
        id: 7,
        name: 'Geladeira Frost Free',
        description: 'Refrigerador duplex com tecnologia inverter',
        value: 'R$ 2.599',
        frequency: 'Semanal',
        image: 'https://via.placeholder.com/300x200/805ad5/ffffff?text=Geladeira',
        odds: '1 em 12.000'
      }
    ]
  },
  {
    id: 'dinheiro',
    name: 'Prêmios em Dinheiro',
    prizes: [
      {
        id: 8,
        name: 'R$ 50.000',
        description: 'Cinquenta mil reais para realizar seus sonhos',
        value: 'R$ 50.000',
        frequency: 'Mensal',
        image: 'https://via.placeholder.com/300x200/ffd700/333333?text=R%24+50.000',
        featured: true,
        odds: '1 em 250.000'
      },
      {
        id: 9,
        name: 'R$ 10.000',
        description: 'Dez mil reais para suas necessidades',
        value: 'R$ 10.000',
        frequency: 'Quinzenal',
        image: 'https://via.placeholder.com/300x200/ffed4e/333333?text=R%24+10.000',
        odds: '1 em 75.000'
      }
    ]
  }
])

const instantPrizes = ref([
  {
    id: 1,
    name: 'Desconto 50%',
    description: 'Desconto na próxima compra',
    chance: '1 em 100',
    icon: '🎫'
  },
  {
    id: 2,
    name: 'Frete Grátis',
    description: 'Frete grátis por 3 meses',
    chance: '1 em 200',
    icon: '🚚'
  },
  {
    id: 3,
    name: 'R$ 20 de Volta',
    description: 'Cashback direto na conta',
    chance: '1 em 500',
    icon: '💰'
  },
  {
    id: 4,
    name: 'Gift Card R$ 100',
    description: 'Vale-compras para usar online',
    chance: '1 em 1.000',
    icon: '🎁'
  }
])

const activePrizes = computed(() => {
  const category = categories.value.find(cat => cat.id === activeCategory.value)
  return category?.prizes || []
})

const selectPrize = (prize: Prize) => {
  selectedPrize.value = prize
}

const closePrizeModal = () => {
  selectedPrize.value = null
}
</script>

<style scoped>
.prizes-section {
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
  margin-bottom: 4rem;
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

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  background: white;
  color: #4a5568;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-button.active {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-color: transparent;
}

.tab-button:hover:not(.active) {
  border-color: #667eea;
  color: #667eea;
}

.tab-count {
  background: rgba(255, 255, 255, 0.3);
  color: inherit;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.8rem;
}

.tab-button:not(.active) .tab-count {
  background: #e2e8f0;
  color: #718096;
}

.prizes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

@media (min-width: 1280px) {
  .prizes-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2.5rem;
  }
}

@media (min-width: 1920px) {
  .prizes-grid {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 3rem;
  }
}

.prize-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.prize-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.prize-card.featured {
  border: 2px solid #ffd700;
}

.prize-card.featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ffd700, #ffed4e);
}

.prize-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ffd700;
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 1;
}

.prize-image {
  height: 200px;
  overflow: hidden;
}

.prize-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prize-content {
  padding: 1.5rem;
}

.prize-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.prize-description {
  color: #718096;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.prize-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.prize-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #48bb78;
}

.prize-frequency {
  background: #edf2f7;
  color: #4a5568;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.prize-chances {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.chances-label {
  color: #718096;
}

.chances-value {
  color: #e53e3e;
  font-weight: 600;
}

.instant-prizes {
  background: #f7fafc;
  padding: 3rem;
  border-radius: 1rem;
  margin-bottom: 4rem;
}

.instant-header {
  text-align: center;
  margin-bottom: 2rem;
}

.instant-header h3 {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.instant-header p {
  color: #718096;
  font-size: 1.1rem;
}

.instant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.instant-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.instant-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.instant-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.3rem;
}

.instant-info p {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.instant-chance {
  color: #48bb78;
  font-weight: 600;
  font-size: 0.9rem;
}

.total-prizes {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem;
  border-radius: 1rem;
  color: white;
}

.total-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.total-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffd700;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.total-cta h3 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.total-cta p {
  margin-bottom: 2rem;
  opacity: 0.9;
}

.btn-primary {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #333;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #718096;
  z-index: 1;
}

.modal-image {
  height: 250px;
  overflow: hidden;
  border-radius: 1rem 1rem 0 0;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-details {
  padding: 2rem;
}

.modal-details h3 {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.modal-description {
  color: #718096;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.modal-specs {
  margin-bottom: 1.5rem;
}

.modal-specs h4 {
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.modal-specs ul {
  list-style: none;
  padding: 0;
}

.modal-specs li {
  padding: 0.3rem 0;
  color: #4a5568;
  position: relative;
  padding-left: 1.5rem;
}

.modal-specs li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #48bb78;
  font-weight: bold;
}

.modal-value, .modal-frequency {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.value-amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: #48bb78;
}

.freq-value {
  color: #667eea;
  font-weight: 600;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }

  .category-tabs {
    gap: 0.5rem;
  }

  .tab-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .prizes-grid {
    grid-template-columns: 1fr;
  }

  .instant-grid {
    grid-template-columns: 1fr;
  }

  .total-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .total-stats {
    justify-content: center;
  }
}
</style>