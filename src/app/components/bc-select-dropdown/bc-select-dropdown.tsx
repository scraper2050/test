import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import {LABEL_GREY, LIGHT_GREY, PRIMARY_BLUE} from "../../../constants";
import styled from "styled-components";

export interface Option {
  value: string;
  label: string;
}

interface ButtonProps {
  selectedItem: Option["value"] | null;
  items: Option[];
  minwidth?: string;
  onSelect: (e: React.MouseEvent<HTMLElement>, item: Option) => void;
  disabled?: boolean;
  fontSize?: number;
  placeholder?: string;
}

const MenuButton = styled.div<{opened: boolean, disabled: boolean, minwidth?: string}>`
  display: flex;
  align-items: center;
  padding: 9px;
  padding-bottom: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  border-style: solid;
  border-width: ${props => props.opened ? '1px' : '1px'};
  border-color: ${props => props.opened ? PRIMARY_BLUE : props.disabled ? '#E0E0E0' : LIGHT_GREY};
  border-radius: ${props => props.opened ? '8px 8px 0 0' : '8px'};
  min-width: ${props => props.minwidth ? props.minwidth : '240px'};
  background-color: white;
`
const ButtonText = styled.span<{disabled: boolean}>`
  flex: 1;
  text-align: start;
  color: ${props => props.disabled ? LABEL_GREY : '#4F4F4F'};
  font-size: 14px;
`

const StyledMenu = withStyles({
  list: {
    padding: 0,
    minWidth: (props:{minwidth?: string}) => props.minwidth ? props.minwidth : '240px',
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

const StyledMenuItem:any = withStyles((theme) => ({
  root: {
    maxWidth: '100%',
    height: 42,
    '& span': {
      fontSize: (props:any) => props.fontSize,
    },
    '&:focus': {
      backgroundColor: '#E5F7FF',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#2BB8FF',
      },
    },
  },
  selected: {
    backgroundColor: '#E5F7FF !important',
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: '#2BB8FF',
    },
  },
}))(MenuItem);

const ListText =withStyles((theme) => ({
  root: {
    color: LABEL_GREY,
  },
}))(ListItemText);

export default function DropDownMenu({selectedItem, items, onSelect, minwidth, disabled, fontSize = 13, placeholder = ''}:ButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const _handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if(!disabled) {
      setAnchorEl(event.currentTarget);
    }
  };

  const _handleListClick = (event: React.MouseEvent<HTMLElement>, item: Option) => {
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
        minwidth={minwidth}
        opened = {!!anchorEl}
        onClick={_handleButtonClick}
        disabled={!!disabled}
        >
        <ButtonText disabled={!!disabled}>{items.find((item)=> item.value === selectedItem)?.label || placeholder}</ButtonText>
        <ArrowDropDown style={{color: LIGHT_GREY}}/>
      </MenuButton>
      <StyledMenu
        minwidth={minwidth}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item, index:number) => {
          return <StyledMenuItem key={index} selected={selectedItem === item.value} onClick={(e:any) => _handleListClick(e, item)} fontSize={fontSize}>
              <ListText
                primary={item.label}
              />
            </StyledMenuItem>
          }
        )}
      </StyledMenu>
    </div>
);
}
