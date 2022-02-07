import request from 'utils/http.service';


// export const getItems = async () => {
//   try {
//     const response: any = await request('/getItems', 'POST', false);
//     return response.data;
//   } catch (err) {
//     if (err.response.status >= 400 || err.data.status === 0) {
//       throw new Error(err.data.errors ||
//             err.data.message ||
//             `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
//     } else {
//       throw new Error(`Something went wrong`);
//     }
//   }
// };

// export const updateItem = async (item:Item) => {
//   try {
//     const response: any = await request('/updateItem', 'POST', item, false);
//     return response.data;
//   } catch (err) {
//     if (err.response.status >= 400 || err.data.status === 0) {
//       throw new Error(err.data.errors ||
//             err.data.message ||
//             `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
//     } else {
//       throw new Error(`Something went wrong`);
//     }
//   }
// };


export const updateDiscount = async (items:any) => {
  try {
    const response: any = await request('/updateItems', 'POST', { 'items': JSON.stringify(items) }, false);
    return response.data;
  } catch (err) {
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
            err.data.message ||
            `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
};

export const addDiscount = async (item:any) => {
  try {
    const response: any = await request('/createJobType', 'POST', {title: item.name, description: item.description}, false);
    if(response.data.status === 0){
      throw response;
    }
    const responseUpdate: any = await request('/updateItems', 'POST', { 'items': JSON.stringify([{...item, itemId: response.data.item._id}]) }, false);
    if(responseUpdate.data.status === 0){
      throw responseUpdate;
    }
    return responseUpdate.data;
  } catch (err) {
    console.log(err)
    if (err?.response?.status >= 400 || err?.data?.status === 0) {
      throw new Error(err?.data?.errors ||
            err?.data?.message ||
            `${err?.data['err.user.incorrect']}\nYou have ${err?.data?.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
};


