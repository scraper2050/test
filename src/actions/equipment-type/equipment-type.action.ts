import { getEquipmentType as fetchEquipmentType } from 'api/equipment-type.api';
import { EquipmentTypeActionType } from './equipment-type.types';

export const loadingEquipmentType = () => {
   return {
      type: EquipmentTypeActionType.GET
   }
}

export const getEquipmentType = () => {
   return async (dispatch: any) => {
      const equipmentType: any = await fetchEquipmentType();
      dispatch(setEquipmentType(equipmentType));
   };
}

export const setEquipmentType = (equipmentType: any) => {
   return {
      type: EquipmentTypeActionType.SET,
      payload: equipmentType
   }
}