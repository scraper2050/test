import { updateCompanyProfile, getCompanyProfile } from 'api/user.api';
import { CompanyProfile, CompanyProfileRes, CompanyProfileActonType } from '../../actions/user/user.types'
import Geocode from "react-geocode";
import Config from "../../config";

export const updateCompanyProfileAction = (formData: CompanyProfile) => {
  return async (dispatch: any) => {
    dispatch({ type: CompanyProfileActonType.LOADING, payload: true });
    const response: CompanyProfileRes = await updateCompanyProfile(formData);
    if (response.hasOwnProperty('message')) {
      dispatch({ type: CompanyProfileActonType.LOADING, payload: false });
      dispatch({ type: CompanyProfileActonType.UPDATE_SUCCESS, payload: response });
    } else {
      dispatch({ type: CompanyProfileActonType.LOADING, payload: false });
      dispatch({ type: CompanyProfileActonType.ON_UPDATE_ERROR, payload: response.message });
    }
  }
}

export const getCompanyProfileAction = (companyId: string) => {
  return async (dispatch: any) => {
    dispatch({ type: CompanyProfileActonType.LOADING, payload: true });
    const response = await getCompanyProfile(companyId);

    if (response.hasOwnProperty('message')) {
      dispatch({ type: CompanyProfileActonType.LOADING, payload: false });
      dispatch({ type: CompanyProfileActonType.ON_FETCH_ERROR, payload: response.message });
    } else {
      Geocode.setApiKey(Config.REACT_APP_GOOGLE_KEY);
      const {street = '', city = '', state = '', zipCode = ''} = response.company.address || {};

      if (state ||  zipCode) {
        const address = `${street} ${city} ${state} ${zipCode} USA`;
        const mapResponse = await Geocode.fromAddress(address);
        const {lat, lng} = mapResponse?.results[0]?.geometry?.location || {};
        response.company.address.coordinates = {lat, lng};
      }

      dispatch({ type: CompanyProfileActonType.LOADING, payload: false });
      dispatch({ type: CompanyProfileActonType.FETCH_SUCCESS, payload: response.company });
    }
  }
}
