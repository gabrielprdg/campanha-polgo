<template>
  <div class="bg-white shadow-sm rounded-lg">
    <div v-if="title || $slots.header" class="px-6 py-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <div>
          <h3 v-if="title" class="text-lg font-medium text-gray-900">{{ title }}</h3>
          <slot name="header"></slot>
        </div>
        <div class="flex space-x-3">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>

    <div v-if="showFilters" class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div class="flex-1 max-w-xs">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            @input="$emit('search', searchQuery)"
          />
        </div>
        <slot name="filters"></slot>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              :class="{ 'w-auto': !column.width, [column.width || '']: column.width }"
              @click="column.sortable && handleSort(column.key)"
            >
              <div class="flex items-center space-x-1">
                <span>{{ column.label }}</span>
                <template v-if="column.sortable">
                  <svg
                    v-if="sortColumn === column.key"
                    class="w-4 h-4"
                    :class="{
                      'text-gray-400': sortDirection === 'asc',
                      'text-gray-600 transform rotate-180': sortDirection === 'desc'
                    }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </template>
              </div>
            </th>
            <th v-if="hasActions" scope="col" class="relative px-6 py-3 w-20">
              <span class="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="loading" class="animate-pulse">
            <td v-for="column in columns" :key="`loading-${column.key}`" class="px-6 py-4">
              <div class="h-4 bg-gray-200 rounded"></div>
            </td>
            <td v-if="hasActions" class="px-6 py-4">
              <div class="h-4 bg-gray-200 rounded w-16"></div>
            </td>
          </tr>
          <tr v-else-if="!items.length">
            <td :colspan="columns.length + (hasActions ? 1 : 0)" class="px-6 py-12 text-center text-gray-500">
              <div class="flex flex-col items-center">
                <svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-sm">{{ emptyMessage }}</p>
              </div>
            </td>
          </tr>
          <tr v-else v-for="(item, index) in items" :key="getItemKey(item, index)" class="hover:bg-gray-50">
            <td v-for="column in columns" :key="column.key" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <slot :name="`cell-${column.key}`" :item="item" :value="item[column.key]" :index="index">
                {{ formatCellValue(item[column.key], column.key) }}
              </slot>
            </td>
            <td v-if="hasActions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <slot name="actions" :item="item" :index="index">
                <div class="flex space-x-2">
                  <button
                    @click="$emit('edit', item)"
                    class="text-primary-600 hover:text-primary-900"
                  >
                    Editar
                  </button>
                  <button
                    @click="$emit('delete', item)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Excluir
                  </button>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="pagination && pagination.total > 0" class="px-6 py-3 border-t border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Mostrando
          <span class="font-medium">{{ (pagination.page - 1) * pagination.limit + 1 }}</span>
          até
          <span class="font-medium">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span>
          de
          <span class="font-medium">{{ pagination.total }}</span>
          resultados
        </div>
        <nav class="flex items-center space-x-2">
          <button
            :disabled="pagination.page <= 1"
            @click="changePage(pagination.page - 1)"
            class="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span class="px-3 py-1 text-sm text-gray-700">
            Página {{ pagination.page }} de {{ pagination.totalPages }}
          </span>
          <button
            :disabled="pagination.page >= pagination.totalPages"
            @click="changePage(pagination.page + 1)"
            class="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed } from 'vue'
import type { TableColumn, PaginationData } from '@/types'

interface Props {
  columns: TableColumn[]
  items: T[]
  loading?: boolean
  title?: string
  showFilters?: boolean
  pagination?: PaginationData
  emptyMessage?: string
  keyField?: keyof T
}

interface Emits {
  (e: 'edit', item: T): void
  (e: 'delete', item: T): void
  (e: 'search', query: string): void
  (e: 'sort', column: string, direction: 'asc' | 'desc'): void
  (e: 'page-change', page: number): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showFilters: true,
  emptyMessage: 'Nenhum item encontrado',
  keyField: 'id' as keyof T
})

const emit = defineEmits<Emits>()

const searchQuery = ref('')
const sortColumn = ref<string>('')
const sortDirection = ref<'asc' | 'desc'>('asc')

const hasActions = computed(() => {
  return true // Always show actions column for edit/delete
})

const handleSort = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
  emit('sort', column, sortDirection.value)
}

const changePage = (page: number) => {
  if (page >= 1 && page <= (props.pagination?.totalPages || 1)) {
    emit('page-change', page)
  }
}

const getItemKey = (item: T, index: number): string | number => {
  return props.keyField ? item[props.keyField] as string | number : index
}

const formatCellValue = (value: any, columnKey: string): string => {
  if (value === null || value === undefined) return '-'

  if (columnKey === 'date' && value) {
    return new Date(value).toLocaleDateString('pt-BR')
  }

  if (columnKey === 'createdAt' || columnKey === 'updatedAt') {
    return new Date(value).toLocaleDateString('pt-BR')
  }

  return String(value)
}
</script>