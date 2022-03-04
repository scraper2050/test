import {Button, Checkbox, Menu, MenuItem} from "@material-ui/core";
import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {CSButtonSmall} from "../../../helpers/custom";
import {MENU_TEXT_COLOR, PRIMARY_BLUE} from "../../../constants";
import classNames from "classnames";
import {ArrowDropDown} from "@material-ui/icons";

interface Item {
  id: string;
  value: string;
}

interface Props {
  items: Item[];
  onApply: (ids: string[]) => void;
}

const useStyles = makeStyles((theme) => ({
  filterMenu: {
    height: 'calc(100% - 10px)',
    marginTop: 5,
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
  },
  filterMenuLabel: {
    fontSize: 16,
    marginRight: 13
  },
  filterMenuContainer: {
    width: 128,
    borderBottom:'1px solid #BDBDBD',
    cursor: 'pointer',
  },
  filterIcon: {
    marginRight: 10,
  },
  filterBadge: {
    width: 20,
    marginLeft: 10,
    color: PRIMARY_BLUE,
    border: `0.5px solid ${PRIMARY_BLUE}`,
    borderRadius: 20,
    textAlign: 'center',
  },
  filterMenuItemRoot: {
    backgroundColor: '#FFFFFF !important',
    fontSize: 14,
    color: MENU_TEXT_COLOR,
    display: 'flex',
    justifyContent: 'space-between',
  }, filterMenuCheckbox: {
    padding: 4,
    marginLeft: 20,
    color: MENU_TEXT_COLOR,
  }, filterMenuCheckboxChecked: {
    color: PRIMARY_BLUE,
  },
  filterButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  filterClearButton: {
    fontSize: 10,
    color: PRIMARY_BLUE,
    textTransform: 'none',
    marginTop: 10,
    marginBottom: -10,
  }
}));


function BCItemsFilter({items, onApply}: Props) {
  const classes = useStyles();
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [tempSelectedIDs, setTempSelectedIDs] = useState<string[]>([]);
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);

  const handleFilterClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setTempSelectedIDs(selectedIDs);
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleSelectStatusFilter = (id:string) => {
    if (id) {
      const i = tempSelectedIDs.indexOf(id);
      if (i >= 0) {
        tempSelectedIDs.splice(i, 1);
        setTempSelectedIDs([...tempSelectedIDs]);
      } else
        setTempSelectedIDs([...tempSelectedIDs, id]);
    } else {
      setTempSelectedIDs([]);
    }
  };

  const saveFilterSelection = () => {
    setSelectedIDs(tempSelectedIDs);
    setFilterMenuAnchorEl(null);
    onApply(tempSelectedIDs);
  }

  return (
    <>
      <div className={classNames(classes.filterMenu, classes.filterMenuLabel)}>
        View:
      </div>
      <div
        onClick={handleFilterClick}
        className={classNames(classes.filterMenu, classes.filterMenuContainer)}
      >
        <span>{selectedIDs.length === 0 ? 'All' : 'Custom'}</span>
        {selectedIDs.length > 0 && <div className={classes.filterBadge}>{selectedIDs.length}</div>}
        <span style={{flex: 1, textAlign: 'right'}}>
            <ArrowDropDown />
          </span>
      </div>
      <Menu
        id="filter-by-status-menu"
        variant="menu"
        anchorEl={filterMenuAnchorEl}
        keepMounted
        open={Boolean(filterMenuAnchorEl)}
        onClose={() => setFilterMenuAnchorEl(null)}
      >
        <MenuItem
          className={classes.filterMenuItemRoot}
          onClick={() => handleSelectStatusFilter('')}
        >
          <span>All</span>
          <Checkbox
            classes={{root: classes.filterMenuCheckbox}}
            checked={tempSelectedIDs.length === 0}
            color={'primary'}
          />
        </MenuItem>
        {items.map((item: Item) => (
          <MenuItem
            key={item.id}
            className={classes.filterMenuItemRoot}
            onClick={() => handleSelectStatusFilter(item.id)}
          >
            <span>{item.value}</span>
            <Checkbox
              classes={{root: classes.filterMenuCheckbox}}
              color={'primary'}
              checked={tempSelectedIDs.indexOf(item.id) >= 0}
            />
          </MenuItem>
        ))}
        <div className={classes.filterButtonContainer}>
          <CSButtonSmall
            onClick={saveFilterSelection}
          >Apply</CSButtonSmall>
          <Button
            variant={'text'}
            className={classes.filterClearButton}
            disabled={tempSelectedIDs.length === 0}
            onClick={() => setTempSelectedIDs([])}
          >Clear Selection</Button>
        </div>
      </Menu>
    </>
  )
}

export default BCItemsFilter;
