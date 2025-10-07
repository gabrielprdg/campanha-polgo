# Campanha Polgo

API para gerenciamento de lojas e ganhadores da Campanha Polgo.

## 🚀 Tecnologias

- Node.js + TypeScript
- Express
- MongoDB
- Docker & Docker Compose
- Swagger/OpenAPI 3.0

## 📋 Pré-requisitos

- Docker (opcional, mas recomendado)
- Docker Compose (opcional)
- Node.js 20.19+ ou 22.12+ (para desenvolvimento local)
- MongoDB (para desenvolvimento local sem Docker)

## ⚡ Quick Start

### Desenvolvimento Local (Recomendado)

```bash
# 1. Clone o repositório
git clone <repository-url>
cd campanha-polgo

# 2. Configure o Backend
cd backend
cp .env.example .env
# Edite backend/.env conforme necessário
npm install
npm run dev

# 3. Configure o Frontend (em outro terminal)
cd ../frontend
cp .env.example .env
# Edite frontend/.env conforme necessário
npm install
npm run dev
```

**URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Docs (Swagger): http://localhost:3000/api-docs

### Com Docker

```bash
# 1. Clone e configure
git clone <repository-url>
cd campanha-polgo

# 2. Crie os arquivos .env
cd backend && cp .env.example .env
cd ../frontend && cp .env.example .env
cd ..

# 3. Execute com Docker Compose
docker-compose up -d
```

## 🔧 Configuração Detalhada

### 1. Clone o repositório

```bash
git clone <repository-url>
cd campanha-polgo
```

### 2. Configure as variáveis de ambiente

A aplicação requer arquivos `.env` separados para o **backend** e **frontend**.

#### Backend (.env)

Crie o arquivo de variáveis de ambiente do backend:

```bash
cd backend
cp .env.example .env
```

Edite o arquivo `backend/.env` com suas configurações:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/campanha-polgo
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=http://localhost:5173
API_VERSION=v1
```

**Variáveis explicadas:**
- `NODE_ENV`: Ambiente de execução (development/production)
- `PORT`: Porta do servidor backend (padrão: 3000)
- `MONGODB_URI`: String de conexão com MongoDB
  - Para desenvolvimento local: `mongodb://localhost:27017/campanha-polgo`
  - Para Docker: `mongodb://admin:admin123@mongodb:27017/campanha-polgo?authSource=admin`
- `JWT_SECRET`: Chave secreta para tokens JWT (altere em produção)
- `CORS_ORIGIN`: URL do frontend permitida (padrão: http://localhost:5173)
- `API_VERSION`: Versão da API (padrão: v1)

#### Frontend (.env)

Crie o arquivo de variáveis de ambiente do frontend:

```bash
cd ../frontend
cp .env.example .env
```

Edite o arquivo `frontend/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:3000
```

**Variáveis explicadas:**
- `VITE_API_URL`: URL base da API backend
  - Desenvolvimento local: `http://localhost:3000`
  - Produção: URL do seu servidor backend

⚠️ **Importante**:
- Variáveis do frontend devem começar com `VITE_` para serem expostas no navegador
- Nunca coloque informações sensíveis (senhas, tokens) no `.env` do frontend
- Os arquivos `.env` estão no `.gitignore` e não devem ser commitados

## 🐳 Docker

### Pré-requisitos para Docker

Antes de executar com Docker, certifique-se de:

1. **Configurar as variáveis de ambiente** conforme descrito na seção anterior
2. **Criar os arquivos `.env`** em `backend/.env` e `frontend/.env`
3. **Atualizar o `MONGODB_URI`** no `backend/.env` para usar o nome do serviço Docker:
   ```env
   MONGODB_URI=mongodb://admin:admin123@mongodb:27017/campanha-polgo?authSource=admin
   ```

### Executar com Docker Compose (se disponível)

Se você tiver um arquivo `docker-compose.yml`:

```bash
# Iniciar todos os serviços (backend, frontend, MongoDB)
docker-compose up -d

# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs apenas do backend
docker-compose logs -f backend

# Ver logs apenas do frontend
docker-compose logs -f frontend

# Parar os serviços
docker-compose down

# Reconstruir e iniciar os containers
docker-compose up -d --build
```

### Executar containers individualmente

#### Backend com Docker

```bash
cd backend

# Build da imagem
docker build -t campanha-polgo-backend .

# Executar container
docker run -d \
  --name campanha-polgo-backend \
  -p 3000:3000 \
  --env-file .env \
  campanha-polgo-backend

# Ver logs
docker logs -f campanha-polgo-backend

# Parar container
docker stop campanha-polgo-backend
docker rm campanha-polgo-backend
```

#### Frontend com Docker

```bash
cd frontend

# Build da imagem
docker build -t campanha-polgo-frontend .

# Executar container
docker run -d \
  --name campanha-polgo-frontend \
  -p 5173:5173 \
  --env-file .env \
  campanha-polgo-frontend

# Ver logs
docker logs -f campanha-polgo-frontend

# Parar container
docker stop campanha-polgo-frontend
docker rm campanha-polgo-frontend
```

#### MongoDB com Docker

```bash
# Executar MongoDB
docker run -d \
  --name campanha-polgo-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  -v mongodb_data:/data/db \
  mongo:latest

# Acessar MongoDB shell
docker exec -it campanha-polgo-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin
```

## 📚 Documentação da API

Após iniciar a aplicação, você pode acessar a documentação interativa da API (Swagger/OpenAPI) de duas formas:

### Via Docker (recomendado)

```
http://localhost:3000/api-docs
```

### Desenvolvimento local

1. Certifique-se de que o backend está rodando:
```bash
cd backend
npm run dev
```

2. Acesse a documentação em:
```
http://localhost:3000/api-docs
```

A documentação Swagger permite:
- Visualizar todos os endpoints disponíveis
- Testar as requisições diretamente pelo navegador
- Ver os schemas de request/response
- Entender os códigos de status HTTP retornados

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

#### Backend

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

4. Build:
```bash
npm run build
```

5. Executar testes:
```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Verificar tipos TypeScript
npm run typecheck
```

#### Frontend

1. Instale as dependências:
```bash
cd frontend
npm install
```

2. Configure o arquivo `.env`:
```bash
cp .env.example .env
```

3. Execute em modo desenvolvimento:
```bash
npm run dev
```
O frontend estará disponível em `http://localhost:5173`

4. Build:
```bash
npm run build
```

5. Preview do build:
```bash
npm run preview
```

6. Verificar tipos TypeScript:
```bash
npm run type-check
```

7. Lint e correção automática:
```bash
npm run lint
```

## 📝 Licença

ISC
