import React, { useState, useEffect } from 'react'
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import './bc-snackbar.scss';
import Button from '@material-ui/core/Button';


function BCSnackbar({
  topRight,
  topLeft,
  topCenter,
  bottomRight,
  bottomLeft,
  dispatchResetInfoSnackbar,
  snackbarState: snackbar,
}: any) {

  const position: SnackbarOrigin =
    topRight ? { vertical: "top", horizontal: "right" }
      : topLeft ? { vertical: "top", horizontal: "left" }
        : topCenter ? { vertical: "top", horizontal: "center" }
          : bottomRight ? { vertical: "bottom", horizontal: "right" }
            : bottomLeft ? { vertical: "bottom", horizontal: "left" }
              : { vertical: "bottom", horizontal: "center" };

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const handleCloseSnackbar = () => {
    dispatchResetInfoSnackbar();
    setOpenSnackbar(false);
  }

  useEffect(() => {
    if (snackbar.message) {
      setOpenSnackbar(true);
    }
  }, [snackbar])
  if (snackbar.message) {
    return (
      <Snackbar
        anchorOrigin={position}
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}>
        <Alert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbar.type}>
          <div className="alert-text-container">
            <label>{snackbar.type}</label>
            <span>{snackbar.message}</span>
          </div>
          <Button
            onClick={handleCloseSnackbar}
            color="inherit"
            size="small">
            CLOSE
          </Button>
        </Alert>
      </Snackbar>
    )
  }
  return null
}
export default BCSnackbar