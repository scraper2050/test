import { CompanyCardsActionType } from './company-cards.types';

export const loadingCompanyCards = () => {
  return {
    type: CompanyCardsActionType.GET
  }
}

export const setCompanyCards = (companyCards: any) => {
  return {
    payload: companyCards,
    type: CompanyCardsActionType.SET
  }
}

export const updateCompanyCard = () => {
  return {
    type: CompanyCardsActionType.UPDATE
  }
}

export const deleteCompanyCard = () => {
  return {
    type: CompanyCardsActionType.DELETE
  }
}

