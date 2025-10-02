export const winnerPath = {
  post: {
    tags: ['Ganhadores'],
    summary: 'API para cadastrar um novo ganhador',
    description: 'Cadastra um novo ganhador da campanha com os dados fornecidos',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addWinnerParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Ganhador cadastrado com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/winner'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  get: {
    tags: ['Ganhadores'],
    summary: 'API para listar todos os ganhadores',
    description: 'Retorna uma lista com todos os ganhadores cadastrados no sistema',
    responses: {
      200: {
        description: 'Lista de ganhadores retornada com sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/winner'
              }
            }
          }
        }
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

export const winnerByIdPath = {
  get: {
    tags: ['Ganhadores'],
    summary: 'API para buscar um ganhador por ID',
    description: 'Retorna os dados de um ganhador específico através do seu ID',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do ganhador',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Ganhador encontrado com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/winner'
            }
          }
        }
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  patch: {
    tags: ['Ganhadores'],
    summary: 'API para atualizar um ganhador',
    description: 'Atualiza os dados de um ganhador específico através do seu ID',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do ganhador',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'João Silva'
              },
              state: {
                type: 'string',
                example: 'RJ'
              },
              city: {
                type: 'string',
                example: 'Rio de Janeiro'
              },
              prize: {
                type: 'string',
                example: 'R$ 15.000,00'
              },
              date: {
                type: 'string',
                format: 'date-time',
                example: '2024-02-20T14:00:00.000Z'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Ganhador atualizado com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/winner'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  delete: {
    tags: ['Ganhadores'],
    summary: 'API para deletar um ganhador',
    description: 'Remove um ganhador específico do sistema através do seu ID',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do ganhador',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      204: {
        $ref: '#/components/noContent'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
