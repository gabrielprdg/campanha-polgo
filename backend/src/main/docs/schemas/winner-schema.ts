export const winnerSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '507f1f77bcf86cd799439011'
    },
    name: {
      type: 'string',
      example: 'João Silva'
    },
    state: {
      type: 'string',
      example: 'SP'
    },
    city: {
      type: 'string',
      example: 'São Paulo'
    },
    prize: {
      type: 'string',
      example: 'R$ 10.000,00'
    },
    date: {
      type: 'string',
      format: 'date-time',
      example: '2024-01-15T10:30:00.000Z'
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
  required: ['id', 'name', 'state', 'city', 'prize', 'date']
}
