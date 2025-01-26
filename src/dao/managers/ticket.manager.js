import ticketModel from '../models/ticket.model.js';

class TicketManager {
  constructor() {
    this.tickets = [];
  }

  async createTicket(ticketData) {
    try {
      const newTicket = await ticketModel.create(ticketData);
      return newTicket;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw new Error('Failed to create ticket');
    }
  }

  async getTickets() {
    try {
      const tickets = await ticketModel.find();
      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw new Error('Failed to fetch tickets');
    }
  }

  async getTicketById(ticketId) {
    try {
      const ticket = await ticketModel.findById(ticketId);
      if (!ticket) {
        throw new Error('Ticket not found');
      }
      return ticket;
    } catch (error) {
      console.error('Error fetching ticket by ID:', error);
      throw new Error('Failed to fetch ticket');
    }
  }

  async updateTicket(ticketId, updatedData) {
    try {
      const updatedTicket = await ticketModel.findByIdAndUpdate(ticketId, updatedData, { new: true });
      if (!updatedTicket) {
        throw new Error('Ticket not found');
      }
      return updatedTicket;
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw new Error('Failed to update ticket');
    }
  }

  async deleteTicket(ticketId) {
    try {
      const deletedTicket = await ticketModel.findByIdAndDelete(ticketId);
      if (!deletedTicket) {
        throw new Error('Ticket not found');
      }
      return deletedTicket;
    } catch (error) {
      console.error('Error deleting ticket:', error);
      throw new Error('Failed to delete ticket');
    }
  }
}

export default TicketManager;
