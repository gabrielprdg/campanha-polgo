export const serverError = {
  description: 'Erro Interno do Servidor',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
