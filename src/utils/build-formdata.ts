const buildFormData = (formData: FormData, data: any, parentKey: any = null) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      if (key !== 'images')
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      else
        data.images.forEach((image: any) => formData.append(key, image))
    });
  } else {
    const value = data == null ? '' : data;
    formData.append(parentKey, value);
  }
}

export default buildFormData;
