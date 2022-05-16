import styles from './bc-job-request-modal.styles';
import {
  Button, DialogActions,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, {useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatDate,
  formatTime,
} from 'helpers/format';
import { getJobRequestDescription } from 'helpers/job';
import styled from 'styled-components';
import '../../../scss/job-poup.scss';
import classNames from "classnames";
import BCDragAndDrop from "../../components/bc-drag-drop/bc-drag-drop";
import BCMapWithMarker from 'app/components/bc-map-with-marker/bc-map-with-marker';
import {
  closeModalAction,
  openModalAction,
  setModalDataAction
} from "../../../actions/bc-modal/bc-modal.action";
import {modalTypes} from "../../../constants";
import {getContacts} from "../../../api/contacts.api";

const initialJobRequestState = {
  customer: {
    _id: '',
  },
  description: '',
  employeeType: false,
  equipment: {
    _id: '',
  },
  dueDate: '',
  scheduleDate: null,
  scheduledEndTime: null,
  scheduledStartTime: null,
  technician: {
    _id: '',
  },
  contractor: {
    _id: '',
  },
  ticket: {
    _id: '',
  },
  type: {
    _id: '',
  },
  jobLocation: {
    _id: '',
  },
  jobSite: {
    _id: '',
  },
  jobRescheduled: false,
};

function BCViewJobRequestModal({
  classes,
  jobRequest = initialJobRequestState,
}: any): JSX.Element {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state: any) => state.contacts);
  const customerContact =
    jobRequest.customerContact && contacts.find((contact :any) => contact.userId === jobRequest.customerContact._id)?.name

  useEffect(() => {
    const data: any = {
      type: 'Customer',
      referenceNumber: jobRequest.customer._id,
    };
    dispatch(getContacts(data));
  }, []);

  const dueDate = jobRequest.dueDate;
  // TODO make sure canEdit
  const canEdit = [0, 4, 6].indexOf(jobRequest.status) >= 0;
  let positionValue: {lat?:number;long?:number} = {};
  if(jobRequest.jobSite?.location?.coordinates?.length === 2){
    positionValue.long = jobRequest.jobSite.location.coordinates[0];
    positionValue.lat = jobRequest.jobSite.location.coordinates[1];
  } else if (jobRequest.jobLocation?.location?.coordinates?.length === 2) {
    positionValue.long = jobRequest.jobLocation.location.coordinates[0];
    positionValue.lat = jobRequest.jobLocation.location.coordinates[1];
  }

  const openRejectJobRequestModal = () => {
    dispatch(setModalDataAction({
      'data': {
        jobRequest: jobRequest,
        modalTitle: 'Request Rejection',
      },
      'type': modalTypes.REJECT_JOB_REQUEST_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const createJob= () => {
    dispatch(setModalDataAction({
      'data': {
        'job': {
          'customer': {
            '_id': ''
          },
          'description': '',
          'employeeType': false,
          'equipment': {
            '_id': ''
          },
          'scheduleDate': null,
          'scheduledEndTime': null,
          'scheduledStartTime': null,
          'technician': {
            '_id': ''
          },
          ticket: {
            ...jobRequest,
            tasks: [],
            note: jobRequest.requests?.filter((request:any)=>request.note).map((request:any)=>request.note).join('\n\n'),
            images: jobRequest.requests?.map((request:any)=>request.images||[]).flat(1) || [],
          },
          'type': {
            '_id': ''
          },
          'jobFromRequest': true,
        },
        'modalTitle': 'Create Job',
        'removeFooter': false,
      },
      'type': modalTypes.EDIT_JOB_MODAL
    }));
  }

  const handleClose = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  return (
    <DataContainer className={'new-modal-design'}>
      <Grid container className={'modalPreview'} justify={'space-around'}>
        <Grid item xs>
          <Typography variant={'caption'} className={'previewCaption'}>customer</Typography>
          <Typography variant={'h6'} className={'bigText'}>{jobRequest.customer?.profile?.displayName || 'N/A'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={'previewCaption'}>due date</Typography>
          <Typography variant={'h6'} className={'previewTextTitle'}>{dueDate ? formatDate(dueDate) : 'N/A'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={'previewCaption'}>category</Typography>
          <Typography variant={'h6'} className={'previewTextTitle'} style={{textTransform: 'capitalize'}}>{getJobRequestDescription(jobRequest)}</Typography>
        </Grid>
      </Grid>
      <div className={'modalDataContainer'}>
        <Grid container className={'modalContent'} justify={'space-around'}>
          <Grid item xs={12} sm={4}>
            <TopMarginedContainer>
              <Typography variant={'caption'} className={'previewCaption'}>{'Subdivision'}</Typography>
              <Typography>{jobRequest.jobLocation?.name || 'N/A'}</Typography>
            </TopMarginedContainer>
            <TopMarginedContainer>
              <Typography variant={'caption'} className={'previewCaption'}>{'Contact Associated'}</Typography>
              <Typography>{customerContact || 'N/A'}</Typography>
            </TopMarginedContainer>
            <TopMarginedContainer>
              <Typography variant={'caption'} className={'previewCaption'}>{'Customer PO'}</Typography>
              <Typography>{jobRequest.customerPO || 'N/A'}</Typography>
            </TopMarginedContainer>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TopMarginedContainer>
              <div className={classNames(classes.paper, classes.mapWrapper)}>
                <BCMapWithMarker
                  lang={positionValue.long}
                  lat={positionValue.lat}
                />
              </div>
            </TopMarginedContainer>
          </Grid>
        </Grid>
        <Grid container className={'modalContent'} justify={'space-around'}>
          <Grid item xs={12}>
            <TopMarginedContainer>
              <div style={{borderBottom: '1px solid #bdbdbd'}}/>
            </TopMarginedContainer>
          </Grid>
        </Grid>
        {jobRequest.requests.map((request: any, requestIndex: number, arr:Array<any>) =>
          <>
            <Grid container className={'modalContent'} justify={'space-around'}>
              <Grid item xs={12} sm={8}>
                <Typography variant={'caption'} className={'previewCaption'}>{`Job Request ${requestIndex+1}`}</Typography>
                <Typography variant={'h6'} className={'previewText'}>{request.category}</Typography>
              </Grid>
              <Grid item xs={12} sm={4} />
            </Grid>
            <Grid container className={classNames(['modalContent','modalContentBottom'])} justify={'space-around'}>
              <Grid item xs={12} sm={8}>
                <Typography variant={'caption'} className={'previewCaption'}>{'Notes'}</Typography>
                <Typography>
                  {request.note}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant={'caption'} className={'previewCaption'}>photo(s)</Typography>
                <BCDragAndDrop images={request.images?.length ? request.images.map((image: any) => image.imageUrl) : []} readonly={true}  />
              </Grid>
            </Grid>
            <Grid container className={'modalContent'} justify={'space-around'}>
              <Grid item xs={12}>
                {requestIndex !== arr.length-1 && <div style={{borderBottom: '1px solid #bdbdbd'}}/>}
              </Grid>
            </Grid>
          </>
        )}
        {jobRequest.status !== 4 &&
        <DialogActions>
          <Button
            onClick={handleClose}
            variant={'outlined'}
          >
            Close
          </Button>
          <Button
            onClick={openRejectJobRequestModal}
            variant={'contained'}
            classes={{
              root: classes.purpleButton
            }}
          >
            Reject Request
          </Button>
          <Button
            color={'primary'}
            onClick={createJob}
            variant={'contained'}
          >
            Create Job
          </Button>
        </DialogActions>
        }
      </div>
    </DataContainer>
  );
}

const DataContainer = styled.div`
  margin: auto 0;

  .modalContent {
    padding-top: 15px !important;
  }
  .modalContentBottom {
    padding-bottom: 15px !important;
  }

  .MuiTableCell-root {
    line-height: normal;
  }

  .MuiTableCell-sizeSmall {
    padding: 0px 16px;
  }

  .MuiButton-containedSecondary {
    margin-left: 15px !important;
}

`;

const TopMarginedContainer = styled.div`
  margin-top: 30px;
`

export default withStyles(styles, { withTheme: true })(BCViewJobRequestModal);
