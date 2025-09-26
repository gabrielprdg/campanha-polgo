<template>
  <section id="faq" class="faq-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Perguntas Frequentes</h2>
        <p class="section-subtitle">Tire todas as suas dúvidas sobre a promoção</p>
      </div>

      <div class="faq-search">
        <div class="search-container">
          <div class="search-input-wrapper">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Digite sua dúvida ou palavra-chave..."
              class="search-input"
            />
            <div class="search-icon">🔍</div>
          </div>
          <div v-if="searchQuery && filteredFaqs.length === 0" class="no-results">
            <p>Nenhuma pergunta encontrada para "{{ searchQuery }}"</p>
            <p class="no-results-suggestion">Tente usar palavras-chave diferentes ou entre em contato conosco</p>
          </div>
        </div>
      </div>

      <div class="faq-categories">
        <div class="category-filters">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="['filter-button', { active: activeCategory === category.id }]"
            @click="activeCategory = category.id"
          >
            {{ category.icon }} {{ category.name }}
            <span class="category-count">{{ getCategoryCount(category.id) }}</span>
          </button>
        </div>
      </div>

      <div class="faq-content">
        <div class="faq-list">
          <div
            v-for="faq in displayedFaqs"
            :key="faq.id"
            class="faq-item"
            :class="{ active: faq.id === activeFaq }"
          >
            <button class="faq-question" @click="toggleFaq(faq.id)">
              <span class="question-text" v-html="highlightSearch(faq.question)"></span>
              <span class="faq-icon">{{ faq.id === activeFaq ? '−' : '+' }}</span>
            </button>
            <div class="faq-answer" v-if="faq.id === activeFaq">
              <div class="answer-content" v-html="highlightSearch(faq.answer)"></div>
              <div v-if="faq.relatedLinks" class="related-links">
                <h4>Links relacionados:</h4>
                <ul>
                  <li v-for="link in faq.relatedLinks" :key="link.text">
                    <a :href="link.url">{{ link.text }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="faq-sidebar">
          <div class="quick-stats">
            <h3>📊 Estatísticas Rápidas</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-number">{{ totalFaqs }}</span>
                <span class="stat-label">Perguntas</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">24h</span>
                <span class="stat-label">Suporte</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">95%</span>
                <span class="stat-label">Satisfação</span>
              </div>
            </div>
          </div>

          <div class="popular-questions">
            <h3>🔥 Mais Perguntadas</h3>
            <ul class="popular-list">
              <li v-for="popular in popularQuestions" :key="popular.id">
                <button @click="scrollToFaq(popular.id)" class="popular-question">
                  {{ popular.question }}
                </button>
              </li>
            </ul>
          </div>

          <div class="contact-help">
            <h3>💬 Ainda tem dúvidas?</h3>
            <p>Nossa equipe está pronta para ajudar!</p>
            <div class="contact-buttons">
              <button class="btn-contact">WhatsApp</button>
              <button class="btn-contact">E-mail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface RelatedLink {
  text: string
  url: string
}

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  views: number
  relatedLinks?: RelatedLink[]
}

interface Category {
  id: string
  name: string
  icon: string
}

const searchQuery = ref('')
const activeCategory = ref('all')
const activeFaq = ref<number | null>(null)

const categories = ref<Category[]>([
  { id: 'all', name: 'Todas', icon: '📋' },
  { id: 'participation', name: 'Participação', icon: '🎯' },
  { id: 'prizes', name: 'Prêmios', icon: '🏆' },
  { id: 'technical', name: 'Técnico', icon: '⚙️' },
  { id: 'rules', name: 'Regulamento', icon: '📜' }
])

const faqs = ref<FAQ[]>([
  {
    id: 1,
    question: 'Como faço para participar da promoção?',
    answer: 'Para participar, você precisa: 1) Comprar produtos participantes no valor mínimo de R$ 50,00; 2) Cadastrar-se no site; 3) Enviar foto da nota fiscal; 4) Aguardar a validação. Cada R$ 50,00 em compras = 1 número da sorte.',
    category: 'participation',
    views: 1250,
    relatedLinks: [
      { text: 'Ver produtos participantes', url: '#products' },
      { text: 'Como cadastrar nota fiscal', url: '#register' }
    ]
  },
  {
    id: 2,
    question: 'Qual o valor mínimo para participar?',
    answer: 'O valor mínimo é de R$ 50,00 em produtos participantes em uma única compra. Compras de valores inferiores não geram números da sorte.',
    category: 'participation',
    views: 980
  },
  {
    id: 3,
    question: 'Quando são realizados os sorteios?',
    answer: 'Os sorteios são realizados diariamente às 20h, de segunda a domingo. Os sorteios são transmitidos ao vivo em nossas redes sociais e no site oficial.',
    category: 'prizes',
    views: 850
  },
  {
    id: 4,
    question: 'Como saberei se ganhei um prêmio?',
    answer: 'Os ganhadores são notificados por e-mail, SMS e telefone. Além disso, a lista de ganhadores é publicada em nosso site e redes sociais. Verifique sempre seus dados de contato.',
    category: 'prizes',
    views: 750
  },
  {
    id: 5,
    question: 'Quanto tempo tenho para retirar meu prêmio?',
    answer: 'Você tem 90 dias corridos a partir da data do sorteio para retirar ou solicitar o envio do prêmio. Após este prazo, o prêmio será considerado perdido.',
    category: 'rules',
    views: 650
  },
  {
    id: 6,
    question: 'Posso participar quantas vezes quiser?',
    answer: 'Sim! Não há limite de participação. Cada nova compra de R$ 50,00 ou mais gera novos números da sorte. Quanto mais você compra, maiores suas chances de ganhar.',
    category: 'participation',
    views: 600
  },
  {
    id: 7,
    question: 'A nota fiscal precisa estar em meu nome?',
    answer: 'Sim, a nota fiscal deve estar obrigatoriamente em nome do participante cadastrado. Não são aceitas notas fiscais em nome de terceiros.',
    category: 'rules',
    views: 550
  },
  {
    id: 8,
    question: 'Não consigo cadastrar minha nota fiscal. O que fazer?',
    answer: 'Verifique se: 1) A nota está legível; 2) A data está dentro do prazo (30 dias); 3) O valor é igual ou superior a R$ 50,00; 4) Os produtos são participantes. Se o problema persistir, entre em contato conosco.',
    category: 'technical',
    views: 480
  },
  {
    id: 9,
    question: 'Menores de idade podem participar?',
    answer: 'Não. A promoção é destinada exclusivamente a pessoas físicas maiores de 18 anos, residentes no Brasil e capazes civilmente.',
    category: 'rules',
    views: 420
  },
  {
    id: 10,
    question: 'Como funcionam os prêmios instantâneos?',
    answer: 'Além dos sorteios diários, ao cadastrar sua nota fiscal você pode ganhar prêmios instantâneos como descontos, frete grátis ou cashback. O resultado aparece imediatamente na tela.',
    category: 'prizes',
    views: 380
  }
])

