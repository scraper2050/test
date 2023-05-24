import React from 'react';
import { Popper, Table, TableBody, TableHead,TableRow, TableCell } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {STATUSES, statusReference} from "../../helpers/contants";
interface Props {
  status: number;
  size?: string;
  data?: {
    jobId?: string;
    tasks: any[];
  };
}

const useStyles = makeStyles(() =>
  createStyles({
    popper: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
      borderRadius: 5,
      position: 'relative',
      zIndex: 9999,
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
      padding: '10px 24px', 
      paddingTop: 20, 
      minWidth: 390, 
      display: 'flex', 
      alignItems: 'center', 
      fontWeight: 700, 
      fontSize: 14,
    },
    scrollableTable: {
      maxHeight: 200,
      overflowY: 'auto',
    },
    rootHead: {
      position: 'sticky', 
      top: 0, 
      backgroundColor: '#FFFFFF'
    },
    rootCell: {
      padding: '5px 16px',
      height: 22,
      boxSizing: 'content-box'
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

  const handlePopperOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if(data){
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopperClose = () => {
    if(data){
      setAnchorEl(null);
    }
  };
  const open = Boolean(anchorEl);

  interface Task {
    technician: string;
    jobTitle: string;
    jobStatus: number;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined; }>;
  }
  const tasks: Task[] = []
  let tempData: any = data;
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
      style={{color: currentStatus.color, fontSize}}
      onMouseEnter={handlePopperOpen}
      onMouseLeave={handlePopperClose}
    >
      <StatusIcon style={{
        width: dimensions,
        height: dimensions,
        marginRight: 13,
      }} />{currentStatus.title}
      {!!data && (
        <Popper
          id="mouse-over-Popper"
          className={classes.popper}
          open={open}
          anchorEl={anchorEl}
          placement='bottom-start'
          disablePortal
          modifiers={{
            flip: {
              enabled: false,
            },
          }}
        >
          <div className={classes.statusText}>
            <StatusIcon className={classes.iconStatus} />{data.jobId}
          </div>
          {tasks.length && (
            <div className={classes.scrollableTable}>
              <Table>
                <TableHead classes={{root:classes.rootHead}}>
                  <TableRow>
                    <TableCell>TASK(S)</TableCell>
                    <TableCell>TECHNICIAN</TableCell>
                    <TableCell>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell classes={{root:classes.rootCell}}>{task.jobTitle}</TableCell>
                      <TableCell classes={{root:classes.rootCell}}>{task.technician}</TableCell>
                      <TableCell classes={{root:classes.rootCell}} style={{color: statusReference[`${task.jobStatus}`].color}}>
                        <task.icon style={{marginRight: 13, verticalAlign: 'middle'}}/>
                        <span style={{verticalAlign: 'middle'}}>{statusReference[`${task.jobStatus}`].text}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Popper>
      )}
    </div>
  );
}

export default BCJobStatus;
