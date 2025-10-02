export const addStoreParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Loja Centro'
    },
    cnpj: {
      type: 'string',
      example: '12.345.678/0001-90'
    },
    state: {
      type: 'string',
      example: 'SP'
    },
    city: {
      type: 'string',
      example: 'São Paulo'
    },
    address: {
      type: 'string',
      example: 'Rua das Flores, 123'
    }
  },
  required: ['name', 'cnpj', 'state', 'city', 'address']
}
