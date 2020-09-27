export interface InventoryState {
    readonly loading: boolean
    readonly data?: any[]
    readonly error?: string
}

export enum InventoryActionType {
    GET = 'getInventory',
    SET = 'setInventory',
    SUCCESS = 'getInventorySuccess',
    FAILED = 'getInventoryFailed',
}