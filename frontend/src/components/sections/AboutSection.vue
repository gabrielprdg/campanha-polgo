<template>
  <section id="about" class="about-section">
    <div class="container">
      <div class="section-header">
        <h2>Sobre Nossa Campanha</h2>
        <p>Conheça mais sobre nossa promoção especial e os benefícios exclusivos</p>
      </div>
      <div class="about-grid">
        <div class="about-content">
          <h3>Por que escolher nossa promoção?</h3>
          <p>
            Nossa campanha promocional foi cuidadosamente planejada para oferecer as melhores
            oportunidades de economia aos nossos clientes. Com descontos exclusivos e condições
            especiais, você encontra produtos de qualidade com preços imbatíveis.
          </p>
          <ul class="benefits-list">
            <li>✅ Descontos de até 70% em produtos selecionados</li>
            <li>✅ Frete grátis para compras acima de R$ 99</li>
            <li>✅ Parcialmente em até 12x sem juros</li>
            <li>✅ Garantia estendida em todos os produtos</li>
            <li>✅ Atendimento personalizado</li>
          </ul>
        </div>
        <div class="about-image">
          <div class="image-placeholder">
            <span>📦</span>
            <p>Produtos com Qualidade Garantida</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
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

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-content h3 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 1.5rem;
}

.about-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 2rem;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefits-list li {
  font-size: 1rem;
  color: #2d3748;
  margin-bottom: 0.75rem;
  padding-left: 0.5rem;
}

.about-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder {
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.image-placeholder span {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.image-placeholder p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 2rem;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-content h3 {
    font-size: 1.5rem;
  }

  .image-placeholder {
    padding: 2rem;
  }

  .image-placeholder span {
    font-size: 3rem;
  }
}
</style>