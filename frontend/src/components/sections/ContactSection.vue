<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="section-header">
        <h2>Entre em Contato</h2>
        <p>Fale conosco e esclareça suas dúvidas sobre nossas promoções</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info">
          <h3>Informações de Contato</h3>
          <div class="contact-item">
            <span class="icon">📧</span>
            <div>
              <h4>Email</h4>
              <p>contato@campanha.com</p>
            </div>
          </div>
          <div class="contact-item">
            <span class="icon">📞</span>
            <div>
              <h4>Telefone</h4>
              <p>(11) 99999-9999</p>
            </div>
          </div>
          <div class="contact-item">
            <span class="icon">💬</span>
            <div>
              <h4>WhatsApp</h4>
              <p>(11) 99999-9999</p>
            </div>
          </div>
          <div class="contact-item">
            <span class="icon">🕒</span>
            <div>
              <h4>Horário de Atendimento</h4>
              <p>Segunda a Sexta: 8h às 18h<br>Sábado: 9h às 15h</p>
            </div>
          </div>
        </div>
        <div class="contact-form">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Nome</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                placeholder="Seu nome completo"
              >
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                placeholder="seu.email@exemplo.com"
              >
            </div>
            <div class="form-group">
              <label for="phone">Telefone</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                placeholder="(11) 99999-9999"
              >
            </div>
            <div class="form-group">
              <label for="message">Mensagem</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                placeholder="Como podemos ajudar você?"
                rows="5"
              ></textarea>
            </div>
            <button type="submit" class="btn-submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Here you would normally send the form data to your API
  console.log('Form submitted:', form)

  // Reset form
  Object.assign(form, {
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  isSubmitting.value = false
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
}
</script>

<style scoped>
.contact-section {
  padding: 6rem 0;
  background: #f7fafc;
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
  color: #1a202c;
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.1rem;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info h3 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;
}

.contact-item .icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.contact-item h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
}

.contact-item p {
  color: #4a5568;
  margin: 0;
  line-height: 1.5;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3182ce;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-submit:hover:not(:disabled) {
  background: #2b77cb;
}

.btn-submit:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 2rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-form {
    padding: 1.5rem;
  }
}
</style>