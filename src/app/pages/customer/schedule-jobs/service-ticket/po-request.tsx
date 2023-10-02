import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import InfoIcon from '@material-ui/icons/Info';
import {
  getServiceTicketDetail
} from 'api/service-tickets.api';
import { makeStyles } from '@material-ui/core/styles';
import * as CONSTANTS from '../../../../../../src/constants';
import { modalTypes } from '../../../../../constants';
import { formatDate, formatDateMMMDDYYYY } from 'helpers/format';
import styles from '../../customer.styles';
import { Checkbox, FormControlLabel, withStyles, Grid } from "@material-ui/core";
import React, { useEffect, useState, useRef } from 'react';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { setCurrentPageIndex, setCurrentPageSize, setKeyword, setIsHomeOccupied } from 'actions/po-request/po-request.action';
import { getCustomers } from 'actions/customer/customer.action';
import { useDispatch, useSelector } from 'react-redux';
import { clearJobSiteStore, getJobSites, loadingJobSites } from 'actions/job-site/job-site.action';
import { getAllJobTypesAPI } from 'api/job.api';
import "../../../../../scss/popup.scss";
import EditIcon from '@material-ui/icons/Edit';
import {
    CSButtonSmall,
    CSIconButton,
    useCustomStyles
} from "../../../../../helpers/custom";
import { error, warning } from "../../../../../actions/snackbar/snackbar.action";
import BCDateRangePicker, { Range }
    from "../../../../components/bc-date-range-picker/bc-date-range-picker";

import { ISelectedDivision } from 'actions/filter-division/fiter-division.types';
import { getAllPORequestsAPI } from 'api/po-requests.api';
import PopupMark from 'app/components/bc-bounce-email-tooltip/bc-popup-mark';

