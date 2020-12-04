import { EquipmentTypeActionType, EquipmentTypeState } from './../actions/equipment-type/equipment-type.types';
import { Reducer } from 'redux';

const initialEquipmentType: EquipmentTypeState = {
   loading: false,
   data: []
}

export const EquipmentTypeReducer: Reducer<any> = (state = initialEquipmentType, action) => {
   switch (action.type) {
      case EquipmentTypeActionType.GET:
         return {
            loading: true,
            data: initialEquipmentType,
         };
      case EquipmentTypeActionType.SUCCESS:
         return {
            loading: false,
            data: [...action.payload],
         }
      case EquipmentTypeActionType.SET:
         return {
            loading: false,
            data: [...action.payload],
         }
      case EquipmentTypeActionType.FAILED:
         return {
            ...state,
            loading: false,
            error: action.payload,
         }
   }
   return state;
}

