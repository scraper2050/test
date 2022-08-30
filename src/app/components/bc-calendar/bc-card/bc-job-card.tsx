import React from "react";
import {
  formatShortDateNoYear,
  formatTime
} from "../../../../helpers/format";
import {IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import {statusReference} from "../../../../helpers/contants";
import BCJobStatus from "../../bc-job-status";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: '10px 0',
    minWidth: 450,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    padding: '5px 10px',
    alignItems: 'center',
  },
  extraLine: {
    marginBottom: 5,
  },
  eventIcon: {
    width: 16,
    height: 16,
    marginRight: 16,
  },
  eventTitle: {
    fontSize: 14,
    color: '#4F4F4F',
    fontWeight: 'bold',
  },
  eventText: {
    fontSize: 12,
    color: '#4F4F4F',
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

function BCJobCard({calendarState, openJobModalHandler}:any) {
  const { data } = calendarState;
  const defaultClasses = useStyles();

  if (!data) return null;

  const tasks = data.tasks.reduce((acc: any, task: any) => {
    task.jobTypes.forEach((jobType: any) => {
      acc.push({
        status: jobType.status,
        technician: task.technician.profile.displayName,
        title: jobType.jobType.title,
      });
    });
    return acc;
  }, [])

  const status = statusReference[data.status.toString()];
  const StatusIcon = status.icon;

  const openDetailJobModal = (job: any) => {
    openJobModalHandler(job)
  };

  return (
    <div className={defaultClasses.container}>
      <div className={`${defaultClasses.row} ${defaultClasses.extraLine}`}>
        <StatusIcon className={defaultClasses.eventIcon}/>
        <span className={defaultClasses.eventTitle}>{data.customer?.profile?.displayName}</span>
      </div>
      <div className={`${defaultClasses.row} ${defaultClasses.extraLine}`}>
        <span className={defaultClasses.eventText}>{formatShortDateNoYear(data.scheduleDate)}</span>
        <span className={defaultClasses.eventText}>
          {data.scheduledStartTime ? formatTime(data.scheduledStartTime) : ' '}
        </span>
        <div style={{flex: 0.6}}>
          <IconButton onClick={() => openDetailJobModal(data)}>
            <InfoIcon fontSize={'default'} />
          </IconButton>
        </div>
      </div>
      <div className={defaultClasses.row}>
        <span className={defaultClasses.eventText}>TASK(S)</span>
        <span className={defaultClasses.eventText}>TECHNICIANS</span>
        <span className={defaultClasses.eventText} style={{flex: 0.6}}>STATUS</span>
      </div>
      <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px', width: '100%'}}/>
      {tasks.map((task: any, ind: any) => (
          <div className={defaultClasses.row} key={`${ind}`}>
            <span className={defaultClasses.eventText}>{task.title}</span>
            <span className={defaultClasses.eventText}>{task.technician}</span>
            <div style={{flex: 0.6}}>
              <BCJobStatus status={task.status} size={'small'} />
            </div>
          </div>
        )
      )}

    </div>
  )
}


export default BCJobCard;
