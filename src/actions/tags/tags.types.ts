export interface TagsState {
    readonly loading: boolean
    readonly data?: any[]
    readonly error?: string
}

export enum PurchasedTagsActionType {
    GET = 'getPurchasedTags',
    SET = 'setPurchasedTags',
    SUCCESS = 'getPurchasedTagsSuccess',
    FAILED = 'getPurchasedTagsFailed',
}