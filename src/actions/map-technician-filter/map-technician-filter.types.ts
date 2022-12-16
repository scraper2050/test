export interface MapTechnicianFilterState {
    selectedTechnician: {id:any; name:any}[];
    jobDate: any;
}

export enum MapTechnicianFilterActionType {
    RESET = 'resetMapTechnicianFilter',
    APPLY = 'applyMapTechnicianFilter',
}
