export const types = {
  'GET_CONTRACTORS': 'getContractors',
  'SET_CONTRACTORS': 'setContractors',
  'SET_CONTRACTOR': 'setContractor',
  'UPDATE_CONTRACTOR': 'updateContractor',
  'SET_CONTRACTOR_LOADING': 'setContractorLoading',
  'SET_CONTRACTOR_PAYMENTS': 'setContractorPayments',
};

export interface Contractor {
  _id: string;
  type: string;
  vendor: string;
  email: string;
  phone: string;
  contact: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  balance: number;
  commission: number;
  commissionTotal: number;
  invoiceIds: string[];
}

export interface ContractorPayment {
  _id: string;
  vendor: {
    vendor: string;
    type: string;
    _id:string;
  };
  date: string;
  amount: number;
  method: string;
  reference: string;
  notes: string;
  balance: number;
  commission: number;
}

export interface PayrollState {
  readonly loading: boolean
  readonly contractors: Contractor[]
  readonly payments: ContractorPayment[]
  readonly data?: any[]
  readonly error?: string
  //readonly response?: string
  readonly contractorObj?: Contractor | {}
}

export enum PayrollActionType {
  GET = 'getContractors',
  SET = 'setContractors',
  LOADING = 'loading',
  SUCCESS = 'getContractorsSuccess',
  FAILED = 'getContractorsFailed',
  SET_SINGLE_Contractor = 'setSingleContractor',
  // GET_SINGLE_VENDOR = 'getSingleVendor',
}

// export interface Contractor {
//   _id: string;
//   info: {
//     companyName: string;
//     companyEmail: string;
//   };
//   address: {
//     street: string;
//     city: string;
//     state: string;
//     zipCode: string;
//   },
//   contact: {
//     phone: string;
//   },
//   balance: number;
//   commission: number;
//   type: string;
// }
