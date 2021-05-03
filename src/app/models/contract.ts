export interface Contract {
  _id: string,
  company: string,
  contractor: string,
  type: string
}

export type Status = 'accepted' | 'cancelled' | 'invitation' | 'rejected'
