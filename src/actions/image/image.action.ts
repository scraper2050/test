import { upload } from 'api/image.api';
import { ImageActionType } from '../../actions/image/image.types'

export const uploadImage = (formData: any) => {
  return async (dispatch: any) => {
    const imageResponse: any = await upload(formData);
    if (imageResponse.hasOwnProperty('ErrMsg')) {
      dispatch({ type: ImageActionType.FAILED, payload: imageResponse.ErrMsg });
    } else {
      dispatch({ type: ImageActionType.SUCCESS, payload: imageResponse });
    }
  }
}
