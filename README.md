# Personal Portfolio Full Stack Mini Project

## Technologies

- React
- React Router
- Node.js
- Express
- Sequelize ORM
- MySQL
- Vite

## Main Features

- Home
- About
- Projects
- Contact
- Admin Login
- Admin Dashboard
- Dynamic Projects from MySQL
- Contact messages stored in MySQL
- Complete CRUD for Projects

## Project CRUD

### Create
`POST /api/projects`

### Read all
`GET /api/projects`

### Read one
`GET /api/projects/:id`

### Update
`PUT /api/projects/:id`

### Delete
`DELETE /api/projects/:id`

## Database

The backend expects MySQL with:

- database: `database_development`
- username: `root`
- password: `jeepsy`
- host: `127.0.0.1`

Change `backend/config/config.json` if your MySQL settings are different.

## Setup

### 1. Create the database

Open MySQL and run:

```sql
CREATE DATABASE database_development;
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Run migrations

```bash
npx sequelize-cli db:migrate
```

### 4. Add demo data

```bash
npx sequelize-cli db:seed:all
```

### 5. Start backend

```bash
node server.js
```

Backend:

`http://localhost:5000`

### 6. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 7. Start frontend

```bash
npm run dev
```

Open the Vite URL shown in the terminal.

## Admin Login

Email:

`admin@portfolio.com`

Password:

`admin123`

## Important

This is a BCA academic mini project. The login uses a simple password comparison to demonstrate Express routes and Sequelize querying. A production application should use password hashing and proper authentication/session or token handling.
