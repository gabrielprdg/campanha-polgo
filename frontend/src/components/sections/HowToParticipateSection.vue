<template>
  <section id="how-to-participate" class="how-to-participate-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Como Participar</h2>
        <p class="section-subtitle">Siga estes passos simples e concorra a prêmios incríveis</p>
      </div>

      <div class="steps-container">
        <div class="step" v-for="(step, index) in steps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-icon">
            <component :is="step.icon" />
          </div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
          <div class="step-details" v-if="step.details">
            <ul>
              <li v-for="detail in step.details" :key="detail">{{ detail }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="rules-section">
        <h3 class="rules-title">📋 Regulamento Resumido</h3>
        <div class="rules-grid">
          <div class="rule-item" v-for="rule in rules" :key="rule.title">
            <div class="rule-icon">{{ rule.icon }}</div>
            <div class="rule-content">
              <h4>{{ rule.title }}</h4>
              <p>{{ rule.description }}</p>
            </div>
          </div>
        </div>
        <div class="full-rules">
          <a href="#" class="btn-link">Ver Regulamento Completo</a>
        </div>
      </div>

      <div class="cta-section">
        <div class="cta-content">
          <h3>Pronto para começar?</h3>
          <p>Cadastre-se agora e comece a participar dos sorteios diários!</p>
          <button class="btn-primary large">Criar Conta Grátis</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Simple icon components as strings for now
const ShoppingIcon = () => '🛒'
const ReceiptIcon = () => '🧾'
const PhoneIcon = () => '📱'
const GiftIcon = () => '🎁'

const steps = ref([
  {
    icon: ShoppingIcon,
    title: 'Faça sua Compra',
    description: 'Compre produtos participantes em qualquer loja autorizada.',
    details: [
      'Valor mínimo de R$ 50,00',
      'Produtos de marcas participantes',
      'Lojas físicas e online'
    ]
  },
  {
    icon: ReceiptIcon,
    title: 'Guarde a Nota',
    description: 'Mantenha o cupom fiscal da sua compra em segurança.',
    details: [
      'Nota fiscal obrigatória',
      'Verifique data e valor',
      'Produtos devem estar listados'
    ]
  },
  {
    icon: PhoneIcon,
    title: 'Cadastre-se',
    description: 'Crie sua conta e cadastre sua nota fiscal no sistema.',
    details: [
      'Cadastro rápido e gratuito',
      'Foto da nota fiscal',
      'Dados pessoais completos'
    ]
  },
  {
    icon: GiftIcon,
    title: 'Concorra aos Prêmios',
    description: 'Cada R$ 50,00 em compras = 1 número da sorte.',
    details: [
      'Sorteios diários às 20h',
      'Múltiplas chances de ganhar',
      'Prêmios instantâneos'
    ]
  }
])

const rules = ref([
  {
    icon: '⏰',
    title: 'Período da Promoção',
    description: 'De 01/01/2024 até 31/12/2024, ou enquanto durarem os prêmios.'
  },
  {
    icon: '🎯',
    title: 'Quem pode participar',
    description: 'Pessoas físicas, maiores de 18 anos, residentes no Brasil.'
  },
  {
    icon: '💰',
    title: 'Valor Mínimo',
    description: 'Compras a partir de R$ 50,00 em produtos participantes.'
  },
  {
    icon: '🏆',
    title: 'Sorteios',
    description: 'Realizados diariamente às 20h, transmitidos ao vivo.'
  },
  {
    icon: '📋',
    title: 'Cadastro da Nota',
    description: 'Até 30 dias após a data da compra para ser válida.'
  },
  {
    icon: '🎁',
    title: 'Retirada do Prêmio',
    description: 'Ganhadores têm 90 dias para retirar ou solicitar o prêmio.'
  }
])
</script>

<style scoped>
.how-to-participate-section {
  padding: 5rem 0;
  background: #f8fafc;
  position: relative;
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

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
}

@media (min-width: 1280px) {
  .steps-container {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
  }
}

@media (min-width: 1920px) {
  .steps-container {
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 3rem;
  }
}

.step {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.step:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.step-number {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.step-icon {
  font-size: 3rem;
  margin: 1rem 0;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.step-description {
  color: #718096;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.step-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.step-details li {
  padding: 0.5rem 0;
  color: #4a5568;
  position: relative;
  padding-left: 1.5rem;
}

.step-details li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #48bb78;
  font-weight: bold;
}

.rules-section {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

.rules-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 2rem;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 0.5rem;
}

.rule-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.rule-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.rule-content p {
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.5;
}

.full-rules {
  text-align: center;
}

.btn-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px dashed #667eea;
  transition: all 0.3s ease;
}

.btn-link:hover {
  color: #5a67d8;
  border-bottom-style: solid;
}

.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;
  color: white;
}

.cta-content h3 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.1rem;
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
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }

  .steps-container {
    grid-template-columns: 1fr;
  }

  .rules-grid {
    grid-template-columns: 1fr;
  }

  .rules-section {
    padding: 2rem;
  }

  .cta-section {
    padding: 2rem;
  }
}
</style>