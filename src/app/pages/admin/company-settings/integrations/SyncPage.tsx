import React from "react";
import {Paper, Typography, Grid, Button, Checkbox, IconButton} from "@material-ui/core";
import { green, grey, orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import QBIcon from "../../../../../assets/img/qb.png";
import { quickbooksCustomerSync, quickbooksItemsSync, quickbooksInvoicesSync } from "../../../../../api/quickbooks.api";
import { getCompanyProfile } from "../../../../../api/user.api";
import { useDispatch } from "react-redux";
import {error, success} from "../../../../../actions/snackbar/snackbar.action";
import {openModalAction, setModalDataAction} from "../../../../../actions/bc-modal/bc-modal.action";
import {modalTypes} from "../../../../../constants";
import {setQuickbooksConnection} from "../../../../../actions/quickbooks/quickbooks.actions";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  root: {
    display: "flex",
    flexGrow: 0,
    width: "50%",
    borderTop: `5px solid ${green[600]}`,
    borderBottom: `5px solid ${green[600]}`,
    borderRadiusTopRight: "30px",
    borderRadiusTopLeft: "30px",
    background: theme.palette.background.paper,
  },
  grid1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    padding: 12,
  },
  grid2: {
    position: "relative",
    width: "100%",
  },
  imageIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  closeImageIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeImageIcon: {
    fontSize: 28,
  },
  serverRespContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
    padding: 0,
    width: "100%",
  },
  serverRespText: {
    color: orange[800],
    textAlign: "center"
  },
  titleDiv: {
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 500,
    color: grey[600]
  },
  subtitleDiv: {
    marginBottom: 20
  },
  subtitle: {
    color: grey[500]
  },
  subtitle1: {
    marginBottom: 10,
    color: grey[600]
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
  }
}));

function SyncPage() {
  const classes = useStyles();
  const [isChecked, setChecked] = React.useState({Customers: false, Items: false, Invoices: false});
  const [isSynced, setSynced] = React.useState({Customers: '', Items: '', Invoices: ''});
  const [syncProfile, setSyncProfile] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [serverResp, setServerResp] = React.useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    let interval: any;
    handleCompanyProfile();
    if (serverResp) {
      interval = setInterval(() => {
        setServerResp('');
      }, 3000)
    }

    return () => clearInterval(interval);
  }, [serverResp])

  const handleSync = async () => {
    if (serverResp) setServerResp('');
    setLoading(true);

    const requests = [];
    const { Customers, Items, Invoices } = isChecked;
    if (Customers) requests.push(quickbooksCustomerSync())
    if (Items) requests.push(quickbooksItemsSync())
    if (Invoices) requests.push(quickbooksInvoicesSync())

    Promise.all(requests).then((resp) => {
      const message = resp.reduce((acc, res: any) =>  {
        const key = res.config.url.split('QB')[1];
        return acc += `${key.toUpperCase()}: ${res.data.message}\n`;
      }, '');
      setLoading(false);
      setServerResp(message);
    }).catch(e => {
      setLoading(false);
      console.log(e);
    })

  };

  const handleCompanyProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || "");
      const companyProfile = await getCompanyProfile(user?.company as string);
      const { qbSync, qbCompanyEmail = '', qbCompanyName = '', qbAuthorized = false } = companyProfile.company;
      if (qbCompanyEmail === null && qbCompanyName === null) {
        dispatch(setQuickbooksConnection({qbAuthorized}));
      }
      const syncStatus: any = {};
      Object.entries(isSynced).forEach(([key, status]) => {
        const qbKey = `${key.toLowerCase()}Synced`;
        const qbKeyAt = `${key.toLowerCase()}SyncedAt`;
        syncStatus[key] = qbSync[qbKey]? new Date(qbSync[qbKeyAt]).toLocaleString('en-US') : '';
      });
      setSynced(syncStatus);
      setSyncProfile(`${qbCompanyName}, ${qbCompanyEmail}`);
      dispatch(setQuickbooksConnection({qbAuthorized, qbCompanyName, qbCompanyEmail}));
    } catch (e) {
      dispatch(error(e.message));
    }
  }

  const askToDisconnect = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Disconnect from QuickBooks',
        'removeFooter': false,
        'className': 'serviceTicketTitle',
      },
      'type': modalTypes.QUICKBOOKS_DISCONNECT_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const enableButton = Object.values(isChecked).some(value => value);

  return (
    <div className={classes.container}>
      <Paper className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={10} className={classes.grid1}>
            {serverResp && (
              <div className={classes.serverRespContainer}>
                <Typography className={classes.serverRespText}>
                  {serverResp}
                </Typography>
              </div>
            )}
            <div className={classes.titleDiv}>
              <Typography
                variant="h5"
                className={classes.title}
              >
                QuickBooks Online Integration
              </Typography>
              <span>{syncProfile}</span>
            </div>
            <div className={classes.subtitleDiv}>
              <Typography variant="subtitle1" className={classes.subtitle}>
              You can sync certain information in Quickbooks online and BlueClerk by authorizing your account
              </Typography>
            </div>
            <div>
              <Typography
                variant="subtitle1"
                className={classes.subtitle1}
              >
                Select what to sync
              </Typography>
              {Object.entries(isChecked).map(([key, checked]) => {
                // @ts-ignore
                const syncStatus = isSynced[key];
                return (
                  <div key={key} className={classes.checkboxContainer}>
                    <Checkbox
                      style={{
                        color: checked ? green[600] : "none",
                        cursor: "pointer",
                      }}
                      checked={checked}
                      onChange={() => setChecked({...isChecked, [key]: !checked})}
                    />
                    <span style={{ color: isChecked ? "inherit" : grey[600] }}>
                      {key}
                    </span>
                    {syncStatus !== '' &&
                    <span style={{color: grey[500], fontSize: 12, marginLeft: '10px'}}>
                      {` synced on ${syncStatus}`}
                    </span>
                    }
                  </div>
                )
              })}
              <div>
                <Button
                  style={{
                    width: 300,
                    background: enableButton ? green[600] : green[200],
                    color: "#fff",
                    border: "transparent",
                  }}
                  variant="outlined"
                  disabled={!enableButton}
                  onClick={handleSync}
                >
                  {isLoading ? "......syncing......" : "Sync"}
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={2} className={classes.grid2}>
            <Button
              className={classes.closeImageIconContainer}
              aria-label={'disconnect'}
              color={'secondary'}
              onClick={askToDisconnect}
              variant={'contained'}>
              {'Disconnect'}
            </Button>
            <div className={classes.imageIconContainer}>
              <img
                src={QBIcon}
                alt="quick-books-icon"
                width="120px"
                height="100px"
                style={{ background: "transparent" }}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default SyncPage;
