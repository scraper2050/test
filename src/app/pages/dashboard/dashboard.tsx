import React, { useEffect } from 'react';
import styles from "./dashboard.styles";
import { Grid, withStyles, Fab } from "@material-ui/core";
import BCButtonDashboard from 'app/components/bc-button-dashboard/bc-button-dashboard';
import BCTableDashboard from 'app/components/bc-table-dashboard/bc-table-dashboard';
import CustomersIcon from 'assets/img/icons/dashboard/Customers';
import JobsIcon from 'assets/img/icons/dashboard/Jobs';
import TicketsIcon from 'assets/img/icons/dashboard/Tickets';
import { useHistory } from 'react-router-dom';
import { getVendors, loadingVendors, getVendorDetailAction, loadingSingleVender } from 'actions/vendor/vendor.action';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../../constants';

interface RowStatusTypes {
  row: {
    original: {

      status: number
    }
  };
}

interface StatusTypes {
  status: number;
}

function DashboardPage({ classes }: any): JSX.Element {
  const dispatch = useDispatch();
  const vendors = useSelector((state: any) => state.vendors);

  const history = useHistory();

  const buttonLinks = [
    {
      'text': 'Customers',
      'icon': <CustomersIcon className={classes.icons} />,
      'link': '/main/customers'
    },
    {
      'text': 'Jobs',
      'icon': <JobsIcon fill={"#fff"} height={25} width={25} />,
      'link': '/main/customers/schedule'
    },
    {
      'text': 'Tickets',
      'icon': <TicketsIcon className={classes.icons} />,
      'link': '/main/customers/ticket-map-view'
    },
  ];

  const RenderStatus = ({ status }: StatusTypes) => {
    const textStatus = status ? 'Confirmed' : 'Pending';
    return <div className={status ? classes.statusConfirmedText : classes.statusPendingText}>
      <div className={status ? classes.statusConfirmedCircle : classes.statusPendingCircle} />
      <div className={classes.statusText}>
        {textStatus}
      </div>
    </div>
  }

  const renderViewMore = (row: any) => {
    let baseObj = row["original"];
    let vendorCompanyName =
      baseObj["contractor"]["info"]
        && baseObj["contractor"]["info"]["companyName"] !== undefined
        ? baseObj["contractor"]["info"]["companyName"]
        : "N/A";
    let vendorId = baseObj['contractor']['_id'];
    let vendorObj = { vendorCompanyName, vendorId, };
    vendorCompanyName =
      vendorCompanyName !== undefined
        ? vendorCompanyName.replace(/ /g, "")
        : "vendorName";

    localStorage.setItem("nestedRouteKey", `${vendorCompanyName}`);


    dispatch(loadingSingleVender());
    dispatch(getVendorDetailAction(vendorId));

    history.push({
      pathname: `admin/vendors/${vendorCompanyName}`,
      state: {
        ...vendorObj,
      }
    });
  }


  const columns: any = [
    {
      'Header': 'Company Name',
      'accessor': 'contractor.info.companyName',
      'className': 'font-bold',
      'sortable': true,
      'Cell'({ row }: any) {
        return <div className={classes.textTable}>
          {row.original?.contractor?.info?.companyName}
        </div>
      }
    },
    {
      'Cell'({ row }: RowStatusTypes) {
        return <RenderStatus status={row.original.status} />
      },
      'Header': 'Status',
      'accessor': 'status',
      'className': 'font-bold',
      'sortable': true
    },
  ];


  useEffect(() => {
    dispatch(loadingVendors());
    dispatch(getVendors());
  }, []);



  const openVendorModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Add Vendor',
        'removeFooter': false
      },
      'type': modalTypes.ADD_VENDOR_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };


  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent} style={{ overflow: 'hidden' }}>
          <Grid container direction="column" className={classes.dashboardContainer} spacing={8} >
            <Grid item xs={12}>
              <Grid container spacing={10} justify="center">

                {
                  buttonLinks.map((button) => {
                    const { text, icon, link } = button;
                    return (
                      <Grid item xs={12} sm={3}>
                        <BCButtonDashboard
                          text={text}
                          icon={icon}
                          onClick={() => history.push(link)}
                        />
                      </Grid>
                    )
                  })
                }

              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={10} justify="center" >
                <Grid item xs={12} sm={9}>
                  <BCTableDashboard
                    text={"Vendors"}
                    textButton={"Invite Vendor"}
                    click={() => openVendorModal()}
                    columns={columns}
                    isLoading={vendors.loading}
                    tableData={vendors.data}

                    onRowClick={(row: any) => renderViewMore(row)}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={3} /> */}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}



export default withStyles(styles, { withTheme: true })(DashboardPage);