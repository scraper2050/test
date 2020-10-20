export interface EquipmentTypeState {
   readonly loading: boolean
   readonly data?: any[]
   readonly error?: string
}

export enum EquipmentTypeActionType {
   GET = 'getEquipmentType',
   SET = 'setEquipmentType',
   SUCCESS = 'getEquipmentTypeSuccess',
   FAILED = 'getEquipmentTypeFailed',
}