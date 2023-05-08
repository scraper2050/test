import { CircularProgress } from '@material-ui/core';
import { ICurrentLocation } from 'actions/filter-location/filter.location.types';
import React from 'react';
import { useSelector } from 'react-redux';

function BCCircularLoader({ heightValue = '100vh', size= 50 }: any): JSX.Element {
  const currentLocation:  ICurrentLocation = useSelector((state: any) => state.currentLocation.data);

  return (
    <div style={{
      'alignItems': 'center',
      'display': 'flex',
      'height': heightValue,
      'justifyContent': 'center',
      "flexDirection": "column",
      "gap": "10px"
    }}>
      <CircularProgress size={size} />
      { currentLocation.locationId &&
        <div>
          Viewing: {currentLocation.name}
        </div>
      }
    </div>
  );
}

export default BCCircularLoader;
