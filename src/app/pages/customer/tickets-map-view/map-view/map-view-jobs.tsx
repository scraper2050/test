import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import { useDispatch, useSelector } from 'react-redux';
import BCMapFilterModal from '../../../../modals/bc-map-filter/bc-map-filter-jobs-popup/bc-map-filter-jobs-popup';
import { DatePicker } from '@material-ui/pickers';
import {
  refreshServiceTickets,
  setOpenServiceTicket,
  setOpenServiceTicketLoading
} from 'actions/service-ticket/service-ticket.action';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import { formatDateYMD } from 'helpers/format';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import Pagination from '@material-ui/lab/Pagination';
import { info, warning } from 'actions/snackbar/snackbar.action';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import { getAllJobsAPI, getSearchJobs } from 'api/job.api';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { getCustomerDetail } from 'api/customer.api';

const PAGE_SIZE = 6;

function MapViewJobsScreen({ classes, today }: any) {
  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(-1);
  const [filterJobs, setFilterJobs] = useState({
    'customerNames': '',
    'jobId': ''
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [dateValue, setDateValue] = useState<any>(null);
  const [tempDate, setTempDate] = useState<any>(new Date());
  const [page, setPage] = useState(1);
  const [paginatedJobs, setPaginatedJobs] = useState<any>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>({});

  const openTicketFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };


  const resetDate = () => {
    setDateValue(null);
    setTempDate(new Date());
  };

  const filterScheduledJobs = (jobs: any) => {
    return jobs.filter((job: any) => job && job.status !== 2);
  };

  useEffect(() => {
    const rawData = {
      'customerNames': '',
      'jobId': ''
      // Today: false,
    };
    const requestObj = { ...rawData,
      'page': 1,
      'pageSize': 0 };
    getScheduledJobs(requestObj);
  }, []);

  const getScheduledJobs = async (
    requestObj: {
      page?: number,
      pageSize?: number,
      customerNames?: any,
      jobId?: string,
      // Today?: boolean,
    }
  ) => {
    setIsLoading(true);
    const response: any = await getSearchJobs(requestObj);

    const { data } = response;


    if (data.status) {
      setJobs(filterScheduledJobs(data.jobs));
      setTotalJobs(data.total);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    const offset = (page - 1) * PAGE_SIZE;

    const paginatedItems = jobs.slice(offset).slice(0, PAGE_SIZE);

    setPaginatedJobs([...paginatedItems]);
    setTotalItems(jobs.length);
  }, [jobs]);


  const handleButtonClickMinusDay = () => {
    const dateObj = new Date(tempDate);
    const yesterday = new Date(dateObj.getTime() - 24 * 60 * 60 * 1000);
    const formattedDate = formatDateYMD(yesterday);

    setDateValue(formattedDate);
    setTempDate(yesterday);


    const filteredDateJobs = jobs.filter((job: any) => formatDateYMD(job.scheduleDate) === formattedDate);

    setPage(1);

    const offset = (1 - 1) * PAGE_SIZE;

    const paginatedItems = filteredDateJobs.slice(offset).slice(0, PAGE_SIZE);

    setTotalItems(filteredDateJobs.length);
    setPaginatedJobs([...paginatedItems]);
  };

  const handleButtonClickPlusDay = () => {
    const dateObj = new Date(tempDate);
    const tomorrow = new Date(dateObj.getTime() + 24 * 60 * 60 * 1000);
    const formattedDate = formatDateYMD(tomorrow);

    setDateValue(formattedDate);
    setTempDate(tomorrow);

    const filteredDateJobs = jobs.filter((job: any) => formatDateYMD(job.scheduleDate) === formattedDate);

    setPage(1);

    const offset = (1 - 1) * PAGE_SIZE;

    const paginatedItems = filteredDateJobs.slice(offset).slice(0, PAGE_SIZE);

    setTotalItems(filteredDateJobs.length);
    setPaginatedJobs([...paginatedItems]);
  };

  const getOpenTickets = (requestObj: {
    pageNo?: number,
    pageSize?: number,
    jobTypeTitle?: string,
    dueDate?: string,
    customerNames?: any,
    ticketId?: string,
    companyId?: string
  }) => {
    dispatch(setOpenServiceTicketLoading(true));
    getOpenServiceTickets(requestObj).then((response: any) => {
      dispatch(setOpenServiceTicketLoading(false));
      dispatch(setOpenServiceTicket(response));
      dispatch(refreshServiceTickets(true));
      dispatch(closeModalAction());
      setTimeout(() => {
        dispatch(setModalDataAction({
          'data': {},
          'type': ''
        }));
      }, 200);
    })
      .catch((err: any) => {
        throw err;
      });
  };


  const dateChangeHandler = (date: string) => {
    const dateObj = new Date(date);
    const formattedDate = formatDateYMD(dateObj);

    const filteredDateJobs = jobs.filter((job: any) => formatDateYMD(job.scheduleDate) === formattedDate);

    setDateValue(dateObj);
    setTempDate(date);

    setPage(1);

    const offset = (1 - 1) * PAGE_SIZE;

    const paginatedItems = filteredDateJobs.slice(offset).slice(0, PAGE_SIZE);

    setTotalItems(filteredDateJobs.length);
    setPaginatedJobs([...paginatedItems]);
  };


  const handleJobCardClick = async (JobObj: any, index: any) => {
    const prevItemKey = localStorage.getItem('prevItemKey');
    const currentItem = document.getElementById(`openScheduledJob${index}`);
    if (prevItemKey) {
      const prevItem = document.getElementById(prevItemKey);
      if (prevItem) {
        prevItem.style.border = 'none';
      }
      if (currentItem) {
        currentItem.style.border = `1px solid #00aaff`;
        localStorage.setItem('prevItemKey', `openScheduledJob${index}`);
      }
    } else if (currentItem) {
      currentItem.style.border = `1px solid #00aaff`;
      localStorage.setItem('prevItemKey', `openScheduledJob${index}`);
    }

    if (JobObj.ticket.image) {
      setHasPhoto(true);
    } else {
      setHasPhoto(false);
    }

    const customer = await getCustomerDetail({
      'customerId': JobObj.customer._id
    });

    if (customer?.jobLocations === undefined && customer?.location?.coordinates.length === 0 || customer?.jobLocation === undefined && customer?.location === undefined) {
      dispatch(warning('There\'s no address on this job.'));
    }

    setSelectedJob({ ...JobObj,
      customer });
  };

  const resetDateFilter = async () => {
    setPage(1);
    resetDate();
    setSelectedJob({});

    const rawData = {
      'customerNames': '',
      'jobId': ''
    };
    const requestObj = { ...rawData,
      'page': 1,
      'pageSize': 0 };

    getScheduledJobs(requestObj);
  };

  const handleChange = (event: any, value: any) => {
    setSelectedJob({});
    setPage(value);
    const requestObj = { ...filterJobs,
      'page': 1,
      'pageSize': 0 };
    getScheduledJobs(requestObj);
  };

  /*
   * If (isLoading) {
   *   return <BCCircularLoader heightValue={'200px'} />
   * }
   */

  return (
    <Grid
      container
      item
      lg={12} >
      <Grid
        className={'ticketsMapContainer'}
        container
        item
        lg={6}>
        {
          <MemoizedMap
            hasPhoto={hasPhoto}
            list={jobs}
            onJob
            selected={selectedJob}
          />
        }
      </Grid>

      <Grid
        container
        item
        lg={6} >
        <div className={'ticketsFilterContainer'}>
          <div className={'filter_wrapper'}>
            <button onClick={() => openTicketFilterModal()}>
              <i className={'material-icons'} >
                {'filter_list'}
              </i>
              <span>
                {'Filter'}
              </span>
            </button>
            {
              showFilterModal
                ? <ClickAwayListener onClickAway={openTicketFilterModal}>
                  <div className={'dropdown_wrapper elevation-5'}>
                    <BCMapFilterModal
                      getScheduledJobs={getScheduledJobs}
                      openTicketFilterModal={openTicketFilterModal}
                      resetDate={resetDate}
                      setPage={setPage}
                    />
                  </div>
                </ClickAwayListener>
                : null
            }
          </div>
          <span className={`${dateValue == null ? 'datepicker_wrapper datepicker_wrapper_default' : 'datepicker_wrapper'}`}>
            <button className={'prev_btn'}>
              <i
                className={'material-icons'}
                onClick={() => handleButtonClickMinusDay()}>
                {'keyboard_arrow_left'}
              </i>
            </button>
            <DatePicker
              autoOk
              className={classes.picker}
              disablePast={false}
              format={'d MMM yyyy'}
              id={`datepicker-${'scheduleDate'}`}

              inputProps={{
                'name': 'scheduleDate',
                'placeholder': 'Scheduled Date'
              }}
              inputVariant={'outlined'}
              name={'scheduleDate'}
              onChange={(e: any) => dateChangeHandler(e)}
              required={false}
              value={dateValue}
              variant={'inline'}
            />
            <button className={'next_btn'}>
              <i
                className={'material-icons'}
                onClick={() => handleButtonClickPlusDay()}>
                {'keyboard_arrow_right'}
              </i>
            </button>
          </span>
          <button onClick={() => resetDateFilter()}>
            <i className={'material-icons'}>
              {'undo'}
            </i>
            {' '}
            <span>
              {'Reset'}
            </span>
          </button>
        </div>
        <div className={'ticketsCardViewContainer'}>
          {
            isLoading
              ? <div style={{
                'display': 'flex',
                'width': '100%',
                'justifyContent': 'center'
              }}>
                <BCCircularLoader heightValue={'200px'} />
              </div>
              : paginatedJobs.map((x: any, i: any) =>
                <div
                  className={'ticketItemDiv'}
                  id={`openScheduledJob${i}`}
                  key={i}
                  onClick={() => handleJobCardClick(x, i)}>
                  <div className={'ticket_title'}>
                    <h3>
                      {x.customer && x.customer.profile && x.customer.profile.displayName ? x.customer.profile.displayName : ''}
                    </h3>
                  </div>
                  <div className={'location_desc_container'}>
                    <div className={'card_location'}>
                      <h4>
                        {x.jobLocation && x.jobLocation.name ? x.jobLocation.name : ` `}
                      </h4>
                    </div>

                    <div className={'card_desc'}>
                      <p>
                        {x.type ? x.type.title : ''}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className={'card-footer'}>
                    <span>
                      {' '}
                      <i className={'material-icons'}>
                        {'access_time'}
                      </i>
                      {x.scheduleDate ? new Date(x.scheduleDate).toString()
                        .substr(0, 15) : ''}
                    </span>
                  </div>
                </div>)


          }
        </div>
        <Pagination
          color={'primary'}
          count={Math.ceil(totalItems / PAGE_SIZE)}
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      </Grid>

    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewJobsScreen);
