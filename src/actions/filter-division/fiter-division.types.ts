import { DivisionParams } from "app/models/division";

export const types = {
    'SET_CURRENT_LOCATION': 'set-current-location',
    'SET_DIVISION_PARAMS': 'set-division-params',
    "SET_IS_DIVISION_ACTIVATED": "set-is-division-feature-activated",
    "SET_DIVISION_URL_PARAMS": "set-division-url-params"
}

export interface ICurrentDivision{
    locationId?: string;
    workTypeId?: string;
    name?: string;
    employeeId?: string;
}

export interface IDivision{
    locationId?: string;
    workTypeId?: string;
    name?: string;
    employeeId?: string;
}

export interface ISelectedDivision{
    data?: IDivision;
    params?: DivisionParams;
    urlParams?: string;
    isDivisionFeatureActivated?: boolean;
}
