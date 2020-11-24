import { updateCompanyProfile } from 'api/user.api';
import { CompanyProfile, CompanyProfileRes, CompanyProfileActonType } from '../../actions/user/user.types'

export const updateCompanyProfileAction = (formData: CompanyProfile) => {
  return async (dispatch: any) => {
    const response: CompanyProfileRes = await updateCompanyProfile(formData);
    if (response.hasOwnProperty('message')) {
      dispatch({ type: CompanyProfileActonType.FAILED, payload: response.message });
    } else {
      dispatch({ type: CompanyProfileActonType.SUCCESS, payload: response });
    }
  }
}
