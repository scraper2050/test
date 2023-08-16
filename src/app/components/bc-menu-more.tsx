import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import {IconButton} from "@material-ui/core";

interface ItemProps {
  id: any;
  title: string;
}

interface ButtonProps {
  items: ItemProps[];
  icon: any;
  size?: string;
  handleClick: (e: any, id: any) => void;
}

const StyledMenu = withStyles({
  list: {
    padding: 0,
    minWidth: '134px',
  },
  paper: {
    borderWidth: 0,
    borderRadius: 8,
  },
})((props: MenuProps) => (
  <Menu
    elevation={10}
    getContentAnchorEl={null}
    anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    height: 40,
    '& span': {
      fontSize: 14,
    },
    '&:focus': {
      backgroundColor: '#E5F7FF',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#2BB8FF',
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus({items, icon, handleClick}:ButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const ButtonIcon = icon;

  const _handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const _handleListClick = (event: React.MouseEvent<HTMLElement>, id: any) => {
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
      <IconButton
        style={{padding: 4}}
        aria-label={'Open drawer'}
        color={'inherit'}
        onClick={_handleButtonClick}
      >
        <ButtonIcon style={{color: Boolean(anchorEl) ? '#00AAFF' : '#BDBDBD'}}/>
      </IconButton>
      <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      >
        {items.map((item: {title:string;id:any}, index:number) => <StyledMenuItem key={index} onClick={(e) => _handleListClick(e, item.id)}>
            <ListItemText primary={item.title} />
          </StyledMenuItem>
        )}
      </StyledMenu>
    </div>
  );
}
