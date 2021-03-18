import React from 'react';
import styles from "./methods.style";
import { Grid, IconButton } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import MoreIcon from "assets/img/icons/billings/More";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import visa from 'assets/img/icons/card/visa.svg';
import master from 'assets/img/icons/card/master.svg';
import discover from 'assets/img/icons/card/discover.svg';
import americanexpress from 'assets/img/icons/card/americanexpress.svg';

interface Props {
  classes: any;
  card?: any;
  onDelete?:any;
}

const CompanyCards = ({ classes, card, onDelete }: Props) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleSetDefault = (event: React.MouseEvent<EventTarget>) =>{
    handleClose(event)
  }
  const handleDelete = (event: React.MouseEvent<EventTarget>) => {
    onDelete(card._id, card.ending)
    handleClose(event)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Grid
      container
      className={`${classes.contentItem}`}>
      <div className={classes.contentItemTextContainer}>                                      
        <div className={classes.flex}>
          {card.cardType === "Visa" && <img alt="icon" src={visa} className={classes.billingCard}/>}
          {card.cardType === "Discover" && <img alt="icon" src={discover} className={classes.billingCard}/>}
          {card.cardType === "MasterCard" && <img alt="icon" src={master} className={classes.billingCard}/>}
          {card.cardType === "American Express" && <img alt="icon" src={americanexpress} className={classes.billingCardA}/>}
          {!card.cardType && <img alt="icon" src={visa} className={classes.billingCard}/>}
          <div>
            <b>{card.cardType}....{card.ending}</b>
            <div className={classes.cardExp}>Exp. {card.expirationMonth}/{card.expirationYear}</div>
          </div>
        </div>
      </div>

      <IconButton aria-label="more" component="span"           
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MoreIcon className={classes.moreIcon}/>
      </IconButton>

      <Popper className={classes.menuList} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem className={classes.MenuItem} onClick={handleSetDefault}>Set as default</MenuItem>
                  <MenuItem className={classes.MenuItem} onClick={handleDelete}>Delete</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  )
}

export default withStyles(styles, { withTheme: true })(CompanyCards);