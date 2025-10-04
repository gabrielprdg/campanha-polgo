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
            @click="switchTab('stores')"
          >
            Lojas Participantes
          </button>
          <button
            :class="['tab-button', { active: activeTab === 'winners' }]"
            @click="switchTab('winners')"
          >
            Ganhadores
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="error-message">
          {{ error }}
          <button @click="error = ''" class="close-btn">×</button>
        </div>

        <!-- Success Message -->
        <div v-if="success" class="success-message">
          {{ success }}
          <button @click="success = ''" class="close-btn">×</button>
        </div>

        <div class="tab-content">
          <!-- Stores Tab -->
          <div v-if="activeTab === 'stores'" class="stores-section">
            <div class="section-header">
              <h2>Cadastro de Lojas</h2>
              <button class="btn-primary" @click="showStoreForm = !showStoreForm; if (!showStoreForm) { editingStoreId = null; storeForm = { name: '', cnpj: '', state: '', city: '', address: '' } }">
                {{ showStoreForm ? 'Cancelar' : '+ Nova Loja' }}
              </button>
            </div>

            <div v-if="showStoreForm" class="form-card">
              <form @submit.prevent="handleStoreSubmit">
                <div class="form-grid">
                  <div class="form-group">
                    <label>Nome da Loja *</label>
                    <input type="text" v-model="storeForm.name" required />
                  </div>
                  <div class="form-group">
                    <label>CNPJ *</label>
                    <input
                      type="text"
                      v-model="storeForm.cnpj"
                      placeholder="00.000.000/0000-00"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Estado *</label>
                    <input
                      type="text"
                      v-model="storeForm.state"
                      maxlength="2"
                      placeholder="SP"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Cidade *</label>
                    <input type="text" v-model="storeForm.city" required />
                  </div>
                  <div class="form-group full-width">
                    <label>Endereço *</label>
                    <input type="text" v-model="storeForm.address" required />
                  </div>
                </div>
                <button type="submit" class="btn-primary" :disabled="loading">
                  {{ loading ? (editingStoreId ? 'Atualizando...' : 'Cadastrando...') : (editingStoreId ? 'Atualizar Loja' : 'Cadastrar Loja') }}
                </button>
              </form>
            </div>

            <div class="data-table">
              <h3>Lojas Cadastradas ({{ stores.length }})</h3>
              <div v-if="loading && stores.length === 0" class="loading-text">
                Carregando...
              </div>
              <div v-else-if="stores.length === 0" class="placeholder-text">
                Nenhuma loja cadastrada ainda
              </div>
              <div v-else class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>CNPJ</th>
                      <th>Estado</th>
                      <th>Cidade</th>
                      <th>Endereço</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="store in stores" :key="store.id">
                      <td>{{ store.name }}</td>
                      <td>{{ store.cnpj }}</td>
                      <td>{{ store.state }}</td>
                      <td>{{ store.city }}</td>
                      <td>{{ store.address }}</td>
                      <td class="actions-cell">
                        <button
                          @click="editStore(store)"
                          class="btn-edit"
                          :disabled="loading"
                        >
                          Editar
                        </button>
                        <button
                          @click="deleteStore(store.id)"
                          class="btn-delete"
                          :disabled="loading"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Winners Tab -->
          <div v-if="activeTab === 'winners'" class="winners-section">
            <div class="section-header">
              <h2>Cadastro de Ganhadores</h2>
              <button class="btn-primary" @click="showWinnerForm = !showWinnerForm; if (!showWinnerForm) { editingWinnerId = null; winnerForm = { name: '', state: '', city: '', prize: '', date: '' } }">
                {{ showWinnerForm ? 'Cancelar' : '+ Novo Ganhador' }}
              </button>
            </div>

            <div v-if="showWinnerForm" class="form-card">
              <form @submit.prevent="handleWinnerSubmit">
                <div class="form-grid">
                  <div class="form-group">
                    <label>Nome do Ganhador *</label>
                    <input type="text" v-model="winnerForm.name" required />
                  </div>
                  <div class="form-group">
                    <label>Estado *</label>
                    <input
                      type="text"
                      v-model="winnerForm.state"
                      maxlength="2"
                      placeholder="SP"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Cidade *</label>
                    <input type="text" v-model="winnerForm.city" required />
                  </div>
                  <div class="form-group">
                    <label>Prêmio *</label>
                    <input type="text" v-model="winnerForm.prize" required />
                  </div>
                  <div class="form-group">
                    <label>Data do Sorteio *</label>
                    <input type="date" v-model="winnerForm.date" required />
                  </div>
                </div>
                <button type="submit" class="btn-primary" :disabled="loading">
                  {{ loading ? (editingWinnerId ? 'Atualizando...' : 'Cadastrando...') : (editingWinnerId ? 'Atualizar Ganhador' : 'Cadastrar Ganhador') }}
                </button>
              </form>
            </div>

            <div class="data-table">
              <h3>Ganhadores Cadastrados ({{ winners.length }})</h3>
              <div v-if="loading && winners.length === 0" class="loading-text">
                Carregando...
              </div>
              <div v-else-if="winners.length === 0" class="placeholder-text">
                Nenhum ganhador cadastrado ainda
              </div>
              <div v-else class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Estado</th>
                      <th>Cidade</th>
                      <th>Prêmio</th>
                      <th>Data</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="winner in winners" :key="winner.id">
                      <td>{{ winner.name }}</td>
                      <td>{{ winner.state }}</td>
                      <td>{{ winner.city }}</td>
                      <td>{{ winner.prize }}</td>
                      <td>{{ formatDate(winner.date) }}</td>
                      <td class="actions-cell">
                        <button
                          @click="editWinner(winner)"
                          class="btn-edit"
                          :disabled="loading"
                        >
                          Editar
                        </button>
                        <button
                          @click="deleteWinner(winner.id)"
                          class="btn-delete"
                          :disabled="loading"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeService } from '@/services/storeService'
