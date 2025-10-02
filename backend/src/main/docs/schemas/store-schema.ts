export const storeSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '507f1f77bcf86cd799439011'
    },
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
    },
    created_at: {
      type: 'string',
      format: 'date-time',
      example: '2024-01-15T10:30:00.000Z'
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
      example: '2024-01-15T10:30:00.000Z'
    }
  },
  required: ['id', 'name', 'cnpj', 'state', 'city', 'address']
}
