export const types = {
  GET_COMPANY_CARDS: 'getCompanyCards',
  SET_COMPANY_CARDS: 'setCompanyCards',
  ADD_NEW_COMPANY_CARD: 'addNewCompanyCard',
  REMOVE_COMPANY_CARD: 'removeCompanyCard'
}

export interface CompanyCard {
  _id: string
  ending: string,
  expirationMonth: string,
  expirationYear: string,
  cardType: string
}


export interface CompanyCardsState {
  readonly loading: boolean
  readonly data: CompanyCard[] | []
  readonly refresh: boolean
}


export enum CompanyCardsActionType {
  GET = 'getCompanyCards',
  SET = 'setCompanyCards',
  FAILED = 'failedCompanyCards',
  UPDATE = 'updateCompanyCard',
  DELETE = 'deketeCompanyCard'
}