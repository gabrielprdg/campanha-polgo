export const storePath = {
  post: {
    tags: ['Lojas'],
    summary: 'API para criar uma nova loja',
    description: 'Cria uma nova loja no sistema com os dados fornecidos',
    security: [{
      bearerAuth: []
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addStoreParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Loja criada com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/store'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  get: {
    tags: ['Lojas'],
    summary: 'API para listar todas as lojas',
    description: 'Retorna uma lista com todas as lojas cadastradas no sistema',
    responses: {
      200: {
        description: 'Lista de lojas retornada com sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/store'
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

export const storeByIdPath = {
  get: {
    tags: ['Lojas'],
    summary: 'API para buscar uma loja por ID',
    description: 'Retorna os dados de uma loja específica através do seu ID',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID da loja',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Loja encontrada com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/store'
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
    tags: ['Lojas'],
    summary: 'API para atualizar uma loja',
    description: 'Atualiza os dados de uma loja específica através do seu ID',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID da loja',
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
                example: 'Loja Centro Atualizada'
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
                example: 'Rua das Flores, 456'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Loja atualizada com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/store'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
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
    tags: ['Lojas'],
    summary: 'API para deletar uma loja',
    description: 'Remove uma loja específica do sistema através do seu ID',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID da loja',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      204: {
        $ref: '#/components/noContent'
      },
      401: {
        $ref: '#/components/unauthorized'
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
