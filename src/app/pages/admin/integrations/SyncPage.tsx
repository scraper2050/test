import React from "react";
import { Paper, Typography, Grid, Button, Checkbox } from "@material-ui/core";
import { green, grey, orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

import QBIcon from "../../../../assets/img/qb.png";
import { quickbooksCustomerSync, quickbooksItemsSync, quickbooksInvoicesSync } from "../../../../api/quickbooks.api";

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
    marginBottom: 10
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
  const [isLoading, setLoading] = React.useState(false);
  const [serverResp, setServerResp] = React.useState("");

  React.useEffect(() => {
      let interval: any;

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
