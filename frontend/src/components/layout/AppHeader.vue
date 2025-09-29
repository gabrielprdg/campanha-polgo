<template>
  <header class="fixed top-0 left-0 right-0 bg-white/[0.98] backdrop-blur-[15px] border-b border-polgo-purple/10 z-[1000] transition-all duration-300 shadow-lg shadow-polgo-purple/[0.08]">
    <div class="w-full max-w-[2200px] mx-auto px-16 xl:max-w-[1600px] xl:px-12 lg:max-w-[1200px] lg:px-8 md:max-w-3xl md:px-8 sm:max-w-xl sm:px-6 xs:px-4">
      <div class="flex justify-between items-center h-[70px] lg:h-20">
        <div class="flex-shrink-0">
          <img src="/polgo-logo-header.png" alt="Polgo" class="h-10 lg:h-9 w-auto object-contain" />
        </div>
        <nav class="hidden md:block">
          <ul class="flex space-x-8 lg:space-x-10 xl:space-x-12 list-none m-0 p-0">
            <li v-for="item in navigationItems" :key="item.name">
              <a
                :href="item.href"
                @click.prevent="scrollToSection(item.href)"
                class="relative no-underline text-polgo-gray-medium font-medium transition-all duration-300 hover:text-polgo-purple cursor-pointer group lg:text-base after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:border-gradient after:transition-all after:duration-300 group-hover:after:w-full"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>
        </nav>
        <div class="hidden md:flex items-center space-x-4 lg:space-x-5">
          <RouterLink
            to="/dashboard"
            class="px-4 py-2 bg-transparent border border-polgo-blue text-polgo-blue font-medium rounded-md transition-all duration-300 hover:bg-polgo-blue hover:text-white hover:shadow-lg hover:shadow-polgo-blue/30"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/dashboard"
            class="px-4 py-2 bg-polgo-gradient border border-polgo-purple text-white font-medium rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-polgo-purple/30"
          >
            Cadastrar
          </RouterLink>
        </div>
        <button
          class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 bg-transparent border-0 cursor-pointer p-2"
          @click="toggleMobileMenu"
        >
          <span class="block w-6 h-0.5 bg-gray-600 transition-all duration-300"></span>
          <span class="block w-6 h-0.5 bg-gray-600 transition-all duration-300"></span>
          <span class="block w-6 h-0.5 bg-gray-600 transition-all duration-300"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NavigationItem } from '@/types'

const navigationItems: NavigationItem[] = [
  { name: 'Início', href: '#home' },
  { name: 'Como Participar', href: '#how-to-participate' },
  { name: 'Prêmios', href: '#prizes' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Ganhadores', href: '#winners' },
  { name: 'Lojas Participantes', href: '#stores' }
]

const isMobileMenuOpen = ref(false)

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<style scoped>
/* Only keeping gradients that can't be replicated with Tailwind */
.bg-polgo-gradient {
  background: linear-gradient(135deg, var(--polgo-purple), var(--polgo-purple-dark));
}

.bg-polgo-gradient:hover {
  background: linear-gradient(135deg, var(--polgo-purple-dark), var(--polgo-purple));
}

.border-gradient::after {
  background: linear-gradient(90deg, var(--polgo-purple), var(--polgo-blue));
}
</style>