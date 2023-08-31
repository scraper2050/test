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
}

const QbSyncDialog: React.FC<QbSyncDialogProps> = ({open, handleClose,itemName}) =>{
    const [selectedOption, setSelectedOption] = useState('1');
   
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
                    <MenuItem value="Option 1"> 1</MenuItem>
                    <MenuItem value="Option 2"> 2</MenuItem>
                    <MenuItem value="Option 3"> 3</MenuItem>
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