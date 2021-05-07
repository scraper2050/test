export interface Contract {
  _id: string,
  company: string,
  contractor: string,
  type: string
}

export const editableStatus = [0, 1]; // Pending, accepted

