import  React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog,DialogTitle,DialogContent,DialogActions,Button, IconButton, Typography, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import { useDispatch } from "react-redux";

import { Close as CloseIcon } from '@material-ui/icons';
interface QbSyncDialogProps
{
    open:boolean;
    itemName:string;
    handleClose:()=>void;
    qbAccounts: any[];
}

const QbSyncDialog: React.FC<QbSyncDialogProps> = ({ open, handleClose, itemName, qbAccounts }) =>{
    const [selectedOption, setSelectedOption] = useState('Select');
   
    const handleOptionChange = (event: { target: { value: any; }; }) => {
        setSelectedOption(event.target.value);
    };
    console.log("item Name :",itemName);
return(
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
                <Typography variant="h6" gutterBottom>
                {itemName ? itemName : ' '}
                </Typography>
                <InputLabel id="demo-controlled-open-select-label">Select income account</InputLabel>
                <Select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    fullWidth
                    variant="outlined"
                    style={{ marginTop: '20px' }}
                >
                {qbAccounts && qbAccounts.length > 0 ? (
                    qbAccounts.map((accounts, index) => (
                        <MenuItem key={index} value={accounts.Name}> {accounts.Name}</MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No accounts available</MenuItem>
                )}
                </Select>   
                
            
            
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
            <Button onClick={handleClose} color="primary">
                Sync
            </Button>
        </DialogActions>
    </Dialog>
);
};

export default QbSyncDialog;