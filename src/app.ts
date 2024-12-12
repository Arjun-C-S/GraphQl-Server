import cors from 'cors';
import express from 'express';

import { apiRequestLogger } from '@/logging/logger.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRequestLogger);

app.get('/health', (_req, res) => {
    return res.send('healthy');
});

export { app };
