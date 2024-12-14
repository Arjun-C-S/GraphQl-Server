# GraphQL & Socket.IO Server

This project is a Node.js application built with TypeScript that serves as both a GraphQL API server and a Socket.IO server. The server allows you to interact with resources in real time through subscriptions and provides a clean and scalable GraphQL API.

## Features

- **GraphQL API**: Built using Apollo Server to manage queries, mutations, and subscriptions.
- **Socket.IO Integration**: Real-time updates and subscriptions using Socket.IO.
- **TypeScript**: Strongly-typed code with TypeScript.
- **JWT Authentication**: Secure access to resources using JSON Web Tokens.
- **MongoDB Integration**: Managed data using Mongoose.
- **Logging**: Powered by Winston for structured logging.
- **Prettier & ESLint**: Code formatting and linting setup for consistency and best practices.
- **Commitlint & Husky**: Enforced commit message conventions.

## Requirements

- Node.js >= 20.0.0
- MongoDB instance for data storage

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Arjun-C-S/GraphQl-Server.git
cd graphql-server
```

### 2. Install Dependencies

Install both production and development dependencies.

```bash
pnpm install
```

### 3. Setup Environment Variables

Create a .env file in the root directory and add the following environment variables:

```bash
PORT=4000
MONGO_URI=mongodb://localhost:27017/yourdb
JWT_SECRET=your-secret-key
```

## Development Setup

### 1. Start the Development Server

To start the development server with hot-reloading:

```bash
npm run start
```

### 2. Build the Project

To compile TypeScript files and apply aliases:

```bash
npm run build
```

### 3. Lint and Format Code

Run the following commands to lint and format the code:

- Lint code:

```bash
npm run lint
```

- Format code:

```bash
npm run format
```

## Production Setup

### 1. Start the Server in Production Mode

To run the server in production, use the following command:

```bash
npm run start:prod
```

Make sure you have already built the project using npm run build before running it in production mode.

## Dependencies
- @apollo/server: Apollo Server for handling GraphQL requests.
- cors: Middleware to enable Cross-Origin Resource Sharing.
- dotenv: Load environment variables from a .env file.
- express: Web framework to serve GraphQL and Socket.IO.
- graphql: Library for building GraphQL schemas and queries.
- jsonwebtoken: Handle JWT authentication.
- mongoose: MongoDB ODM for data management.
- socket.io: Real-time communication via WebSockets.
- winston: A versatile logging library.
- zod: Schema validation for input data.

## Development Dependencies

- eslint: Linter to ensure code quality.
- husky: Git hook manager for commit linting and pre-commit hooks.
- prettier: Code formatter for consistent styling.
- tsx: TypeScript execution and hot-reloading during development.
- typescript: TypeScript support for the project.
- tsc-alias: Handle TypeScript path aliases.

## Acknowledgments
- Apollo Server for GraphQL API implementation.
- Socket.IO for real-time communication.
- TypeScript for type safety.