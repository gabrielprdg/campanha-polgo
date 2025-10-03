<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div class="container">
        <h1>Dashboard Administrativo</h1>
        <p>Gerencie lojas participantes e ganhadores da campanha Polgo</p>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="container">
        <div class="dashboard-tabs">
          <button
            :class="['tab-button', { active: activeTab === 'stores' }]"
            @click="activeTab = 'stores'"
          >
            Lojas Participantes
          </button>
          <button
            :class="['tab-button', { active: activeTab === 'winners' }]"
            @click="activeTab = 'winners'"
          >
            Ganhadores
          </button>
        </div>

        <div class="tab-content">
          <!-- Stores Tab -->
          <div v-if="activeTab === 'stores'" class="stores-section">
            <div class="section-header">
              <h2>Cadastro de Lojas</h2>
              <button class="btn-primary" @click="showStoreForm = !showStoreForm">
                {{ showStoreForm ? 'Cancelar' : '+ Nova Loja' }}
              </button>
            </div>

            <div v-if="showStoreForm" class="form-card">
              <form @submit.prevent="handleStoreSubmit">
                <div class="form-grid">
                  <div class="form-group">
                    <label>Nome da Loja</label>
                    <input type="text" v-model="storeForm.name" required />
                  </div>
                  <div class="form-group">
                    <label>Estado</label>
                    <input type="text" v-model="storeForm.state" required />
                  </div>
                  <div class="form-group">
                    <label>Cidade</label>
                    <input type="text" v-model="storeForm.city" required />
                  </div>
                  <div class="form-group">
                    <label>Endereço</label>
                    <input type="text" v-model="storeForm.address" required />
                  </div>
                </div>
                <button type="submit" class="btn-primary">Cadastrar Loja</button>
              </form>
            </div>

            <div class="data-table">
              <h3>Lojas Cadastradas</h3>
              <p class="placeholder-text">Lista de lojas será exibida aqui</p>
            </div>
          </div>

          <!-- Winners Tab -->
          <div v-if="activeTab === 'winners'" class="winners-section">
            <div class="section-header">
              <h2>Cadastro de Ganhadores</h2>
              <button class="btn-primary" @click="showWinnerForm = !showWinnerForm">
                {{ showWinnerForm ? 'Cancelar' : '+ Novo Ganhador' }}
              </button>
            </div>

            <div v-if="showWinnerForm" class="form-card">
              <form @submit.prevent="handleWinnerSubmit">
                <div class="form-grid">
                  <div class="form-group">
                    <label>Nome do Ganhador</label>
                    <input type="text" v-model="winnerForm.name" required />
                  </div>
                  <div class="form-group">
                    <label>Prêmio</label>
                    <input type="text" v-model="winnerForm.prize" required />
                  </div>
                  <div class="form-group">
                    <label>Data do Sorteio</label>
                    <input type="date" v-model="winnerForm.date" required />
                  </div>
                  <div class="form-group">
                    <label>Cidade</label>
                    <input type="text" v-model="winnerForm.city" required />
                  </div>
                </div>
                <button type="submit" class="btn-primary">Cadastrar Ganhador</button>
              </form>
            </div>

            <div class="data-table">
              <h3>Ganhadores Cadastrados</h3>
              <p class="placeholder-text">Lista de ganhadores será exibida aqui</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'stores' | 'winners'>('stores')
const showStoreForm = ref(false)
const showWinnerForm = ref(false)

const storeForm = ref({
  name: '',
  state: '',
  city: '',
  address: ''
})

const winnerForm = ref({
  name: '',
  prize: '',
  date: '',
  city: ''
})

const handleStoreSubmit = () => {
  console.log('Store submitted:', storeForm.value)
  // TODO: Implement API call to save store
  alert('Loja cadastrada com sucesso!')
  storeForm.value = { name: '', state: '', city: '', address: '' }
  showStoreForm.value = false
}

const handleWinnerSubmit = () => {
  console.log('Winner submitted:', winnerForm.value)
  // TODO: Implement API call to save winner
  alert('Ganhador cadastrado com sucesso!')
  winnerForm.value = { name: '', prize: '', date: '', city: '' }
  showWinnerForm.value = false
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: var(--polgo-gray-light);
}

.dashboard-header {
  background: linear-gradient(135deg, var(--polgo-purple) 0%, var(--polgo-purple-dark) 100%);
  color: white;
  padding: 3rem 0;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  font-size: 1.125rem;
  opacity: 0.9;
}

.dashboard-content {
  padding: 2rem 0;
}

.dashboard-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.tab-button {
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  color: var(--polgo-gray-medium);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border-bottom: 3px solid transparent;
}

.tab-button.active {
  color: var(--polgo-purple);
  border-bottom-color: var(--polgo-purple);
}

.tab-button:hover {
  color: var(--polgo-purple-dark);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.75rem;
  color: var(--polgo-black);
}

.form-card {
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--polgo-black);
}

.form-group input {
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--polgo-purple);
}

.data-table {
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.data-table h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--polgo-black);
}

.placeholder-text {
  color: var(--polgo-gray-medium);
  text-align: center;
  padding: 3rem 0;
}

.btn-primary {
  background: linear-gradient(135deg, var(--polgo-purple) 0%, var(--polgo-purple-dark) 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(123, 60, 240, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--polgo-purple-dark) 0%, var(--polgo-purple) 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(123, 60, 240, 0.4);
}

@media (max-width: 768px) {
  .dashboard-header h1 {
    font-size: 1.75rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-tabs {
    overflow-x: auto;
  }

  .tab-button {
    white-space: nowrap;
  }
}
</style>
