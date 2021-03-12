import { Reducer } from "redux";
import {
  types,
  CompanyCardsState,
  CompanyCardsActionType
} from '../actions/company-cards/company-cards.types'

const initialCompanyCards: CompanyCardsState = {
  loading: false,
  data: [],
  refresh: true,
}

export const CompanyCardsReducer: Reducer<any> = (
  state = initialCompanyCards,
  action
) => {
  switch (action.type) {
    case CompanyCardsActionType.GET:
      return {
        ...state,
        loading: true,
      }
    case CompanyCardsActionType.SET:
      return {
        loading: false,
        refresh: false,
        data: [...action.payload],
      }
    case CompanyCardsActionType.UPDATE:
      return {
        ...state,
        refresh: true
      }
    case CompanyCardsActionType.DELETE:
      return {
        ...state,
        refresh: true
      }
  }
  return state;
}