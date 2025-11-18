import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const router = Router();

const TaskCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default(''),
});

const TaskUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'COMPLETED']).optional(),
});

router.get('/', async (_req, res) => {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const parse = TaskCreateSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const { title, description } = parse.data;
  const task = await prisma.task.create({ data: { title, description } });
  res.status(201).json(task);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const parse = TaskUpdateSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  try {
    const task = await prisma.task.update({ where: { id }, data: parse.data });
    res.json(task);
  } catch (e) {
    res.status(404).json({ error: 'Not found' });
  }
});

router.patch('/:id/toggle', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ error: 'Not found' });
  const status = existing.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
  const task = await prisma.task.update({ where: { id }, data: { status } });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  try {
    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    res.status(404).json({ error: 'Not found' });
  }
});

export default router;
