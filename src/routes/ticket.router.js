import express from 'express';
import TicketManager from '../managers/ticketManager.js';

const router = express.Router();
const ticketManager = new TicketManager();

// Create a new ticket
router.post('/', async (req, res) => {
  try {
    const ticketData = req.body;
    const newTicket = await ticketManager.createTicket(ticketData);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await ticketManager.getTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await ticketManager.getTicketById(ticketId);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update a ticket by ID
router.put('/:id', async (req, res) => {
  try {
    const ticketId = req.params.id;
    const updatedData = req.body;
    const updatedTicket = await ticketManager.updateTicket(ticketId, updatedData);
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a ticket by ID
router.delete('/:id', async (req, res) => {
  try {
    const ticketId = req.params.id;
    const deletedTicket = await ticketManager.deleteTicket(ticketId);
    res.status(200).json(deletedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
