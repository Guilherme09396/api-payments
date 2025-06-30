# 💸 API Payments

API REST para gerenciamento de cobranças, desenvolvida com **Node.js**, **Fastify** e **TypeScript**, utilizando **Prisma** como ORM e **PostgreSQL** como banco de dados. O projeto conta com validações com **Zod**, testes automatizados com **Vitest** e estrutura modular em camadas.

---

## 🚀 Funcionalidades

- ✅ Criação de cobranças
- ✅ Listagem de cobrança por id
- ✅ Listagem de cobranças
- ✅ Criação de pagamentos
- ✅ Listagem de pagamentos
- ✅ Simulação de webhook
- ✅ Logs dos disparos do webhook
- ✅ Validação de dados com Zod
- ✅ Testes automatizados com Vitest

---

## 🧪 Tecnologias utilizadas

- **Node.js**  
- **TypeScript**  
- **Fastify** – Framework web leve e performático  
- **Prisma** – ORM moderno para PostgreSQL  
- **PostgreSQL** – Banco de dados relacional  
- **Zod** – Validação de esquemas de entrada  
- **Vitest** – Testes unitários  
- **Docker** – Containerização  
- **Git** – Controle de versão
- **Swagger** - Documentação

---

## 📁 Estrutura de pastas
    ├── src/
        ├── http/
            ├── controllers/
            ├── routes.ts

        ├── lib/
            ├── prisma/
            ├── index.ts
        ├── repositories/
        ├── services/
        ├── app.ts
        ├── server.ts


- **controllers/**: camadas de entrada das requisições HTTP  
- **services/**: lógica de negócios  
- **repositories/**: acesso ao banco de dados via Prisma  
- **routes.ts**: definição das rotas da aplicação  


---

## 🧰 Como rodar o projeto localmente

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL
- Docker
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Guilherme09396/api-payments.git
cd api-payments

# Instale as dependências
npm install

# Configure o banco de dados
# se for rodar com o docker, só manter as mesmas configurações
cp .env.example .env

# suba o container do postgresql
docker compose up -d

# Rode as migrations
npx prisma migrate dev

# Inicie o servidor
npm start
```

## 🛣️ Acesse para testar e ver a documentação 
[Clique aqui para acessar](https://api-payments-x6oe.onrender.com/api/docs)

## 🌍 Usar com API Remota (Deploy)
[Clique aqui para acessar ( URL Base )](https://api-payments-x6oe.onrender.com/api)



👨‍💻 Autor

Guilherme Gomes

Desenvolvedor Backend Júnior

🔗 [LinkedIn](https://www.linkedin.com/in/guilherme-gomes-alves/)

📧 guilherme09397@gmail.com

> Este projeto foi desenvolvido como parte do meu portfólio pessoal. Fique à vontade para entrar em contato ou sugerir melhorias!