import { config } from 'dotenv';

import { startCluster } from '@/config/clusterManager.js';
import { dbConnection } from '@/config/db.js';
import { logger } from '@/logging/logger.js';

import { httpServer } from './app.js';

/**
 * GraphQl + Socket.io server application
 *
 * This application serves as both a GraphQL server and a Socket.io server for real-time communication.
 * The server supports multi-threading in production using a cluster manager and listens on a single
 *  thread in development.
 *
 */

config();

dbConnection();

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {
    httpServer.listen(PORT, () => logger.info(`server is running ${PORT}`));
} else if (ENV === 'production') {
    startCluster(PORT);
}
