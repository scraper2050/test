export interface UserModel {
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

export interface AuthInfo {
  token: string | null;
  user: Auth | null;
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