function PORequired({ classes, hidden }: any) {
    const filterIsHomeOccupied = useSelector((state: any) => state.PORequest.filterIsHomeOccupied);

    const dispatch = useDispatch();
    const currentDivision: ISelectedDivision = useSelector((state: any) => state.currentDivision);

    const customers = useSelector(({ customers }: any) => customers.data);
    const [showAllPORequests, toggleShowAllPORequests] = useState(false);
    const [bouncedEmailFlag, toggleBounceEmailFlag] = useState(false);
    const [selectionRange, setSelectionRange] = useState<Range | null>(null);
    const loadCount = useRef<number>(0);
    const customStyles = useCustomStyles(); 
    const { isLoading = true, po_request, refresh = true, total, prevCursor, nextCursor, currentPageIndex, currentPageSize, keyword } = useSelector(({ PORequest }: any) => ({
        isLoading: PORequest.isLoading,
        refresh: PORequest.refresh,
        po_request: PORequest.po_request,
        prevCursor: PORequest.prevCursor,
        nextCursor: PORequest.nextCursor,
        total: PORequest.total,
        currentPageIndex: PORequest.currentPageIndex,
        currentPageSize: PORequest.currentPageSize,
        keyword: PORequest.keyword,
    }));
    const filteredTickets = po_request.filter((ticket: any) => {
        let cond = true
        return cond;
    });
    const useStyles = makeStyles({
        root: {
            color: CONSTANTS.OCCUPIED_ORANGE,
            maxHeight: '20px',

            '&$checked': {
                color: CONSTANTS.OCCUPIED_ORANGE,
                maxHeight: '20px',
            },
        },
        checked: {},
    });
    const checkBoxClass = useStyles();

    const handleFilter = (filterIsHomeOccupied: boolean) => {
        dispatch(getAllPORequestsAPI(currentPageSize, currentPageIndex, showAllPORequests, keyword, selectionRange, currentDivision.params, bouncedEmailFlag,filterIsHomeOccupied));
    }

    const openEditTicketModal = (ticket: any) => {
        const reqObj = {
            customerId: ticket.customer?._id,
            locationId: ticket.jobLocation
        }
        if (reqObj.locationId !== undefined && reqObj.locationId !== null) {
            dispatch(loadingJobSites());
            dispatch(getJobSites(reqObj));
        } else {
            dispatch(clearJobSiteStore());
        }
        dispatch(getAllJobTypesAPI());
        ticket.updateFlag = true;
        dispatch(setModalDataAction({
            'data': {
                'modalTitle': 'Edit PO Request',
                'removeFooter': false,
                'ticketData': ticket,
                'className': 'serviceTicketTitle',
                'maxHeight': '900px',
            },
            'type': modalTypes.EDIT_TICKET_MODAL
        }));
        setTimeout(() => {
            dispatch(openModalAction());
        }, 200);
    };

    function Toolbar() {
        useEffect(() => {
            if (loadCount.current !== 0) {
                dispatch(getAllPORequestsAPI(currentPageSize, currentPageIndex, showAllPORequests, keyword, selectionRange, currentDivision.params, bouncedEmailFlag,filterIsHomeOccupied));
                dispatch(setCurrentPageIndex(0));
            }
        }, [showAllPORequests, bouncedEmailFlag]);

        useEffect(() => {
            if (loadCount.current !== 0) {
                dispatch(getAllPORequestsAPI(currentPageSize, currentPageIndex, showAllPORequests, keyword, selectionRange, currentDivision.params, bouncedEmailFlag,filterIsHomeOccupied));
                dispatch(setCurrentPageIndex(0));
            }
        }, [selectionRange]);
        return <>
           
            <div style={{ width: '320px', display: 'flex', justifyContent: "spacebetween", marginRight: '0px', paddingRight: '0px', marginLeft:"-25px" }} >
                <div  >
                    <Checkbox
                        checked={showAllPORequests}
                        onChange={() => {
                            dispatch(setCurrentPageIndex(0))
                            toggleShowAllPORequests(!showAllPORequests)
                        }}
                        name="checkedB"
                        color="primary"
                        id="DisplayAll"
                    />
                    <label htmlFor="DisplayAll" style={{ marginLeft: '-10px' }}>Show All</label>
                </div>

                <div >
                    <Checkbox
                        checked={bouncedEmailFlag}
                        onChange={() => {
                            dispatch(setCurrentPageIndex(0))
                            toggleBounceEmailFlag(!bouncedEmailFlag)
                        }}
                        name="checkedB"
                        color="primary"
                        id="BouncedEmails"
                    />
                    <label htmlFor="BouncedEmails" style={{ marginLeft: '-10px' }}>Bounced Emails</label>
                </div>

                <div >
                    <Checkbox
                        checked={filterIsHomeOccupied}
                        onChange={() => {
                            dispatch(setIsHomeOccupied(!filterIsHomeOccupied));
                            dispatch(setCurrentPageIndex(0));
                            handleFilter(!filterIsHomeOccupied)
                        }}
                        name="checkedB"
                        color="primary"
                        id="Occupied"
                    />
                    <label htmlFor="Occupied" style={{ marginLeft: '-10px' }}>Occupied</label>
                </div>
            </div>
            <div >
                <BCDateRangePicker
                    range={selectionRange}
                    onChange={(range: Range | null) => {
                        dispatch(setCurrentPageIndex(0))
                        setSelectionRange(range);
                    }}
                    showClearButton={true}
                    smallerView={true}
                    title={'Filter by Due Date...'}
                />
            </div>
            
        </>
    }

    const openDetailTicketModal = async (ticket: any) => {
        const { serviceTicket, status, message } = await getServiceTicketDetail(ticket._id);
        if (status === 1) {
            if (ticket.customerContactId) {
                serviceTicket.customerContactId = ticket.customerContactId
            }
            dispatch(setModalDataAction({
                'data': {
                    'modalTitle': 'PO Request Details',
                    'removeFooter': false,
                    'job': serviceTicket,
                    'className': 'serviceTicketTitle',
                },
                'type': modalTypes.VIEW_SERVICE_TICKET_MODAL
            }));
            setTimeout(() => {
                dispatch(openModalAction());
            }, 200);
        } else {
            dispatch(error(message));
        }
    };

    const columns: any = [
        {
            'Header': 'Ticket ID',
            'accessor': 'ticketId',
            'className': 'font-bold',
            'sortable': true,
        },
        {
            'Header': 'Due Date',
            'accessor': 'dueDate',
            'className': 'font-bold',
            'sortable': true,
            'Cell'({ row }: any) {
                let formattedDate = row.original.dueDate ? formatDate(row.original.dueDate) : '-';
                return (
                    <div>
                        {formattedDate}
                    </div>
                )
            }
        },
        {
            'Header': 'Customer',
            'accessor': 'customer.profile.displayName',
            'className': 'font-bold',
            'sortable': true
        },
        {
            Cell: ({ row }: any) => (
                <>
                    {row.original.lastEmailSent
                        ? formatDateMMMDDYYYY(row.original.lastEmailSent, true)
                        : 'N/A'}
                    {row.original.bouncedEmailFlag
                        ? <PopupMark
                            data={row.original.emailHistory}
                            endpoint={'/mark-as-read-po'}
                            params={{ 'id': row.original._id }}
                            callback={
                                getAllPORequestsAPI(currentPageSize, currentPageIndex, showAllPORequests, keyword, selectionRange, currentDivision.params, bouncedEmailFlag,filterIsHomeOccupied)
                            }
                        />
                        : ''}
                </>
            ),
            Header: 'Email Send Date',
            accessor: 'lastEmailSent',
            className: 'font-bold',
            sortable: true,
        }
        ,
        {
            'Cell'({ row }: any) {
                return <div className={'flex items-center'}>
                    <CSIconButton
                        //variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => openDetailTicketModal(row.original)}
                    >
                        <InfoIcon className={customStyles.iconBtn} />
                    </CSIconButton>
                    {row.original && row.original.status !== 1
                        ? <CSIconButton
                            //variant="contained"
                            color="primary"
                            size="small"
                            aria-label={'edit-ticket'}
                            onClick={(e) => {
                                e.stopPropagation();
                                openEditTicketModal(row.original);
                            }}
                        >
                            <EditIcon className={customStyles.iconBtn} />
                        </CSIconButton>
                        : null
                    }
                    {
                        !row.original.customerPO
                            ? <CSButtonSmall
                                variant="outlined"
                                color="primary"
                                size="small"
                                aria-label={'edit-ticket'}
                                onClick={() => sendPORequestEmail(row.original)}
                            >
                                Send PO Request
                            </CSButtonSmall>
                            : null
                    }
                    {
                        row.original.isHomeOccupied == true ?

                            <>
                                <span title='House is Occupied' >
                                    <Checkbox
                                        size={"small"}
                                        classes={{
                                            root: checkBoxClass.root,
                                            checked: checkBoxClass.checked,
                                        }}
                                        checked={true}
                                        disabled={false}
                                        name="checkedB"
                                        color="secondary"
                                    />
                                </span>
                            </>

                            : null
                    }
                </div>;
            },
            'Header': 'Actions',
            'id': 'action-create-job',
            'sortable': false,
            'width': 60
        },
    ];

    useEffect(() => {
        if (refresh) {
            dispatch(getAllPORequestsAPI(currentPageSize, currentPageIndex, showAllPORequests, keyword, selectionRange, currentDivision.params, bouncedEmailFlag,filterIsHomeOccupied));
            dispatch(setCurrentPageIndex(0));
            dispatch(setCurrentPageSize(currentPageSize));
        }
        setTimeout(() => {
            loadCount.current++;
        }, 1000);
    }, [refresh]);

    useEffect(() => {
        dispatch(getAllPORequestsAPI(currentPageSize, currentPageIndex, undefined, undefined, undefined, currentDivision.params, bouncedEmailFlag,filterIsHomeOccupied));
        if (customers.length == 0) {
            dispatch(getCustomers());
        }
        return () => {
          dispatch(getAllJobTypesAPI());
          dispatch(setKeyword(''));
          dispatch(setCurrentPageIndex(0));
          dispatch(setCurrentPageSize(currentPageSize));
        }
    }, [currentDivision.params]);

    const handleRowClick = (event: any, row: any) => {
    };

    const sendPORequestEmail = (ticket: any) => {
        dispatch(setModalDataAction({
            'data': {
                'data': ticket,
                'type': "PO Request",
                'modalTitle': `Send this ${ticket.ticketId}`,
                'removeFooter': false,
            },
            'type': modalTypes.EMAIL_PO_REQUEST_MODAL
        }));
        setTimeout(() => {
            dispatch(openModalAction());
        }, 200);
    }

    return (
        <BCTableContainer
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
            search
            searchPlaceholder={'Search PO Requests...'}
            tableData={filteredTickets}
            toolbarPositionLeft={true}
            toolbar={Toolbar()}
            manualPagination
            total={total}
            currentPageIndex={currentPageIndex}
            setCurrentPageIndexFunction={(num: number, apiCall: boolean) => {
                dispatch(setCurrentPageIndex(num))
                if (apiCall) {
                    dispatch(getAllPORequestsAPI(currentPageSize, num, showAllPORequests, keyword, selectionRange, currentDivision.params, bouncedEmailFlag,filterIsHomeOccupied))
                }
            }}
            currentPageSize={currentPageSize}
            setCurrentPageSizeFunction={(num: number) => {
              dispatch(setCurrentPageSize(num));
              dispatch(getAllPORequestsAPI(num || currentPageSize, 0, showAllPORequests, keyword, selectionRange, currentDivision.params));
            }}
            setKeywordFunction={(query: string) => {
                dispatch(setKeyword(query));
                dispatch(setCurrentPageIndex(0))
                dispatch(getAllPORequestsAPI(currentPageSize, 0, showAllPORequests, query, selectionRange, currentDivision.params, bouncedEmailFlag,filterIsHomeOccupied));
            }}
        />
    );
}

export default withStyles(
    styles,
    { 'withTheme': true }
)(PORequired);