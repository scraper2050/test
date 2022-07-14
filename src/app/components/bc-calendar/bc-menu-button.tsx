import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import {SvgIconTypeMap} from "@material-ui/core";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {CALENDAR_BUTTON_COLOR, PRIMARY_BLUE} from "../../../constants";

export interface MenuButtonItem {
  title: string;
  icon?:  OverridableComponent<SvgIconTypeMap>;
}

interface ButtonProps {
  selectedIndex: number;
  items: MenuButtonItem[];
  size?: string;
  handleClick: (id: number, title: string) => void;
}
const BUTTON_WIDTH = 130;

const StyledMenu = withStyles({
  list: {
  },
  paper: {
    border: '0 solid #d3d4d5',
    borderRadius: '0 0 8px 8px',
    width: BUTTON_WIDTH,
    padding: '0',
  },
})((props: MenuProps) => (
  <Menu
    elevation={1}
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
    height: 45,
    padding: '0 30px',
    '& span': {
      fontSize: '0.875rem',
      color: CALENDAR_BUTTON_COLOR,

    },
    '&:focus': {
      backgroundColor: '#E5F7FF',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: PRIMARY_BLUE,
      },
    },
    '& .MuiListItemIcon-root': {
      minWidth: 30,
    }
  },
}))(MenuItem);

export default function BCMenuButton({selectedIndex, items, handleClick}:ButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const textStatus = items[selectedIndex].title;
  const SelectedIcon =  items[selectedIndex].icon;

  const _handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const _handleListClick = (event: React.MouseEvent<HTMLElement>, id: number, title: string) => {
    event.stopPropagation();
    setAnchorEl(null);
    handleClick(id, title);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="text"
        style={{
          backgroundColor: 'white',
          color: Boolean(anchorEl) ? PRIMARY_BLUE : CALENDAR_BUTTON_COLOR,
          borderRadius: '8px 8px 0 0',
          width: BUTTON_WIDTH,

          boxShadow: Boolean(anchorEl) ? 'rgb(0 0 0 / 6%) 0px -1px 1px 1px' : 'none',
        }}
        onClick={_handleButtonClick}
        startIcon={SelectedIcon ? <SelectedIcon /> : null}
        >
        <div>
          <span style={{textTransform: 'capitalize'}}>{textStatus}</span>
          <ArrowDropDown style={{position: 'absolute', right: 3}}/>
        </div>
      </Button>
      <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      >
        {items.map((item, index:number) => {
          const ItemIcon = item.icon;
          return (
            <StyledMenuItem key={item.title} onClick={(e) => _handleListClick(e, index, item.title)}>
              {ItemIcon &&
                <ListItemIcon>
                  <ItemIcon fontSize={'small'}/>
                </ListItemIcon>
              }
                <ListItemText primary={item.title} />
              </StyledMenuItem>
          )}
        )}
      </StyledMenu>
    </div>
);
}
