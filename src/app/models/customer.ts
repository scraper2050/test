export interface Customer {
  _id: string;
  info: CustomerInfo;
  profile: Profile;
  address: Address;
  contact: Contact;
  // isActive: boolean;
  // company: string;
  contactName: string;
  __t: string;
}
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
export interface CustomerInfo {
  email: string;
}
export interface Contact {
  name: string;
  phone: string;
}
export interface Profile {
  displayName: string;
  firstName: string;
  lastNameName: string;
}