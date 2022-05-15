import {Button, Checkbox, Menu, MenuItem} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {CSButtonSmall} from "../../../helpers/custom";
import {
  MENU_TEXT_COLOR,
  PRIMARY_BLUE,
  PRIMARY_GRAY
} from "../../../constants";
import classNames from "classnames";
import {ArrowDropDown} from "@material-ui/icons";
import classnames from "classnames";

interface Item {
  id: string;
  value: string;
}

interface Props {
  items: Item[];
  selected: string[];
  single?: boolean;
  onApply: (ids: string[]) => void;
  type?: 'default' | 'outlined';
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  containerOutlined: {
    border: `1px solid ${PRIMARY_GRAY}`,
    borderRadius: 8,
    padding: '0 10px',
  },
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
    minWidth: 178,
    cursor: 'pointer',
  },
  filterMenuContainerUnderline: {
    borderBottom:'1px solid #BDBDBD',
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
    minWidth: 200,
    backgroundColor: '#FFFFFF !important',
    fontSize: 14,
    color: MENU_TEXT_COLOR,
    display: 'flex',
    justifyContent: 'space-between',
  },
  filterMenuCheckbox: {
    padding: 4,
    marginLeft: 20,
    color: MENU_TEXT_COLOR,
  },
  filterMenuCheckboxChecked: {
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
  },
  filterMenuItemSelected: {
    backgroundColor: '#E5F7FF !important',
  },
}));


function BCItemsFilter({items, selected, single = false, onApply, type='default'}: Props) {
  const classes = useStyles();
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [tempSelectedIDs, setTempSelectedIDs] = useState<string[]>(selected);
  const [selectedIDs, setSelectedIDs] = useState<string[]>(selected);

  useEffect(() => {
    setSelectedIDs(selected);
  }, [selected]);

  const handleFilterClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setFilterMenuAnchorEl(event.currentTarget);
    setTempSelectedIDs(selectedIDs);
  };

  const handleSelectStatusFilter = (id:string) => {
    if (single) {
      setFilterMenuAnchorEl(null);
      onApply([id]);
    }

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
    setFilterMenuAnchorEl(null);
    setSelectedIDs(tempSelectedIDs);
    onApply(tempSelectedIDs);
  }

  const getText = () => {
    if (single) {
      return items.find(item => item.id === selectedIDs[0])?.value;
    }
    return selectedIDs.length === 0 ? 'All' : 'Custom';
  }

  return (
    <div className={classnames(classes.container, {
      [classes.containerOutlined]: type === 'outlined',
    })}>
      <div className={classNames(classes.filterMenu, classes.filterMenuLabel)}>
        View:
      </div>
      <div
        onClick={handleFilterClick}
        className={classNames(classes.filterMenu, classes.filterMenuContainer, {[classes.filterMenuContainerUnderline] : type==='default'})}
      >
        <span>{getText()}</span>
        {selectedIDs.length > 0 &&!single && <div className={classes.filterBadge}>{selectedIDs.length}</div>}
        <span style={{flex: 1, textAlign: 'right'}}>
            <ArrowDropDown />
          </span>
      </div>
      <Menu
        id="filter-by-status-menu"
        style={{minWidth: 100}}
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
              checked={tempSelectedIDs.length === 0}
              color={'primary'}
            />
          </MenuItem>
        }
        {items.map((item: Item) => (
          <MenuItem
            key={item.id}
            classes={{
              root: classes.filterMenuItemRoot,
              selected: single ? classes.filterMenuItemSelected : ''
            }}
            selected={tempSelectedIDs.indexOf(item.id) >= 0 && single}
            onClick={() => handleSelectStatusFilter(item.id)}
          >
            <span>{item.value}</span>
            {!single &&
              <Checkbox
                classes={{root: classes.filterMenuCheckbox}}
                color={'primary'}
                checked={tempSelectedIDs.indexOf(item.id) >= 0}
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
              disabled={tempSelectedIDs.length === 0}
              onClick={() => setTempSelectedIDs([])}
            >Clear Selection</Button>
          </div>
        }
      </Menu>
    </div>
  )
}

export default BCItemsFilter;
