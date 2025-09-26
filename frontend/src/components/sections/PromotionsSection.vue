<template>
  <section id="promotions" class="promotions-section">
    <div class="container">
      <div class="section-header">
        <h2>Ofertas Especiais</h2>
        <p>Aproveite nossos descontos exclusivos por tempo limitado</p>
      </div>
      <div class="promotions-grid">
        <div v-for="promotion in promotions" :key="promotion.id" class="promotion-card">
          <div class="promotion-badge">
            {{ promotion.discount }}% OFF
          </div>
          <div class="promotion-image">
            <span>{{ promotion.icon }}</span>
          </div>
          <div class="promotion-content">
            <h3>{{ promotion.title }}</h3>
            <p>{{ promotion.description }}</p>
            <div class="price-info">
              <span class="old-price">R$ {{ promotion.oldPrice }}</span>
              <span class="new-price">R$ {{ promotion.newPrice }}</span>
            </div>
            <button class="btn-promotion">
              Aproveitar Oferta
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Promotion {
  id: number
  title: string
  description: string
  discount: number
  oldPrice: string
  newPrice: string
  icon: string
}

const promotions = ref<Promotion[]>([
  {
    id: 1,
    title: 'Smartphone Premium',
    description: 'Último modelo com tecnologia avançada e design moderno',
    discount: 45,
    oldPrice: '1.999,90',
    newPrice: '1.099,90',
    icon: '📱'
  },
  {
    id: 2,
    title: 'Notebook Gamer',
    description: 'Performance excepcional para jogos e trabalho',
    discount: 35,
    oldPrice: '3.499,90',
    newPrice: '2.274,90',
    icon: '💻'
  },
  {
    id: 3,
    title: 'Headphone Bluetooth',
    description: 'Som de alta qualidade com cancelamento de ruído',
    discount: 60,
    oldPrice: '499,90',
    newPrice: '199,90',
    icon: '🎧'
  },
  {
    id: 4,
    title: 'Smart TV 55"',
    description: 'Qualidade 4K com streaming integrado',
    discount: 30,
    oldPrice: '2.799,90',
    newPrice: '1.959,90',
    icon: '📺'
  }
])
</script>

<style scoped>
.promotions-section {
  padding: 6rem 0;
  background: #1a202c;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.1rem;
  color: #a0aec0;
  max-width: 600px;
  margin: 0 auto;
}

.promotions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.promotion-card {
  background: white;
  color: #1a202c;
  border-radius: 1rem;
  padding: 1.5rem;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.promotion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.promotion-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #e53e3e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: bold;
  font-size: 0.875rem;
}

.promotion-image {
  text-align: center;
  margin-bottom: 1rem;
}

.promotion-image span {
  font-size: 3rem;
  display: block;
}

.promotion-content h3 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1a202c;
}

.promotion-content p {
  color: #4a5568;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.price-info {
  margin-bottom: 1.5rem;
}

.old-price {
  text-decoration: line-through;
  color: #a0aec0;
  margin-right: 0.5rem;
  font-size: 0.875rem;
}

.new-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e53e3e;
}

.btn-promotion {
  width: 100%;
  padding: 0.75rem;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-promotion:hover {
  background: #2b77cb;
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 2rem;
  }

  .promotions-grid {
    grid-template-columns: 1fr;
  }

  .promotion-card {
    padding: 1rem;
  }
}
</style>