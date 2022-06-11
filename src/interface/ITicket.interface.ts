export interface ITicketSchema {
  subtotal?: number
  total?: number
  active?: number
  deleted_at?: Date
}

export interface ITicket extends ITicketSchema {
  id?: number
}
