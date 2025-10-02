import components from './components'
import paths from './paths'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Campanha Polgo API',
    description: 'API para gerenciamento de lojas e ganhadores da Campanha Polgo',
    version: '1.0.0',
    contact: {
      name: 'API Support'
    }
  },
  license: {
    name: 'ISC',
    url: 'https://opensource.org/licenses/ISC'
  },
  servers: [{
    url: '/api/v1',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Lojas',
    description: 'Operações relacionadas às lojas participantes da campanha'
  }, {
    name: 'Ganhadores',
    description: 'Operações relacionadas aos ganhadores da campanha'
  }],
  paths,
  schemas,
  components
}
