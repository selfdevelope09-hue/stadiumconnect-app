import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all vendors
router.get('/', async (req, res) => {
  try {
    const { category, city } = req.query;
    
    const vendors = await prisma.vendor.findMany({
      where: {
        ...(category && { category: category as string }),
        ...(city && { city: city as string })
      },
      orderBy: { rating: 'desc' }
    });
    
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single vendor
router.get('/:id', async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: req.params.id },
      include: { reviews: { include: { user: true } } }
    });
    
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Create vendor
router.post('/', async (req, res) => {
  try {
    const vendor = await prisma.vendor.create({ data: req.body });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Update vendor
router.put('/:id', async (req, res) => {
  try {
    const vendor = await prisma.vendor.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Delete vendor
router.delete('/:id', async (req, res) => {
  try {
    await prisma.vendor.delete({ where: { id: req.params.id } });
    res.json({ message: 'Vendor deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
