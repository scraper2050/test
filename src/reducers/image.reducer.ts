import { Reducer } from 'redux';
import { ImageState, ImageActionType } from './../actions/image/image.types';

const initialImage: ImageState = {
  data: undefined
}

export const ImageReducer: Reducer<any> = (state = initialImage, action) => {
  switch (action.type) {
    case ImageActionType.SUCCESS:
      return {
        data: action.payload,
      }
    default:
  }
  return state;
}
