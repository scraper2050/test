import { types } from "./filter.location.types"

export const setCurrentLocation = (selectedLocation: any) => {
    return {
        payload: selectedLocation,
        type: types.SET_CURRENT_LOCATION
    }
}