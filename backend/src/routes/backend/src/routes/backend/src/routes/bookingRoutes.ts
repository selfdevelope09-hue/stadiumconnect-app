import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Create booking
router.post('/', async (req, res) => {
  try {
    const { userId, vendorId, vendorName, eventDate, eventType, guestCount, amount } = req.body;
    
    const booking = await prisma.booking.create({
      data: {
        userId,
        vendorId,
        vendorName,
        eventDate: new Date(eventDate),
        eventType,
        guestCount,
        amount,
        status: 'pending'
      }
    });
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user bookings
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.params.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get vendor bookings
router.get('/vendor/:vendorId', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { vendorId: req.params.vendorId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
