export const notFound = {
  description: 'Recurso Não Encontrado',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
