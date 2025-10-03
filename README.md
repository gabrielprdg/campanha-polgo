# Campanha Polgo

API para gerenciamento de lojas e ganhadores da Campanha Polgo.

## 🚀 Tecnologias

- Node.js + TypeScript
- Express
- MongoDB
- Docker & Docker Compose
- Swagger/OpenAPI 3.0

## 📋 Pré-requisitos

- Docker
- Docker Compose

## 🔧 Configuração

1. Clone o repositório:
```bash
git clone <repository-url>
cd campanha-polgo
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env` com suas configurações:
```env
# Application
NODE_ENV=production
PORT=3000

# MongoDB Configuration
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=admin123
MONGO_DATABASE=campanha-polgo
MONGO_PORT=27017

# API Configuration
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://localhost:5173
API_VERSION=v1
```

## 🐳 Docker

### Iniciar os serviços

```bash
docker-compose up -d
```

### Parar os serviços

```bash
docker-compose down
```

### Ver logs

```bash
# Todos os serviços
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas MongoDB
docker-compose logs -f mongodb
```

### Reconstruir containers

```bash
docker-compose up -d --build
```

## 📚 Documentação da API

Após iniciar a aplicação, acesse a documentação interativa Swagger em:

```
http://localhost:3000/api-docs
```

## 🛣️ Endpoints

### Lojas
- `POST /api/v1/stores` - Criar nova loja
- `GET /api/v1/stores` - Listar todas as lojas
- `GET /api/v1/stores/:id` - Buscar loja por ID
- `PATCH /api/v1/stores/:id` - Atualizar loja
- `DELETE /api/v1/stores/:id` - Deletar loja

### Ganhadores
- `POST /api/v1/winners` - Cadastrar novo ganhador
- `GET /api/v1/winners` - Listar todos os ganhadores
- `GET /api/v1/winners/:id` - Buscar ganhador por ID
- `PATCH /api/v1/winners/:id` - Atualizar ganhador
- `DELETE /api/v1/winners/:id` - Deletar ganhador

## 🗄️ MongoDB

### Acessar MongoDB via CLI

```bash
docker exec -it campanha-polgo-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin
```

### Comandos úteis MongoDB

```javascript
// Usar database
use campanha-polgo

// Listar coleções
show collections

// Ver documentos
db.stores.find().pretty()
db.winners.find().pretty()
```

## 🔒 Segurança

- ⚠️ **IMPORTANTE**: Altere o `JWT_SECRET` e senhas do MongoDB antes de usar em produção
- Nunca commit o arquivo `.env` no repositório
- Use senhas fortes para o MongoDB em produção

## 📦 Estrutura do Projeto

```
campanha-polgo/
├── backend/
│   ├── src/
│   │   ├── domain/          # Entidades e casos de uso
│   │   ├── data/            # Implementação dos casos de uso
│   │   ├── infra/           # Infraestrutura (DB, etc)
│   │   ├── presentation/    # Controllers e validações
│   │   └── main/            # Configuração e rotas
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🧪 Desenvolvimento

### Desenvolvimento local (sem Docker)

1. Instale as dependências:
```bash
cd backend
npm install
```

2. Configure o `.env` apontando para MongoDB local

3. Execute em modo desenvolvimento:
```bash
npm run dev
```

### Build

```bash
npm run build
```

### Testes

```bash
npm test
```

## 📝 Licença

ISC
