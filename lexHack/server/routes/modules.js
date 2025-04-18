import express from 'express';
import Module from '../models/Module.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const modules = await Module.find();
  res.json(modules);
});

export default router;
