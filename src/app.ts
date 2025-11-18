import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks';

const app = express();

app.use(cors({ origin: '*'}));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/tasks', tasksRouter);

export default app;
