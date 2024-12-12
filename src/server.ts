import { config } from 'dotenv';

import { startCluster } from '@/config/clusterManager.js';
import { dbConnection } from '@/config/db.js';
import { logger } from '@/logging/logger.js';

import { app } from './app.js';

config();

dbConnection();

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {
    app.listen(PORT, () => logger.info(`server is running ${PORT}`));
} else if (ENV === 'production') {
    startCluster(PORT);
}
