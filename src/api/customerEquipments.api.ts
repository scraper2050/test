import request from "utils/http.service";
import {
  setCustomerEquipments,
  setCustomerEquipmentsLoading,
  refreshCustomerEquipments,
} from "actions/customer/customer-equipment/customer-equipment.action";

export const getCutomerEquipments = (data: any) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setCustomerEquipmentsLoading(true));
      request(`/getCustomerEquipments`, "post", data)
        .then((res: any) => {
          dispatch(setCustomerEquipments(res.data.equipments));
          dispatch(setCustomerEquipmentsLoading(false));
          dispatch(refreshCustomerEquipments(false));
          return resolve(res.data);
        })
        .catch((err) => {
          dispatch(setCustomerEquipmentsLoading(false));
          return reject(err);
        });
    });
  };
};