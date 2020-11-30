export const types = {
  'UPLOAD_IMAGE': 'uploadImage'
}

export interface Image {
  "status"?: number,
  "message"?: string,
  "imageUrl"?: string
}

export interface ImageState {
  readonly data?: Image
}

export enum ImageActionType {
  SUCCESS = 'uploadedImage',
  FAILED = 'failedUploading'
}
