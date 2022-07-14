import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import {LABEL_GREY, LIGHT_GREY} from "../../constants";
import styled from "styled-components";

export interface DROP_ITEM {
  id: string;
  title: string;
  icon?: any;
  selectable: boolean;
}

interface ButtonProps {
  selectedItem: DROP_ITEM | null;
  items: DROP_ITEM[];
  size?: string;
  onSelect: (e: React.MouseEvent<HTMLElement>, item: DROP_ITEM) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}

const MenuButton = styled.div<{opened: boolean}>`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-style: solid;
  border-width: ${props => props.opened ? '1px' : '1px'};
  border-color: ${props => props.opened ? LABEL_GREY : LIGHT_GREY};
  border-radius: ${props => props.opened ? '8px 8px 0 0' : '8px'};
  min-width: 240px;
`
const ButtonText = styled.span`
  flex: 1;
  text-align: start;
  color: ${LABEL_GREY};
  font-size: 14px;
`

const StyledMenu = withStyles({
  list: {
    padding: 0,
    minWidth: '240px',
  },
  paper: {
    border: '0 solid #d3d4d5',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
})((props: MenuProps) => (
  <Menu
    elevation={2}
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
    height: 42,
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

const ListText =withStyles((theme) => ({
  root: {
    color: LABEL_GREY,
  },
}))(ListItemText);

const ListIcon =withStyles((theme) => ({
  root: {
    minWidth: 32,
    color: LABEL_GREY,
  },
}))(ListItemIcon);

export default function DropDownMenu({selectedItem, items, onSelect, onMouseEnter, onMouseLeave}:ButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const StatusIcon = selectedItem?.icon;

  const _handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const _handleListClick = (event: React.MouseEvent<HTMLElement>, item: DROP_ITEM) => {
    event.stopPropagation();
    setAnchorEl(null);
    onSelect(event, item);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <MenuButton
        opened = {!!anchorEl}
        onClick={_handleButtonClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >
        {StatusIcon && <StatusIcon style={{fontSize: 20, color: LIGHT_GREY, marginRight: 8,}}/>}
        <ButtonText>{selectedItem?.title}</ButtonText>
        <ArrowDropDown style={{color: LIGHT_GREY}}/>
      </MenuButton>
      <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      >
        {items.map((item, index:number) => {
          const StatusIcon = item.icon;
          return <StyledMenuItem key={index} onClick={(e) => _handleListClick(e, item)} >
              {item.icon &&
              <ListIcon>
                <StatusIcon style={{fontSize: 20}}/>
              </ListIcon>
              }
              <ListText
                primary={item.title}
              />
            </StyledMenuItem>
          }
        )}
      </StyledMenu>
    </div>
);
}
