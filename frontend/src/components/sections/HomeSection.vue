<template>
  <section id="home" class="home-section">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Ganhe <span class="highlight">Prêmios Incríveis</span><br>
            na Nossa Promoção
          </h1>
          <p class="hero-description">
            Participe da nossa campanha promocional e concorra a prêmios fantásticos!
            É fácil, rápido e você pode ganhar todos os dias.
          </p>
          <div class="hero-actions">
            <button class="btn-primary large">Participar Agora</button>
            <button class="btn-secondary large">Ver Prêmios</button>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">50K+</span>
              <span class="stat-label">Participantes</span>
            </div>
            <div class="stat">
              <span class="stat-number">R$ 1M+</span>
              <span class="stat-label">em Prêmios</span>
            </div>
            <div class="stat">
              <span class="stat-number">1000+</span>
              <span class="stat-label">Ganhadores</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-card">
            <div class="card-content">
              <h3>🎁 Próximo Sorteio</h3>
              <p class="countdown">{{ countdown }}</p>
              <div class="prize-preview">
                <span>iPhone 15 Pro</span>
                <span class="prize-value">R$ 8.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-indicator">
      <span>Role para descobrir mais</span>
      <div class="scroll-arrow">↓</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const countdown = ref('00:00:00')
let interval: number

const updateCountdown = () => {
  const nextDraw = new Date()
  nextDraw.setDate(nextDraw.getDate() + 1)
  nextDraw.setHours(20, 0, 0, 0) // 8 PM tomorrow

  const now = new Date().getTime()
  const distance = nextDraw.getTime() - now

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  countdown.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

onMounted(() => {
  updateCountdown()
  interval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
.home-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.home-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.container {
  width: 100%;
  max-width: 2200px;
  margin: 0 auto;
  padding: 0 4rem;
  position: relative;
  z-index: 1;
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

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 2rem 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.highlight {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn-primary, .btn-secondary {
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: 'Poppins', sans-serif;
}

.btn-primary {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #333;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.hero-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #ffd700;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.floating-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  animation: floatCard 6s ease-in-out infinite;
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

.card-content h3 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.countdown {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffd700;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.prize-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: white;
}

.prize-value {
  font-weight: 700;
  color: #ffd700;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.scroll-arrow {
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Tablet breakpoint */
@media (max-width: 1023px) and (min-width: 769px) {
  .hero-content {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .hero-title {
    font-size: 3rem;
  }

  .hero-stats {
    gap: 1.5rem;
  }
}

/* Large desktop optimizations */
@media (min-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    padding: 3rem 0;
  }

  .hero-title {
    font-size: 4rem;
  }

  .hero-description {
    font-size: 1.3rem;
  }

  .hero-actions {
    gap: 1.5rem;
  }

  .hero-stats {
    gap: 3rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .floating-card {
    padding: 2.5rem;
  }

  .countdown {
    font-size: 3rem;
  }
}

@media (min-width: 1280px) {
  .hero-content {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
  }

  .hero-title {
    font-size: 4.5rem;
  }

  .hero-stats {
    gap: 4rem;
  }
}

@media (min-width: 1920px) {
  .hero-content {
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    padding: 4rem 0;
  }

  .hero-title {
    font-size: 5rem;
  }

  .hero-description {
    font-size: 1.4rem;
  }

  .hero-stats {
    gap: 5rem;
  }

  .stat-number {
    font-size: 3rem;
  }

  .floating-card {
    padding: 3rem;
  }
}

/* Mobile breakpoint */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .floating-card {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>