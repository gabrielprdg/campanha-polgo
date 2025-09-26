<template>
  <section id="home" class="hero-section">
    <div class="hero-background">
      <div class="hero-overlay"></div>
    </div>
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">
          Promoção Especial
          <span class="highlight">Imperdível!</span>
        </h1>
        <p class="hero-subtitle">
          Descubra as melhores ofertas da temporada com descontos de até 70% em produtos selecionados.
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="scrollToPromotions">
            Ver Ofertas
          </button>
          <button class="btn-secondary" @click="scrollToAbout">
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToPromotions = () => {
  document.querySelector('#promotions')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToAbout = () => {
  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  animation: fadeInUp 1s ease-out;
}

.highlight {
  display: block;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.6s both;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background: #ffd700;
  color: #1a202c;
}

.btn-primary:hover {
  background: #ffed4e;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #1a202c;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
}
</style>