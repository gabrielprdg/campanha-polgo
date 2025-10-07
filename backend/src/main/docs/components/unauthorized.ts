export const unauthorized = {
  description: 'Credenciais inválidas ou token ausente',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string'
          }
        }
      }
    }
  }
}
