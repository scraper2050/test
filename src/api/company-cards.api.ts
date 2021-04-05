import request from '../utils/http.service';
import {
  loadingCompanyCards,
  setCompanyCards,
  updateCompanyCard,
  deleteCompanyCard
} from '../actions/company-cards/company-cards.action';

export const getCompanyCards = () => {
  return (dispatch: any) => {
    return new Promise(async (resolve, reject) => {
      dispatch(loadingCompanyCards());
      const response: any = await request('/getCompanyCards', 'POST', { test: 111 }, false);

      try {
        if (response.status === 200) {
          await dispatch(setCompanyCards(response.data.cards));
          return resolve(response.data);
        } else {

          await dispatch(setCompanyCards([]));
          return reject({ statusText: "Something went wrong" });
        }
      } catch (err) {
        await dispatch(setCompanyCards([]));
        return reject(err);
      }
    })
  }
}