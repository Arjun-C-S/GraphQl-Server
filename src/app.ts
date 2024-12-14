import { Server } from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import cors from 'cors';
import express from 'express';

import { resolvers } from '@/graphql/resolvers/index.js';
import { typeDefs } from '@/graphql/typedefs/index.js';
import { apiRequestLogger } from '@/logging/logger.js';
import { errorHandler } from '@/middlewares/globalErrorHandler.js';
import { rootRouter } from '@/routes/index.js';
import { formatError } from '@/utils/graphqlErrorFormat.js';

import { authenticateJWT } from './middlewares/jwtValidator.js';
import { socketConnecter } from './middlewares/socket.js';

const app = express();

const httpServer = new Server(app);

// Attach Socket.IO to the HTTP server for real-time communication
socketConnecter(httpServer);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    cache: new InMemoryLRUCache(),
});

await server.start();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRequestLogger);

app.get('/health', (_req, res) => {
    return res.send('healthy');
});

// GraphQL endpoint with JWT authentication and context setup
app.use('/graphql', authenticateJWT, expressMiddleware(server, { context: async ({ req }) => ({ req }) }));

app.use('/v1', rootRouter);

app.use(errorHandler);

export { httpServer };
