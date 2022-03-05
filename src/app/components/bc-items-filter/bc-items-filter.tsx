import {Button, Checkbox, Menu, MenuItem} from "@material-ui/core";
import React, {useEffect, useState} from "react";
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
  selected: string[];
  single?: boolean;
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


function BCItemsFilter({items, selected, single = false, onApply}: Props) {
  const classes = useStyles();
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIDs, setSelectedIDs] = useState<string[]>(selected);

  useEffect(() => {
    setSelectedIDs(selected);
  }, [selected]);

  const handleFilterClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleSelectStatusFilter = (id:string) => {
    if (single) {
      setFilterMenuAnchorEl(null);
      onApply([id]);
    }

    if (id) {
      const i = selectedIDs.indexOf(id);
      if (i >= 0) {
        selectedIDs.splice(i, 1);
        setSelectedIDs([...selectedIDs]);
      } else
        setSelectedIDs([...selectedIDs, id]);
    } else {
      setSelectedIDs([]);
    }
  };

  const saveFilterSelection = () => {
    setFilterMenuAnchorEl(null);
    onApply(selectedIDs);
  }

  const getText = () => {
    if (single) {
      return items.find(item => item.id === selectedIDs[0])?.value;
    }
    return selectedIDs.length === 0 ? 'All' : 'Custom';
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
        <span>{getText()}</span>
        {selectedIDs.length > 0 &&!single && <div className={classes.filterBadge}>{selectedIDs.length}</div>}
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
        {!single &&
          <MenuItem
            className={classes.filterMenuItemRoot}
            onClick={() => handleSelectStatusFilter('')}
          >
            <span>All</span>
            <Checkbox
              classes={{root: classes.filterMenuCheckbox}}
              checked={selectedIDs.length === 0}
              color={'primary'}
            />
          </MenuItem>
        }
        {items.map((item: Item) => (
          <MenuItem
            key={item.id}
            className={classes.filterMenuItemRoot}
            onClick={() => handleSelectStatusFilter(item.id)}
          >
            <span>{item.value}</span>
            {!single &&
              <Checkbox
                classes={{root: classes.filterMenuCheckbox}}
                color={'primary'}
                checked={selectedIDs.indexOf(item.id) >= 0}
              />
            }
          </MenuItem>
        ))}
        {!single &&
          <div className={classes.filterButtonContainer}>
            <CSButtonSmall
              onClick={saveFilterSelection}
            >Apply</CSButtonSmall>
            <Button
              variant={'text'}
              className={classes.filterClearButton}
              disabled={selectedIDs.length === 0}
              onClick={() => setSelectedIDs([])}
            >Clear Selection</Button>
          </div>
        }
      </Menu>
    </>
  )
}

export default BCItemsFilter;
