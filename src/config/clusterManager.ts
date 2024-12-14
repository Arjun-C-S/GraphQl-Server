import cluster from 'cluster';
import { cpus } from 'os';

import { logger } from '@/logging/logger.js';

import { httpServer } from '../app.js';

/**
 * Cluster setup for Node.js server to utilize multiple CPU cores.
 *
 * This module handles the clustering of the application using Node's `cluster` module.
 * It creates a master process that forks a worker process for each CPU core available.
 * Each worker process runs an instance of the HTTP server. If a worker dies, a new one is forked.
 *
 */

const startCluster = (PORT: number) => {
    const numCpus = cpus().length;

    if (cluster.isPrimary) {
        logger.info(`Master thread is running on ${process.pid}`);
        for (let i = 0; i < numCpus; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, _code, _signal) => {
            logger.info(`Worker ${worker.process.pid} died. Forking a new worker.`);
            cluster.fork();
        });
    } else {
        httpServer.listen(PORT, () => {
            logger.info(`Worker ${process.pid} is running on port ${PORT}`);
        });
    }
};

export { startCluster };
