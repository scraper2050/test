import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { CSButton } from "../../helpers/custom";
import styled from 'styled-components';

interface MenuToolbarButtonProps {
  buttonText: string;
  items: { title: string; id: number }[];
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
    boxShadow: '0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)',
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

const FlexContainer = styled.div`
  display: flex;
`

const FlexItem = styled.div<{ flex?: number }>`
  flex: ${p => p.flex ? p.flex : 1};
  display: flex;
  align-items: center;
  justify-content: center;
`

const BCMenuToolbarButton = ({ buttonText, items, handleClick }: MenuToolbarButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
      <CSButton
        variant="contained"
        style={{
          backgroundColor: '#fff',
          color: '#828282',
          border: '1px solid #E0E0E0',
          borderBottomLeftRadius: anchorEl ? 0 : 8,
          borderBottomRightRadius: anchorEl ? 0 : 8,
          boxShadow: 'none',
          paddingLeft: 0,
          paddingRight: 0,
          height: 40,
        }}
        onClick={_handleButtonClick}
      >
        <FlexContainer>
          <FlexItem flex={4} style={{ textTransform: 'capitalize' }}>{buttonText}</FlexItem>
          <FlexItem>
            <ArrowDropDown />
          </FlexItem>
        </FlexContainer>
      </CSButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item, index: number) => <StyledMenuItem key={index} onClick={(e) => _handleListClick(e, item.id)}>
          <ListItemText primary={item.title} />
        </StyledMenuItem>
        )}
      </StyledMenu>
    </div>
  );
}

export default BCMenuToolbarButton;