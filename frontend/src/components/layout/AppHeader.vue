<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <img src="/polgo-logo-header.png" alt="Polgo" class="logo-image" />
        </div>
        <nav class="navigation">
          <ul>
            <li v-for="item in navigationItems" :key="item.name">
              <a :href="item.href" @click.prevent="scrollToSection(item.href)">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </nav>
        <div class="auth-buttons">
          <button class="btn-login">Login</button>
          <button class="btn-register">Cadastrar</button>
        </div>
        <button class="menu-toggle" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
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
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(123, 60, 240, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 20px rgba(123, 60, 240, 0.08);
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

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo-image {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.navigation ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.navigation a {
  text-decoration: none;
  color: var(--polgo-gray-medium);
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.navigation a:hover {
  color: var(--polgo-purple);
}

.navigation a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--polgo-purple), var(--polgo-blue));
  transition: width 0.3s ease;
}

.navigation a:hover::after {
  width: 100%;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-login, .btn-register {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.btn-login {
  background: transparent;
  border: 1px solid var(--polgo-blue);
  color: var(--polgo-blue);
}

.btn-login:hover {
  background: var(--polgo-blue);
  color: var(--polgo-white);
  box-shadow: 0 2px 10px rgba(31, 182, 255, 0.3);
}

.btn-register {
  background: linear-gradient(135deg, var(--polgo-purple), var(--polgo-purple-dark));
  border: 1px solid var(--polgo-purple);
  color: var(--polgo-white);
}

.btn-register:hover {
  background: linear-gradient(135deg, var(--polgo-purple-dark), var(--polgo-purple));
  box-shadow: 0 2px 10px rgba(123, 60, 240, 0.3);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: #4a5568;
  margin: 3px 0;
  transition: 0.3s;
}

/* Desktop optimizations */
@media (min-width: 1024px) {
  .header-content {
    height: 80px;
  }

  .navigation ul {
    gap: 2.5rem;
  }

  .navigation a {
    font-size: 1rem;
  }

  .logo-image {
    height: 35px;
  }
}

@media (min-width: 1280px) {
  .navigation ul {
    gap: 3rem;
  }

  .auth-buttons {
    gap: 1.25rem;
  }
}

/* Mobile breakpoint */
@media (max-width: 768px) {
  .navigation {
    display: none;
  }

  .auth-buttons {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