import { winnerService } from '@/services/winnerService'
import type { Store } from '@/types/store'
import type { Winner } from '@/types/winner'

const activeTab = ref<'stores' | 'winners'>('stores')
const showStoreForm = ref(false)
const showWinnerForm = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')

const stores = ref<Store[]>([])
const winners = ref<Winner[]>([])

const editingStoreId = ref<string | null>(null)
const editingWinnerId = ref<string | null>(null)

const storeForm = ref({
  name: '',
  cnpj: '',
  state: '',
  city: '',
  address: ''
})

const winnerForm = ref({
  name: '',
  state: '',
  city: '',
  prize: '',
  date: ''
})

const switchTab = (tab: 'stores' | 'winners') => {
  activeTab.value = tab
  error.value = ''
  success.value = ''
}

const loadStores = async () => {
  try {
    loading.value = true
    error.value = ''
    stores.value = await storeService.getAll()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao carregar lojas'
    console.error('Error loading stores:', err)
  } finally {
    loading.value = false
  }
}

const loadWinners = async () => {
  try {
    loading.value = true
    error.value = ''
    winners.value = await winnerService.getAll()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao carregar ganhadores'
    console.error('Error loading winners:', err)
  } finally {
    loading.value = false
  }
}

const handleStoreSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    success.value = ''

    if (editingStoreId.value) {
      await storeService.update(editingStoreId.value, storeForm.value)
      success.value = 'Loja atualizada com sucesso!'
    } else {
      await storeService.create(storeForm.value)
      success.value = 'Loja cadastrada com sucesso!'
    }

    storeForm.value = { name: '', cnpj: '', state: '', city: '', address: '' }
    editingStoreId.value = null
    showStoreForm.value = false

    await loadStores()
  } catch (err: any) {
    error.value = err.response?.data?.message || `Erro ao ${editingStoreId.value ? 'atualizar' : 'cadastrar'} loja`
    console.error('Error saving store:', err)
  } finally {
    loading.value = false
  }
}

const handleWinnerSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    success.value = ''

    const winnerData = {
      ...winnerForm.value,
      date: new Date(winnerForm.value.date)
    }

    if (editingWinnerId.value) {
      await winnerService.update(editingWinnerId.value, winnerData)
      success.value = 'Ganhador atualizado com sucesso!'
    } else {
      await winnerService.create(winnerData)
      success.value = 'Ganhador cadastrado com sucesso!'
    }

    winnerForm.value = { name: '', state: '', city: '', prize: '', date: '' }
    editingWinnerId.value = null
    showWinnerForm.value = false

    await loadWinners()
  } catch (err: any) {
    error.value = err.response?.data?.message || `Erro ao ${editingWinnerId.value ? 'atualizar' : 'cadastrar'} ganhador`
    console.error('Error saving winner:', err)
  } finally {
    loading.value = false
  }
}

const editStore = (store: Store) => {
  storeForm.value = {
    name: store.name,
    cnpj: store.cnpj,
    state: store.state,
    city: store.city,
    address: store.address
  }
  editingStoreId.value = store.id
  showStoreForm.value = true
}

const deleteStore = async (id: string) => {
  if (!confirm('Deseja realmente excluir esta loja?')) return

  try {
    loading.value = true
    error.value = ''

    await storeService.delete(id)
    success.value = 'Loja excluída com sucesso!'

    await loadStores()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao excluir loja'
    console.error('Error deleting store:', err)
  } finally {
    loading.value = false
  }
}

const editWinner = (winner: Winner) => {
  winnerForm.value = {
    name: winner.name,
    state: winner.state,
    city: winner.city,
    prize: winner.prize,
    date: new Date(winner.date).toISOString().split('T')[0]
  }
  editingWinnerId.value = winner.id
  showWinnerForm.value = true
}

const deleteWinner = async (id: string) => {
  if (!confirm('Deseja realmente excluir este ganhador?')) return

  try {
    loading.value = true
    error.value = ''

    await winnerService.delete(id)
    success.value = 'Ganhador excluído com sucesso!'

    await loadWinners()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao excluir ganhador'
    console.error('Error deleting winner:', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('pt-BR')
}

onMounted(() => {
  loadStores()
  loadWinners()
})
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

.error-message,
.success-message {
  padding: 1rem 1.5rem;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-message {
  background-color: #fee;
  color: #c33;
  border: 1px solid #fcc;
}

.success-message {
  background-color: #efe;
  color: #3c3;
  border: 1px solid #cfc;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.close-btn:hover {
  opacity: 1;
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

.form-group.full-width {
  grid-column: 1 / -1;
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

.placeholder-text,
.loading-text {
  color: var(--polgo-gray-medium);
  text-align: center;
  padding: 3rem 0;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  font-weight: 600;
  color: var(--polgo-black);
  background-color: #f8f9fa;
}

tr:hover {
  background-color: #f8f9fa;
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

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--polgo-purple-dark) 0%, var(--polgo-purple) 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(123, 60, 240, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.btn-edit {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.btn-edit:hover:not(:disabled) {
  background-color: #0056b3;
  transform: translateY(-1px);
}

.btn-edit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.btn-delete:hover:not(:disabled) {
  background-color: #c82333;
  transform: translateY(-1px);
}

.btn-delete:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

  table {
    font-size: 0.875rem;
  }

  th,
  td {
    padding: 0.75rem 0.5rem;
  }

  .actions-cell {
    flex-direction: column;
    gap: 0.25rem;
  }

  .btn-edit,
  .btn-delete {
    width: 100%;
    padding: 0.375rem 0.75rem;
  }
}
</style>
