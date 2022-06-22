import React, {useEffect} from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {createStyles} from "@material-ui/core/styles";
import {makeStyles, Theme} from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';
import {
  Button,
  ClickAwayListener,
  Grow, MenuItem, MenuList,
  ButtonGroup,
  Paper,
  Popper
} from "@material-ui/core";
import classNames from "classnames";

interface Props {
  options: string[];
  disabled: boolean;
  clickListener: (selectedIndex: number) => void;
  disabledItems?: number[];
  selectedIdx?: number;
  setSelectedIdx?: (selectedIndex: number) => void;
}

export default function BCButtonGroup({options, disabled, clickListener, disabledItems = [], selectedIdx, setSelectedIdx}:Props) {
  const theme = useTheme();
  const menuStyle = useMenuStyles();
  const buttonStyle = useButtonStyle();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [popperPosition, setPopperPosition] = React.useState('bottom');

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setSelectedIdx && setSelectedIdx(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if(selectedIdx !== undefined) {
      setSelectedIndex(selectedIdx);
    }
  }, [selectedIdx])
  

  return (
  <>
    <ButtonGroup disableElevation ref={anchorRef} >
      <Button
        style={{
          width: 160,
          borderBottomLeftRadius: open ? (popperPosition === 'bottom' ? 0 : 8) : 8,
          borderTopLeftRadius: open ? (popperPosition === 'bottom' ? 8 : 0) : 8,
          borderColor: disabled ? 'grey' : theme.palette.primary.main,
        }}
        variant="contained"
        color="primary"
        disabled={disabled}
        onClick={() => clickListener(selectedIndex)}
        className={classNames(buttonStyle.bcButton, buttonStyle.bcBlueBt)}
      >
        {options[selectedIndex]}
      </Button>
      <Button
        style={{
          borderBottomRightRadius: open ? (popperPosition === 'bottom' ? 0 : 8) : 8,
          borderTopRightRadius: open ? (popperPosition === 'bottom' ? 8 : 0) : 8,
          borderColor: disabled ? 'grey' : theme.palette.primary.main,
        }}
        variant="contained"
        color="primary"
        disabled={disabled}
        className={classNames(buttonStyle.bcButton, buttonStyle.bcBorderW, buttonStyle.bcBlueBt)}
        onClick={handleToggle}>
        <ArrowDropDownIcon/>
      </Button>
    </ButtonGroup>
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition disablePortal
      style={{zIndex: 100,}}
    >
      {({ TransitionProps, placement }) => {
          setPopperPosition(placement);
          return <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              width: '217px',
              borderTopLeftRadius: placement === 'bottom' ? 0 : 8,
              borderTopRightRadius: placement === 'bottom' ? 0 : 8,
              borderBottomLeftRadius: placement === 'bottom' ? 8 : 0,
              borderBottomRightRadius: placement === 'bottom' ? 8 : 0,
              marginLeft: 2
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={disabledItems.includes(index)}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                      classes={{
                        root: menuStyle.menuItem,
                        selected: menuStyle.menuItemSelected
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        }
      }
    </Popper>
  </>
  )
}

const useMenuStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      '&:hover': {
        backgroundColor: '#E5F7FF88 !important',
      }
    },
    menuItemSelected: {
      backgroundColor: '#E5F7FF !important',
      color: '#2BB8FF',
    },
  })
)

const useButtonStyle = makeStyles((theme: Theme) =>
  createStyles({
    bcButton: {
      border: '1px solid #4F4F4F',
      borderRadius: '8px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      color: '#4F4F4F',
      padding: '8px 16px',
    },
    bcBlueBt: {
      border: '1px solid #00AAFF',
      background: '#00AAFF',
      color: 'white',
    },
    bcBorderW: {
      borderLeftColor: '#FFF',
    },
    bcRMargin: {
      marginRight: '11px',
    },
  })
)

