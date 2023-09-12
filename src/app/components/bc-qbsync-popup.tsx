import  React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from '../components/bc-qb-sync-status/bc-qb-sync-status.style';

import { Dialog,DialogTitle,DialogContent,DialogActions,Button, IconButton, Typography, MenuItem, Select, FormControl, InputLabel, TextField } from '@material-ui/core';
import { useDispatch } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';


import { Close as CloseIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
interface QbSyncDialogProps
{
    loading:boolean;
    handleSync:any;
    resyncing:boolean;
    open:boolean;
    itemName:string;
    handleClose:()=>void;
    qbAccounts: any[];
}

const QbSyncDialog: React.FC<QbSyncDialogProps> = ({ open, handleClose, itemName, qbAccounts, handleSync, loading, resyncing }) =>{
    const [selectedOption, setSelectedOption] = useState('Select');
    const [selectedAccount, setSelectedAccount] = useState('Select');
    const classes = useStyles({ isSynced: false, hasError:false });

    const handleOptionChange = (e:any,newValue:any) => {
        e.stopPropagation(); // Stop the event from propagating to the TableRow

        // console.log("newValue", newValue);
        // let selected_account = qbAccounts[event.target.value];
        setSelectedOption(newValue);
        // setSelectedAccount(newValue);
        // console.log("Account on change", selected_account);
    };
return(
    <Dialog open={open} onClose={handleClose} onClick={(event)=>(event.stopPropagation())}>
        <DialogTitle>
            <IconButton aria-label="close" onClick={(event) => { event.stopPropagation();handleClose() }} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent style={{width:"400px"}}>
            <Typography variant="h6" gutterBottom>
                Sync Item {itemName ? itemName : ' '}
            </Typography>
            <InputLabel id="demo-controlled-open-select-label">You must select which income account to map this item to</InputLabel>

            {loading ? <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} ><p><b><i>Fetching Accounts List</i></b></p><br /><CircularProgress size={28} className={classes.accProgress} /></div> :<>
                <Autocomplete
                    value={selectedOption}
                    fullWidth
                    options={qbAccounts}
                    onChange={(event, newValue) => handleOptionChange(event,newValue)}
                    getOptionLabel={(account) => account.Name}
                    renderInput={(params) => <TextField {...params} label="Select Account" variant="outlined" style={{ marginTop: '20px' }} />}
                    renderOption={(account) => (
                        <MenuItem key={account.Name} value={account}>
                            {account.Name}
                        </MenuItem>
                    )}
                    noOptionsText="No accounts available"
                />
            </>
}

                
            
            
        </DialogContent>
        <DialogActions>
            <Button onClick={(event) => {event.stopPropagation();handleClose()}} color="primary">
                Close
            </Button>
            <Button onClick={
                (event) => {event.stopPropagation();handleSync(selectedOption)}
                } color="primary">
                {resyncing ? <CircularProgress size={28} className={classes.accProgress} /> :"Sync Item"}
            </Button>
        </DialogActions>
    </Dialog>
);
};

export default QbSyncDialog;