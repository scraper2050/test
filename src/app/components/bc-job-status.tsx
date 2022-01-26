import React from 'react';
import { Popover, Table, TableBody, TableHead,TableRow, TableCell } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {STATUSES, statusReference} from "../../helpers/contants";
interface Props {
  status: number;
  size?: string;
  data?: {
    jobId?: string;
    tasks: any[];
  };
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
    if(data){
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    if(data){
      setAnchorEl(null);
    }
  };
  const open = Boolean(anchorEl);

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
