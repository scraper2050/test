import {withStyles} from '@material-ui/core';
import React, { useEffect } from 'react';
import styles from './view-more.styles';
import { useLocation } from 'react-router-dom';
import {
  openModalAction,
  setModalDataAction
} from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../scss/index.scss';
import { modalTypes } from '../../../../constants';

function LocationInfoPage({ classes }: any) {
  const dispatch = useDispatch();
  const location = useLocation();

  const renderLocationInfo = () => {
    const baseObj: any = location.state;

    const locationName = baseObj.name;
    const lat = baseObj.location.coordinates[1];
    const long = baseObj.location.coordinates[0];

    const {street = '', city = '', state = '', zipcode = ''} = baseObj.address || {};
    const address =street;
    const address1 =`${city}${city && state ? ', ' : ''}${state} ${zipcode}`;


    const locationObj = {
      customerName: baseObj.customerName,
      locationName,
      address,
      address1,
      lat,
      long,
      isActive: baseObj.isActive,
    };
    return locationObj;
  };

  const handleEditClick = () => {
    dispatch(setModalDataAction({
      'data': {
        'locationObj': location.state,
        'modalTitle': 'Edit Subdivision',
        'removeFooter': false
      },
      'type': modalTypes.ADD_JOB_LOCATION
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const locationData = renderLocationInfo();
  return (
    <div className={'customer_info_container'}>
      <div className={'customer_info_wrapper'}>

        <div className={'customer_container'}>
          <div className={classes.customerName}>
            <strong>
              {'Customer Name: '}
              {' '}
            </strong>
            &nbsp;
            {locationData.customerName}
          </div>
          <div className={'name_wrapper customer_details'}>
            <strong>
              {'Location Name: '}&nbsp;
            </strong>
            {locationData.locationName}
          </div>
          <div className={'customer_details'}>
            <strong>
              {'Latitude:'}
              {' '}
            </strong>
            {' '}
            {locationData.lat}
          </div>
          <div className={'customer_details'}>
            <strong>
              {'Address:'}
              {' '}
            </strong>
            {' '}
            {locationData.address ? locationData.address : locationData.address1 ? '' : 'N/A'}
            {locationData.address && <br/>}
            {locationData.address1}
          </div>
          <div className={'customer_details'}>
            <strong>
              {'Longitude:'}
              {' '}
            </strong>
            {' '}
            {locationData.long}
          </div>
          <div className={'customer_details'}>
            <strong>
              {'Status:'}
              {' '}
            </strong>
            {' '}
            <span className={`${locationData.isActive ? '' : classes.inactiveStyle}`}>
              {locationData.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div
          className={'edit_button'}
          onClick={() => handleEditClick()}>
          <button className={'MuiFab-primary'}>
            <i className={'material-icons'}>
              {'edit'}
            </i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(LocationInfoPage);
