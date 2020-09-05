import {TaxsActionType} from '../../reducers/tax.type'

export const getSalesTax = () => {
    return {
        type: TaxsActionType.GET
    }
}
