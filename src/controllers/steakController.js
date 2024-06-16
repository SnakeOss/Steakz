const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getSteaks = async (req, res, next) => {
  try {
    const steaks = await prisma.steak.findMany();
    res.json(steaks);
  } catch (error) {
    next(error);
  }
};

exports.createSteak = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const steak = await prisma.steak.create({
      data: { name, price }
    });
    res.status(201).json(steak);
  } catch (error) {
    next(error);
  }
};

exports.getSteakById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const steak = await prisma.steak.findUnique({
      where: { id: Number(id) }
    });
    if (steak) {
      res.json(steak);
    } else {
      res.status(404).json({ error: 'Steak not found' });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateSteak = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const steak = await prisma.steak.update({
      where: { id: Number(id) },
      data: { name, price }
    });
    res.json(steak);
  } catch (error) {
    next(error);
  }
};

exports.deleteSteak = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.steak.delete({
      where: { id: Number(id) }
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
