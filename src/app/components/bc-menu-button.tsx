import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import {CSButtonSmall} from "../../helpers/custom";
import {PAYMENT_STATUS_COLORS} from "../../helpers/contants";

const STATUS_ITEMS = {
  record_payment: {id: 0, title:'Record Payment'},
  view_history: {id: 1, title:'View History'},
}

interface ButtonProps {
  status: string;
  items?: string[];
  size?: string;
  handleClick: (e: any, id: number) => void;
}


const StyledMenu = withStyles({
  list: {
    padding: 0,
    minWidth: '134px',
  },
  paper: {
    border: '0 solid #d3d4d5',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    height: 32,
    '& span': {
      fontSize: 13,
    },
    '&:focus': {
      backgroundColor: '#E5F7FF',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#2BB8FF',
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus({status, handleClick}:ButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const textStatus = status.split('_').join(' ').toLowerCase();

  let defaultItems: any[] = [];
  switch (status) {
    case 'PAID':
      defaultItems=[STATUS_ITEMS.view_history];
      break;
    case 'UNPAID':
      defaultItems=[STATUS_ITEMS.record_payment];
      break;
    case 'PARTIALLY_PAID':
      defaultItems=[STATUS_ITEMS.record_payment, STATUS_ITEMS.view_history];
      break;

  }

  const _handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const _handleListClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    event.stopPropagation();
    setAnchorEl(null);
    handleClick(event, id);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <CSButtonSmall
        variant="contained"
        style={{
          backgroundColor: PAYMENT_STATUS_COLORS[status],
          color: '#fff',
          borderBottomLeftRadius: anchorEl ? 0 : 8,
          borderBottomRightRadius: anchorEl ? 0 : 8,
        }}
        onClick={_handleButtonClick}
        >
        <div>
          <span style={{textTransform: 'capitalize'}}>{textStatus}</span>
          <ArrowDropDown style={{position: 'absolute', right: 3}}/>
        </div>
      </CSButtonSmall>
      <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      >
        {defaultItems.map((item: {title:string;id:number}, index:number) => <StyledMenuItem key={index} onClick={(e) => _handleListClick(e, item.id)}>
            <ListItemText primary={item.title} />
          </StyledMenuItem>
        )}
      </StyledMenu>
    </div>
);
}