const filteredFaqs = computed(() => {
  let filtered = faqs.value

  // Filter by category
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(faq => faq.category === activeCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered.sort((a, b) => b.views - a.views)
})

const displayedFaqs = computed(() => filteredFaqs.value)

const totalFaqs = computed(() => faqs.value.length)

const popularQuestions = computed(() =>
  [...faqs.value]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map(faq => ({ id: faq.id, question: faq.question.slice(0, 50) + '...' }))
)

const getCategoryCount = (categoryId: string) => {
  if (categoryId === 'all') return faqs.value.length
  return faqs.value.filter(faq => faq.category === categoryId).length
}

const toggleFaq = (faqId: number) => {
  activeFaq.value = activeFaq.value === faqId ? null : faqId
}

const scrollToFaq = (faqId: number) => {
  activeFaq.value = faqId
  const element = document.querySelector(`[data-faq-id="${faqId}"]`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const highlightSearch = (text: string) => {
  if (!searchQuery.value.trim()) return text

  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// Reset active FAQ when search changes
watch(searchQuery, () => {
  activeFaq.value = null
})

// Reset active FAQ when category changes
watch(activeCategory, () => {
  activeFaq.value = null
})
</script>

<style scoped>
.faq-section {
  padding: 5rem 0;
  background: #f8fafc;
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

.faq-search {
  margin-bottom: 3rem;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 2rem;
  font-size: 1.1rem;
  transition: border-color 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #718096;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #718096;
}

.no-results-suggestion {
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.faq-categories {
  margin-bottom: 3rem;
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-button {
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

.filter-button.active {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-color: transparent;
}

.filter-button:hover:not(.active) {
  border-color: #667eea;
  color: #667eea;
}

.category-count {
  background: rgba(255, 255, 255, 0.3);
  color: inherit;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.8rem;
}

.filter-button:not(.active) .category-count {
  background: #e2e8f0;
  color: #718096;
}

.faq-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.faq-list {
  space-y: 1rem;
}

.faq-item {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item.active {
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.15);
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background: #f7fafc;
}

.question-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.4;
}

.faq-icon {
  font-size: 1.5rem;
  color: #667eea;
  font-weight: bold;
  flex-shrink: 0;
  margin-left: 1rem;
}

.faq-answer {
  border-top: 1px solid #e2e8f0;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

.answer-content {
  padding: 1.5rem;
  color: #4a5568;
  line-height: 1.6;
}

.related-links {
  padding: 0 1.5rem 1.5rem;
}

.related-links h4 {
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.related-links ul {
  list-style: none;
  padding: 0;
}

.related-links li {
  margin-bottom: 0.3rem;
}

.related-links a {
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
}

.related-links a:hover {
  text-decoration: underline;
}

.faq-sidebar {
  space-y: 2rem;
}

.quick-stats,
.popular-questions,
.contact-help {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.quick-stats h3,
.popular-questions h3,
.contact-help h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.stat-label {
  font-size: 0.8rem;
  color: #718096;
}

.popular-list {
  list-style: none;
  padding: 0;
}

.popular-list li {
  margin-bottom: 0.5rem;
}

.popular-question {
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  text-align: left;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #e2e8f0;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.popular-question:hover {
  color: #667eea;
}

.contact-help p {
  color: #718096;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.contact-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-contact {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.btn-contact:hover {
  background: #667eea;
  color: white;
}

/* Search highlighting */
:deep(mark) {
  background: #ffd700;
  color: #333;
  padding: 0 0.2rem;
  border-radius: 0.2rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }

  .category-filters {
    gap: 0.5rem;
  }

  .filter-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .faq-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .faq-question {
    padding: 1rem;
  }

  .question-text {
    font-size: 1rem;
  }

  .answer-content {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .contact-buttons {
    flex-direction: column;
  }
}
</style>