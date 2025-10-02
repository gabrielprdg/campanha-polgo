export const addWinnerParamsSchema = {
  type: 'object',
  properties: {
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
    }
  },
  required: ['name', 'state', 'city', 'prize', 'date']
}
