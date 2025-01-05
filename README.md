# Turborepo Monorepo with Shared PostgreSQL Database (Prisma, Next.js, Express.js)

This is a monorepo setup using **Turborepo** that includes a Next.js frontend and an Express.js backend. Both apps share a common **PostgreSQL** database, managed using **Prisma ORM**.

## Features

- **Next.js** for the frontend
- **Express.js** for the backend API
- **PostgreSQL** as the database
- **Prisma ORM** for database management
- Monorepo structure using **Turborepo**
- **TypeScript** for type safety
- **Redux** for centralized state management
- **TanStack Query** for optimized API calling

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/164sumit/todo-monorepo-shared-db.git
   cd todo-monorepo-shared-db
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the development server:
   ```sh
   npm run dev
   ```

4. Ensure the PostgreSQL database is up and running, and configure Prisma:
   ```sh
   npx prisma migrate dev
   ```

5. Access the Next.js frontend at `http://localhost:3000` and the Express.js API at `http://localhost:3001`.

## Additional Information

- This project uses **TypeScript** for type safety throughout both the frontend and backend.
- The **Next.js** frontend uses **Redux** to store all todo items in a centralized store.
- **TanStack Query** is used for optimizing API calls and ensuring efficient data fetching and state management.
- Make sure to configure your `.env` file with the necessary database connection strings and environment variables.

## Contributions

Feel free to open issues and submit pull requests. We appreciate all contributions to improve this project.


