import React, {useState} from 'react';
import {
  Menu, MenuItem
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {STATUSES as STATUSES_ORG} from "../../helpers/contants";
import classNames from "classnames";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {CALENDAR_BUTTON_COLOR} from "../../constants";

const STATUSES = [...STATUSES_ORG].sort((a, b) => a.id - b.id);
interface Props {
  onStatusChange: (status: number) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    filterMenuItemRoot: {
      backgroundColor: '#FFFFFF !important',
      fontSize: 12,
      color: CALENDAR_BUTTON_COLOR,
    },
    filterMenuItemSelected: {
      backgroundColor: '#E5F7FF !important',
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
      fontSize: 14,
      fontWeight: 'bold',
      marginRight: 13,
      color: CALENDAR_BUTTON_COLOR,
    },
    filterMenuContainer: {
      width: 128,
      borderBottom:'1px solid #BDBDBD',
      cursor: 'pointer',
    },
    filterIcon: {
      marginRight: 10,
    },
  }),
);
type IconComponentType = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string | undefined;}>;

function BCJobFilter({onStatusChange}:Props) {
  const classes = useStyles();
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [IconComponent, setIconComponent] = useState<null | IconComponentType>(null);
  const [selectedStatus, setSelectedStatus] = useState(-1);

  const handleFilterClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  STATUSES.sort((a, b) => a.id - b.id);

  const handleSelectStatusFilter = (statusNumber:number) => {
    if(statusNumber === -1) {
      setIconComponent(null);
    } else {
      setIconComponent(STATUSES[statusNumber].icon);
    }
    setSelectedStatus(statusNumber);
    setFilterMenuAnchorEl(null);
    onStatusChange(statusNumber)
  };

  return (
    <>
      <div className={classNames(classes.filterMenu, classes.filterMenuLabel)}>
        View:
      </div>
      <div
        onClick={handleFilterClick}
        className={classNames(classes.filterMenu, classes.filterMenuContainer)}
      >
        {
          STATUSES[selectedStatus] &&
          IconComponent &&
          <IconComponent className={classes.filterIcon}/>
        }
        <span
          style={{color: STATUSES[selectedStatus]?.color || 'inherit'}}
        >
          {selectedStatus === -1 ? 'All' : STATUSES[selectedStatus].title}
          </span>
        <span style={{flex: 1, textAlign: 'right'}}>
            <ArrowDropDownIcon />
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
          classes={{
            root: classes.filterMenuItemRoot,
            selected: classes.filterMenuItemSelected
          }}
          selected={selectedStatus === -1}
          onClick={() => handleSelectStatusFilter(-1)}
        >
          All
        </MenuItem>
        {STATUSES.map(statusObj => (
          <MenuItem
            key={statusObj.id}
            classes={{
              root: classes.filterMenuItemRoot,
              selected: classes.filterMenuItemSelected
            }}
            style={{color: statusObj.color || 'inherit'}}
            selected={statusObj.id === selectedStatus}
            onClick={() => handleSelectStatusFilter(statusObj.id)}
          >
            <statusObj.icon className={classes.filterIcon}/>
            {statusObj.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default BCJobFilter;
