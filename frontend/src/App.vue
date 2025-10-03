<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HomeSection from './components/sections/HomeSection.vue'
import HowToParticipateSection from './components/sections/HowToParticipateSection.vue'
import PrizesSection from './components/sections/PrizesSection.vue'
import FaqSection from './components/sections/FaqSection.vue'
import WinnersSection from './components/sections/WinnersSection.vue'
import StoresSection from './components/sections/StoresSection.vue'
</script>


<template>
 <div class="app">
   <AppHeader />
   <main class="main-content">
     <HomeSection />
     <HowToParticipateSection />
     <PrizesSection />
     <FaqSection />
     <WinnersSection />
     <StoresSection />
   </main>
   <AppFooter />
 </div>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');


/* Polgo Brand Colors */
:root {
 --polgo-purple: #7B3CF0;
 --polgo-purple-dark: #6B2CE5;
 --polgo-purple-light: #8F5AF5;
 --polgo-blue: #1FB6FF;
 --polgo-blue-dark: #0FA6EF;
 --polgo-blue-light: #4FC4FF;
 --polgo-black: #1A1A1A;
 --polgo-gray-light: #F8F9FA;
 --polgo-gray-medium: #6C757D;
 --polgo-white: #FFFFFF;
}


* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}


body {
 font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
 line-height: 1.6;
 color: var(--polgo-black);
 overflow-x: hidden;
 background-color: var(--polgo-white);
}


html {
 scroll-behavior: smooth;
 overflow-x: hidden;
 min-width: 320px;
}


.app {
 min-height: 100vh;
 display: flex;
 flex-direction: column;
}


.main-content {
 flex: 1;
 padding-top: 70px; /* Account for fixed header + buffer */
}




/* Common button styles */
.btn {
 display: inline-block;
 padding: 0.75rem 1.5rem;
 border: none;
 border-radius: 0.375rem;
 font-weight: 600;
 text-decoration: none;
 cursor: pointer;
 transition: all 0.3s ease;
}


.btn-primary {
 background: linear-gradient(135deg, var(--polgo-purple) 0%, var(--polgo-purple-dark) 100%);
 color: var(--polgo-white);
 box-shadow: 0 4px 15px rgba(123, 60, 240, 0.3);
}


.btn-primary:hover {
 background: linear-gradient(135deg, var(--polgo-purple-dark) 0%, var(--polgo-purple) 100%);
 box-shadow: 0 6px 20px rgba(123, 60, 240, 0.4);
 transform: translateY(-2px);
}


.btn-secondary {
 background: transparent;
 color: var(--polgo-blue);
 border: 2px solid var(--polgo-blue);
}


.btn-secondary:hover {
 background: var(--polgo-blue);
 color: var(--polgo-white);
 box-shadow: 0 4px 15px rgba(31, 182, 255, 0.3);
 transform: translateY(-2px);
}


/* Container utility - Responsive approach */
.container {
 width: 100%;
 max-width: 1400px;
 margin: 0 auto;
 padding: 0 2rem;
}


/* Responsive container padding */
@media (max-width: 768px) {
 .container {
   padding: 0 1.5rem;
 }
}


@media (max-width: 480px) {
 .container {
   padding: 0 1rem;
 }
}
</style>