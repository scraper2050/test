export enum QBActionTypes {
    GET_QB_ACCOUNTS = 'GET_QB_ACCOUNTS',
}

export interface IQBCurrenyRef {
    value: string
    name: string
}

export interface QBAccounts {

    Name: string
    SubAccount: boolean
    FullyQualifiedName: string
    Active: boolean
    Classification: string
    AccountType: string
    AccountSubType: string
    CurrentBalance: number
    CurrentBalanceWithSubAccounts: number
    CurrencyRef: any
    domain: string
    sparse: boolean
    Id: string
    SyncToken: string
    MetaData: any
}

export interface QBAccountsState {
    loading: boolean;
    loadingObj: boolean;
    error: string;
    accounts: QBAccounts[];
    accountsObj: QBAccounts
}
