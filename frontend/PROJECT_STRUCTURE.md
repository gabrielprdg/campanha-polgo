# Campanha Promocional - Frontend

## Estrutura do Projeto

Este projeto foi desenvolvido com Vue.js 3, Vite e TypeScript, seguindo as especificações do desafio. A aplicação é uma Single Page Application (SPA) responsiva focada em uma campanha promocional.

## Tecnologias Utilizadas

- **Vue.js 3** - Framework progressivo para interfaces de usuário
- **Vite** - Build tool rápido e moderno
- **TypeScript** - Tipagem estática opcional (implementada)
- **Vue Router** - Roteamento para SPAs
- **ESLint** - Linting para qualidade de código

## Estrutura de Componentes

```
src/
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue      # Cabeçalho com navegação
│   │   └── AppFooter.vue      # Rodapé da aplicação
│   ├── sections/
│   │   ├── HeroSection.vue    # Seção principal com banner
│   │   ├── AboutSection.vue   # Seção sobre a campanha
│   │   ├── PromotionsSection.vue # Seção de ofertas
│   │   └── ContactSection.vue # Seção de contato
│   └── ui/                    # Componentes de interface (para futuras expansões)
├── types/
│   └── index.ts              # Definições de tipos TypeScript
├── services/                 # Serviços para API (estrutura preparada)
└── composables/             # Composables Vue (estrutura preparada)
```

## Funcionalidades Implementadas

### ✅ Seções Obrigatórias
- **Hero Section**: Banner principal com call-to-action
- **About Section**: Informações sobre a campanha
- **Promotions Section**: Grid de produtos em promoção
- **Contact Section**: Formulário de contato e informações

### ✅ Navegação e UX
- Navegação ancorada suave entre seções
- Header fixo com backdrop blur
- Menu responsivo para dispositivos móveis
- Animações CSS engajantes

### ✅ Responsividade
- Design mobile-first
- Grid system adaptativo
- Componentes otimizados para diferentes tamanhos de tela

### ✅ Performance e Qualidade
- TypeScript para tipagem estática
- ESLint configurado
- Build otimizado com Vite
- Componentes modulares e reutilizáveis

## Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## Próximos Passos

A estrutura está preparada para:

1. **Integração com API**: Diretório `services/` pronto para implementação
2. **Estado Global**: Estrutura preparada para Pinia/Vuex se necessário
3. **Componentes UI**: Diretório `ui/` para biblioteca de componentes
4. **Testes**: Estrutura preparada para Vue Test Utils
5. **PWA**: Configuração para Progressive Web App

## Arquitetura Escalável

O projeto foi estruturado pensando em escalabilidade:

- **Separação de responsabilidades**: Layout, seções e UI separados
- **Tipagem TypeScript**: Interface bem definida
- **Componentes modulares**: Fácil manutenção e reutilização
- **Convenções consistentes**: Padrões de nomenclatura e estrutura

Esta base sólida permite expansões futuras mantendo a qualidade e organização do código.