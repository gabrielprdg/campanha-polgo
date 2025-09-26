<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Campanha Promocional</h3>
          <p>Sua loja de confiança com as melhores ofertas.</p>
        </div>
        <div class="footer-section">
          <h4>Links Rápidos</h4>
          <ul>
            <li><a href="#home">Início</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#products">Produtos</a></li>
            <li><a href="#promotions">Promoções</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Contato</h4>
          <ul>
            <li>Email: contato@campanha.com</li>
            <li>Telefone: (11) 99999-9999</li>
            <li>WhatsApp: (11) 99999-9999</li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Redes Sociais</h4>
          <div class="social-links">
            <a href="#" aria-label="LinkedIn" class="social-icon linkedin">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" class="social-icon youtube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" class="social-icon instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Campanha Promocional. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  background: #1a202c;
  color: #e2e8f0;
  padding: 3rem 0 1rem;
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

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
  color: #ffffff;
}

.footer-section p {
  color: #a0aec0;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #ffffff;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #a0aec0;
  transition: all 0.3s ease;
}

.social-icon svg {
  width: 100%;
  height: 100%;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.social-icon.linkedin:hover {
  background: #0077B5;
  color: white;
}

.social-icon.youtube:hover {
  background: #FF0000;
  color: white;
}

.social-icon.instagram:hover {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
}

.footer-bottom {
  border-top: 1px solid #2d3748;
  padding-top: 1rem;
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  color: #a0aec0;
  font-size: 0.875rem;
}

/* Large desktop optimizations */
@media (min-width: 1024px) {
  .footer-content {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
  }
}

@media (min-width: 1280px) {
  .footer-content {
    gap: 4rem;
  }
}

/* Tablet breakpoint */
@media (max-width: 1023px) and (min-width: 769px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile breakpoint */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style>