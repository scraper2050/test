import {
  MapTechnicianFilterActionType,
} from './map-technician-filter.types';


export const resetMapTechnicianFilter = () => {
  return {
    'type': MapTechnicianFilterActionType.RESET
  };
};

export const applyMapTechnicianFilter = (filterOption: any) => {
  return {
    'type': MapTechnicianFilterActionType.APPLY,
    'payload': filterOption
  };
};
