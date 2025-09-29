<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <div class="flex-shrink-0">
        <div class="flex flex-col w-64">
          <!-- Sidebar component -->
          <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
            <div class="flex items-center flex-shrink-0 px-4">
              <img
                class="h-8 w-auto"
                src="/polgo-logo-header.png"
                alt="Polgo"
              />
              <span class="ml-2 text-xl font-semibold text-gray-900">Dashboard</span>
            </div>
            <nav class="mt-8 flex-1 px-4 space-y-1">
              <RouterLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                :class="[
                  $route.path.includes(item.href)
                    ? 'bg-primary-100 text-primary-900 border-r-2 border-primary-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                ]"
              >
                <component
                  :is="item.icon"
                  class="mr-3 flex-shrink-0 h-5 w-5"
                  :class="[
                    $route.path.includes(item.href)
                      ? 'text-primary-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  ]"
                />
                {{ item.name }}
              </RouterLink>
            </nav>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="flex flex-col w-0 flex-1 overflow-hidden">
        <!-- Top navigation bar -->
        <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow border-b border-gray-200">
          <div class="flex-1 px-4 flex justify-between items-center">
            <div class="flex-1 flex">
              <h1 class="text-2xl font-semibold text-gray-900">
                {{ pageTitle }}
              </h1>
            </div>
            <div class="ml-4 flex items-center space-x-4">
              <!-- User menu -->
              <div class="relative">
                <div class="flex items-center space-x-3">
                  <span class="text-sm font-medium text-gray-700">Admin</span>
                  <button
                    @click="logout"
                    class="text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Page content -->
        <main class="flex-1 relative overflow-y-auto focus:outline-none">
          <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RouterView />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Navigation items
const navigation = [
  {
    name: 'Lojas',
    href: '/dashboard/stores',
    icon: 'StoreIcon'
  },
  {
    name: 'Ganhadores',
    href: '/dashboard/winners',
    icon: 'TrophyIcon'
  }
]

// Dynamic page title based on current route
const pageTitle = computed(() => {
  const routeName = route.name as string
  if (routeName?.includes('stores')) return 'Gerenciar Lojas'
  if (routeName?.includes('winners')) return 'Gerenciar Ganhadores'
  return 'Dashboard'
})

const logout = () => {
  // Clear any auth tokens/data here
  router.push('/')
}
</script>

<script lang="ts">
// Icon components
import { defineComponent, h } from 'vue'

const StoreIcon = defineComponent({
  name: 'StoreIcon',
  render() {
    return h('svg', {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
      })
    ])
  }
})

const TrophyIcon = defineComponent({
  name: 'TrophyIcon',
  render() {
    return h('svg', {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
      })
    ])
  }
})

export { StoreIcon, TrophyIcon }
</script>