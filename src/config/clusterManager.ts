import cluster from 'cluster';
import { cpus } from 'os';

import { logger } from '@/logging/logger.js';

import { httpServer } from '../app.js';

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
