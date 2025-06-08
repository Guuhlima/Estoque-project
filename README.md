# 📦 Estoque

Sistema de controle de estoque completo com **Frontend (React)**, **Backend (Node.js + Express)** e **Mobile (Android/Kotlin Multiplatform)**. Utiliza **PostgreSQL** como banco de dados.

---

## ✨ Tecnologias utilizadas

### 🔹 Frontend (React.js)
- Vite + React
- React Router DOM
- Axios para requisições HTTP
- TailwindCSS para estilização

### 🔹 Backend (Node.js)
- Express.js
- Cors, body-parser
- PostgreSQL com `pg`
- Rotas RESTful: `POST /cadastro`, `GET /visualizar`, `GET /visualizar/:id`, etc.

### 🔹 Mobile (Android Studio + Kotlin)
- KMP (Kotlin Multiplatform)
- Tela de cadastro com requisições HTTP usando Ktor
- Compatível com emulador e dispositivos reais

### 🔹 Banco de Dados
- PostgreSQL
- Script de criação da tabela incluído

CREATE TABLE equipamentos (
	ID SERIAL PRIMARY KEY,
	Equipamento VARCHAR(255) NULL,
	Quantidade INT(255) NULL,
	Data DATE NULL
)

CREATE TABLE usuarios (
	ID SERIAL PRIMARY KEY,
	Nome VARCHAR(255) NULL,
	Matricula INT(255) NULL,
	Email VARCHAR(255) NULL
	Senha VARCHAR(255) NULL
)

## 🚀 Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/Guuhlima/Estoque-project.git
cd Estoque-project
