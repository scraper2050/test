import { getPurchasedTags as fetchPurchasedTags } from 'api/tags.api';
import { PurchasedTagsActionType } from './tags.types';

export const loadingPurchasedTags = () => {
    return {
        type: PurchasedTagsActionType.GET
    }
}

export const getPurchasedTags = () => {
    return async (dispatch: any) => {
        const purchasedTags: any = await fetchPurchasedTags();
        dispatch(setPurchasedTags(purchasedTags));
    };
}

export const setPurchasedTags = (purchasedTags: any) => {
    return {
        type: PurchasedTagsActionType.SET,
        payload: purchasedTags
    }
}