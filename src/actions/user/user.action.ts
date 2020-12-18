import { updateCompanyProfile, getCompanyProfile } from 'api/user.api';
import { CompanyProfile, CompanyProfileRes, CompanyProfileActonType } from '../../actions/user/user.types'

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
      dispatch({ type: CompanyProfileActonType.LOADING, payload: false });
      dispatch({ type: CompanyProfileActonType.FETCH_SUCCESS, payload: response.company });
    }
  }
}
