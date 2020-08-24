export interface GroupModel {
  _id: string;
  title: string;
  company: string;
  manager: Manager;
  members: Member[];
}

export interface Manager {
  _id: string;
  auth: Auth;
  profile: Profile;
  address: Address;
  contact: Contact;
  permissions: Permissions;
  info: Info;
  company: string;
}

export interface Auth {
  email: string;
  password: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  displayName: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Contact {
  phone: string;
}

export interface Permissions {
  role: number;
}

export interface Info {
  companyName: string;
  logoUrl: string;
  industry: string;
}

export interface Member {
  _id: string;
  auth: Auth2;
  profile: Profile2;
  address: Address2;
  contact: Contact2;
  permissions: Permissions2;
  info: Info2;
  company: string;
}

export interface Auth2 {
  email: string;
  password: string;
}

export interface Profile2 {
  firstName: string;
  lastName: string;
  displayName: string;
}

export interface Address2 {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Contact2 {
  phone: string;
}

export interface Permissions2 {
  role: number;
}

export interface Info2 {
  companyName: string;
  logoUrl: string;
  industry: string;
}
