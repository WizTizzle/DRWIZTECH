// Local implementation of ticket creation
interface RepairDeskTicketData {
  answers: Record<string, string>;
  assessment: {
    severity: string;
    message: string;
  };
}

const LOCAL_STORAGE_KEY = 'wiztech_tickets';

export async function createRepairDeskTicket(data: RepairDeskTicketData) {
  // Generate a unique ticket ID
  const ticketId = `TICKET-${Date.now()}`;
  
  // Get existing tickets or initialize empty array
  const existingTickets = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  
  // Create new ticket
  const ticket = {
    id: ticketId,
    ...data,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  
  // Save to localStorage
  localStorage.setItem(
    LOCAL_STORAGE_KEY, 
    JSON.stringify([...existingTickets, ticket])
  );

  return { id: ticketId };
}

export function getTicket(id: string) {
  const tickets = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  return tickets.find((ticket: any) => ticket.id === id) || null;
}