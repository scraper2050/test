import { upload } from 'api/image.api';
import { Image, ImageActionType } from '../../actions/image/image.types'

export const uploadImage = (formData: FormData) => {
  return async (dispatch: any) => {
    const imageResponse: Image = await upload(formData);
    if (imageResponse.hasOwnProperty('message')) {
      dispatch({ type: ImageActionType.FAILED, payload: imageResponse.message });
    } else {
      dispatch({ type: ImageActionType.SUCCESS, payload: imageResponse });
    }
  }
}
