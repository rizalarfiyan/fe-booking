export interface IContact {
  contactId: number
  firstName: string
  lastName: string
  email: string
  phone: string
  submittedAt: string
}

export interface IContactDetail extends IContact {
  message: string
}
