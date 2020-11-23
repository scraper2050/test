import { updateCompanyProfile } from 'api/user.api';
import { CompanyProfileActonType } from '../../actions/user/user.types'

export const updateCompanyProfileAction = (formData: any) => {
  return async (dispatch: any) => {
    const response: any = await updateCompanyProfile(formData);
    if (response.hasOwnProperty('ErrMsg')) {
      dispatch({ type: CompanyProfileActonType.FAILED, payload: response.ErrMsg });
    } else {
      dispatch({ type: CompanyProfileActonType.SUCCESS, payload: response });
    }
  }
}
