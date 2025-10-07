export const winnerAggregationByStateSchema = {
  type: 'object',
  properties: {
    state: {
      type: 'string',
      description: 'Sigla do estado',
      example: 'SP'
    },
    count: {
      type: 'number',
      description: 'Quantidade de ganhadores no estado',
      example: 15
    }
  },
  required: ['state', 'count']
}
