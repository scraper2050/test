import React from 'react';
import { Popover, Table, TableBody, TableHead,TableRow, TableCell } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {STATUSES} from "../../helpers/contants";
import {ReactComponent as IconStarted} from 'assets/img/icons/map/icon-started.svg';
import {ReactComponent as IconCompleted} from 'assets/img/icons/map/icon-completed.svg';
import {ReactComponent as IconCancelled} from 'assets/img/icons/map/icon-cancelled.svg';
import {ReactComponent as IconRescheduled} from 'assets/img/icons/map/icon-rescheduled.svg';
import {ReactComponent as IconPaused} from 'assets/img/icons/map/icon-paused.svg';
import {ReactComponent as IconIncomplete} from 'assets/img/icons/map/icon-incomplete.svg';
import {ReactComponent as IconPending} from 'assets/img/icons/map/icon-pending.svg';
import { string } from 'yup';
interface Props {
  status: number;
  size?: string;
  data?: {
    jobId?: string;
    tasks: any[];
  };
}

const statusReference: { 
  [key: string]: {
    text: string; 
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string | undefined;}>; 
    color: string;
    statusNumber: string;
  }; 
} = {
  '0': {text: 'Pending', icon: IconPending, color: '#828282', statusNumber: '0'},
  '1': {text: 'Started', icon: IconStarted, color: '#00AAFF', statusNumber: '1'},
  '5': {text: 'Paused', icon: IconPaused, color: '#FA8029', statusNumber: '5'},
  '2': {text: 'Completed', icon: IconCompleted, color: '#50AE55', statusNumber: '2'},
  '3': {text: 'Canceled', icon: IconCancelled, color: '#A107FF', statusNumber: '3'},
  '4': {text: 'Rescheduled', icon: IconRescheduled, color: '#828282', statusNumber: '4'},
  '6': {text: 'Incomplete', icon: IconIncomplete, color: '#F50057', statusNumber: '6'}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
    iconStatus: {
      marginRight: 13,
    },
    statusContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 14,
      fontWeight: 700,
    },
    statusText: {
      padding: 24, 
      paddingTop: 30, 
      width: 390, 
      display: 'flex', 
      alignItems: 
      'center', 
      fontWeight: 300, 
      fontSize: 14,
    },
    root: {
      marginTop: 15,
    },
  }),
);

function BCJobStatus({status, size= 'normal', data}:Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const currentStatus = STATUSES.find((item) => item.id === status);
  if (!currentStatus) return null;

  const fontSize = size === 'small' ? 12 : 'auto';
  const dimensions = size === 'small' ? 14 : 'auto';

  const StatusIcon = currentStatus.icon;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if(Boolean(data)){
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    if(Boolean(data)){
      setAnchorEl(null);
    }
  };
  const open = Boolean(anchorEl);
  // console.log(data)

  const tasks: {
    technician: string;
    jobTitle: string;
    jobStatus: number;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined; }>;
  }[] = []

  if(data && data.tasks){
    data.tasks.forEach(task=>{
      task.jobTypes.forEach((job:{status:number; jobType:{title:string;}}) => {
        tasks.push({
          technician: task?.technician?.profile?.displayName || '',
          jobTitle: job?.jobType?.title || '',
          jobStatus: job.status,
          icon: statusReference[`${job.status}`].icon
        })
      });
    })
  }

  return (
    <div 
      className={classes.statusContainer}
      style={{color: currentStatus.color}}
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <StatusIcon style={{
        width: dimensions,
        height: dimensions,
        marginRight: 13,
      }} />{currentStatus.title}
      {!!data && (
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
            root: classes.root
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div className={classes.statusText}>
            <StatusIcon className={classes.iconStatus} />{data.jobId}
          </div>
          {tasks.length && (
            <Table>
            <TableHead>
              <TableRow>
                <TableCell>TASK(S)</TableCell>
                <TableCell>TECHNICIAN</TableCell>
                <TableCell>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.jobTitle}</TableCell>
                  <TableCell>{task.technician}</TableCell>
                  <TableCell style={{color: statusReference[`${task.jobStatus}`].color, backgroundColor: '#FFFFFF', display: 'flex'}}>
                    <task.icon style={{marginRight: 13}}/>
                    {statusReference[`${task.jobStatus}`].text}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
        </Popover>
      )}
    </div>
  );
}

export default BCJobStatus;
