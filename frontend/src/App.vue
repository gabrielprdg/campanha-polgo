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
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 pt-[70px]">
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

/* Keep CSS variables for gradient backgrounds that Tailwind can't handle */
:root {
  --polgo-purple: #7B3CF0;
  --polgo-purple-dark: #6B2CE5;
  --polgo-blue: #1FB6FF;
}

body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
  min-width: 320px;
}
</style>
