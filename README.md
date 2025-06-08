
# 📦 Estoque Project

Sistema completo de controle de estoque com **Frontend (React.js)**, **Backend (Node.js + Express)** e **Aplicativo Mobile (Android com Kotlin Multiplatform)**. O projeto é integrado a um banco de dados **PostgreSQL**, fornecendo um CRUD funcional para gerenciamento de equipamentos.

---

## 🚀 Tecnologias Utilizadas

### 💻 Frontend (React)
- Vite + React.js
- React Router DOM
- Axios
- TailwindCSS

### 🔧 Backend (Node.js)
- Express.js
- CORS e Body-parser
- PostgreSQL via `pg`
- Bcrypt para hash de senhas
- Rotas RESTful

### 📱 Mobile (Android - Kotlin Multiplatform)
- Android Studio
- Kotlin com Ktor para requisições HTTP
- Compose para UI moderna
- Integração com API REST

### 🗄️ Banco de Dados (PostgreSQL)
- Script SQL incluso para criação das tabelas

```sql
CREATE TABLE equipamentos (
    id SERIAL PRIMARY KEY,
    equipamento VARCHAR(255),
    quantidade INT,
    data DATE
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    matricula INT,
    email VARCHAR(255),
    senha VARCHAR(255)
);
```

---

## 🧪 Funcionalidades

- ✅ Cadastro de equipamentos
- ✅ Visualização de todos os registros
- ✅ Edição de equipamentos existentes
- ✅ Exclusão de equipamentos
- ✅ Cadastro e autenticação de usuários
- ✅ Interface Mobile integrada à API

---

## 🛠️ Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Guuhlima/Estoque-project.git
cd Estoque-project
```

---

### 2. Backend (Node.js)

```bash
cd backend
npm install
npm run dev
```

- Porta padrão: `http://localhost:4000`

---

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

- Porta padrão: `http://localhost:5173`

---

### 4. Mobile (Android Studio)

1. Abra o projeto `Estoque-mobile` no Android Studio.
2. Certifique-se de que o emulador ou dispositivo esteja conectado.
3. Execute o app (`Run > Run 'app'`).

> 🔥 **Importante:** se estiver usando `http://10.0.2.2` no mobile, mantenha o backend rodando na máquina host (localhost da máquina).

---

## ⚠️ Possíveis Erros & Soluções

| Erro | Solução |
|------|---------|
| `CLEARTEXT communication to 10.0.2.2 not permitted` | Adicione uma política de rede no AndroidManifest.xml |
| `Serializer for class 'Equipamento' is not found` | Verifique se `@Serializable` está aplicado e o plugin de serialização está no `build.gradle.kts` |
| `Network Error` | Verifique se a API backend está rodando e acessível no IP correto |

---

## 📂 Estrutura de Pastas

```
Estoque-project/
├── backend/              # API Node.js
├── frontend/             # React Web App
├── Estoque-mobile/       # App Android (KMP)
├── README.md             # Este arquivo
```

---

## 🤝 Contribuição

1. Fork este repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça commit das suas alterações: `git commit -m 'feat: nova funcionalidade'`
4. Faça push: `git push origin minha-feature`
5. Abra um Pull Request

---

## 🧠 Autor

Feito por [Gustavo Lima](https://github.com/Guuhlima)

---

## 📄 Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).

---
