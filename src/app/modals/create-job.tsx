import { Calendar } from '@material-ui/pickers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  addMinutes,
  format,
  formatDuration,
  intervalToDuration
} from 'date-fns';
import './create-job.scss';

const titles: string[] = ['New Ticket', 'New Job', 'Job Detail'];

const JOB_DETAIL = 2;

type OptionType = {
  value: string;
  label: string;
};

const employeeTypes: OptionType[] = [
  {
    'label': 'employee',
    'value': '0'
  },
  {
    'label': 'vendo',
    'value': '1'
  }
];
const technicians: OptionType[] = [
  {
    'label': 'Technician0',
    'value': '0'
  },
  {
    'label': 'Technician1',
    'value': '1'
  },
  {
    'label': 'Technician2',
    'value': '2'
  },
  {
    'label': 'Technician3',
    'value': '3'
  },
  {
    'label': 'Technician4',
    'value': '4'
  }
];
const equipments: OptionType[] = [
  {
    'label': 'Equipment0',
    'value': '0'
  },
  {
    'label': 'Equipment1',
    'value': '1'
  },
  {
    'label': 'Equipment2',
    'value': '2'
  },
  {
    'label': 'Equipment3',
    'value': '3'
  },
  {
    'label': 'Equipment4',
    'value': '4'
  }
];

const startTimes: OptionType[] = [];
for (
  let startTime = new Date(
    1982,
    12,
    20,
    0,
    0
  );
  startTime < new Date(
    1982,
    12,
    21,
    0,
    0
  );
  startTime = addMinutes(
    startTime,
    30
  )
) {
  const value = format(
    startTime,
    'hh:mm a'
  );
  startTimes.push({
    'label': value,
    value
  });
}
const now = new Date();
const durations: OptionType[] = [];
for (let minutes = 60; minutes < 60 * 6 + 30; minutes += 30) {
  const value = formatDuration(intervalToDuration({
    'end': addMinutes(
      now,
      minutes
    ),
    'start': now
  }));
  durations.push({
    'label': value,
    value
  });
}

interface ICustomer {
  _id: string,
  profile: {
    displayName: string,
  }
}
interface IJobTypes {
  _id: string,
  title: string,
}

interface CreateJobProps {
  modal: boolean;
  modalMode: number;
  cancel: (event: React.MouseEvent<any, MouseEvent>) => void;
  submit: (event: React.MouseEvent<any, MouseEvent>) => void;

  customers: Array<ICustomer>;
  jobTypes: Array<IJobTypes>;
}

function CreateJob({
  modal,
  cancel,
  submit,
  modalMode,
  customers,
  jobTypes
}: CreateJobProps) {
  const [modeState, setModeState] = useState<number>(modalMode);

  const [employeeType, setEmployeeType] = useState('');
  const [jobType, setJobType] = useState('');
  const [technician, setTechnician] = useState('');
  const [customer, setCustomer] = useState('');
  const [equipment, setEquipment] = useState('');
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(
    () => {
      modal && setModeState(modalMode);
    },
    [modal, modalMode]
  );

  return (
    <div className={'modal-wrapper'}>
      <Dialog
        maxWidth={false}
        open={modal}>
        <DialogTitle>
          {titles[modeState]}
        </DialogTitle>
        <DialogContent>
          <div className={'modal-col'}>
            {modeState !== 1 &&
              <FormGroup className={'required'}>
                <InputLabel>
                  {'Select Customer'}
                </InputLabel>
                <Select
                  className={'select'}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setCustomer(event.target.value as string);
                  }}
                  value={customer}
                  variant={'outlined'}>
                  <MenuItem value={''}>
                    <em>
                      {'None'}
                    </em>
                  </MenuItem>
                  {customers.map(customer =>
                    <MenuItem
                      key={customer._id}
                      value={customer._id}>
                      {customer.profile.displayName}
                    </MenuItem>)}
                </Select>
              </FormGroup>
            }
            {modeState !== 1 &&
              <FormGroup>
                <InputLabel>
                  {'Notes / Special Instructions'}
                </InputLabel>
                <TextField
                  className={'TextField'}
                  fullWidth
                  multiline
                  name={'instructions'}
                  placeholder={'...'}
                  rows={'5'}
                  variant={'outlined'}
                />
              </FormGroup>
            }

            {modeState !== 0 &&
              <FormGroup>
                <InputLabel>
                  {'Employee Type'}
                </InputLabel>
                <Select
                  className={'select'}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setEmployeeType(event.target.value as string);
                  }}
                  value={employeeType}
                  variant={'outlined'}>
                  <MenuItem value={''}>
                    <em>
                      {'None'}
                    </em>
                  </MenuItem>
                  {employeeTypes.map(employeeType =>
                    <MenuItem
                      key={employeeType.value}
                      value={employeeType.value}>
                      {employeeType.label}
                    </MenuItem>)}
                </Select>
              </FormGroup>
            }
            {modeState !== 0 &&
              <FormGroup className={'required'}>
                <InputLabel>
                  {'Job Type'}
                </InputLabel>
                <Select
                  className={'select'}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setJobType(event.target.value as string);
                  }}
                  value={jobType}
                  variant={'outlined'}>
                  <MenuItem value={''}>
                    <em>
                      {'None'}
                    </em>
                  </MenuItem>
                  {jobTypes.map(jobType =>
                    <MenuItem
                      key={jobType._id}
                      value={jobType._id}>
                      {jobType.title}
                    </MenuItem>)}
                </Select>
              </FormGroup>
            }
            {modeState !== 0 &&
              <FormGroup className={'required'}>
                <InputLabel>
                  {'Select Technician'}
                </InputLabel>
                <Select
                  className={'select'}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setTechnician(event.target.value as string);
                  }}
                  value={technician}
                  variant={'outlined'}>
                  <MenuItem value={''}>
                    <em>
                      {'None'}
                    </em>
                  </MenuItem>
                  {technicians.map(technician =>
                    <MenuItem
                      key={technician.value}
                      value={technician.value}>
                      {technician.label}
                    </MenuItem>)}
                </Select>
              </FormGroup>
            }
            {modeState !== 0 &&
              <FormGroup>
                <InputLabel>
                  {'Select Equipment'}
                </InputLabel>
                <Select
                  className={'select'}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setEquipment(event.target.value as string);
                  }}
                  value={equipment}
                  variant={'outlined'}>
                  <MenuItem value={''}>
                    <em>
                      {'None'}
                    </em>
                  </MenuItem>
                  {equipments.map(equipment =>
                    <MenuItem
                      key={equipment.value}
                      value={equipment.value}>
                      {equipment.label}
                    </MenuItem>)}
                </Select>
              </FormGroup>
            }

            {modeState === 1 &&
              <FormGroup>
                <InputLabel>
                  {'Description'}
                </InputLabel>
                <TextField
                  className={'TextField'}
                  fullWidth
                  multiline
                  name={'instructions'}
                  placeholder={'...'}
                  rows={'5'}
                  variant={'outlined'}
                />
              </FormGroup>
            }
          </div>

          {modeState !== 0 &&
            <div className={'modal-col'}>
              <FormGroup>
                <InputLabel>
                  {'Schedule Date & Time'}
                </InputLabel>
                <FormGroup className={'required'}>
                  <InputLabel>
                    {'Choose Date'}
                  </InputLabel>
                  <div className={'calendar-container'}>
                    <Calendar
                      date={scheduleDate}
                      onChange={date => {
                        date !== null && setScheduleDate(date);
                      }}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <InputLabel>
                    {'Start Time:'}
                  </InputLabel>
                  <Select
                    className={'select'}
                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                      setStartTime(event.target.value as string);
                    }}
                    value={startTime}
                    variant={'outlined'}>
                    <MenuItem value={''}>
                      <em>
                        {'None'}
                      </em>
                    </MenuItem>
                    {startTimes.map(equipment =>
                      <MenuItem
                        key={equipment.value}
                        value={equipment.value}>
                        {equipment.label}
                      </MenuItem>)}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <InputLabel>
                    {'Duration'}
                  </InputLabel>
                  <Select
                    className={'select'}
                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                      setDuration(event.target.value as string);
                    }}
                    value={duration}
                    variant={'outlined'}>
                    <MenuItem value={''}>
                      <em>
                        {'None'}
                      </em>
                    </MenuItem>
                    {durations.map(equipment =>
                      <MenuItem
                        key={equipment.value}
                        value={equipment.value}>
                        {equipment.label}
                      </MenuItem>)}
                  </Select>
                </FormGroup>
              </FormGroup>
            </div>
          }
        </DialogContent>
        <DialogActions>
          <Button
            className={'cancel-button'}
            onClick={cancel}
            variant={'contained'}>
            {'Cancel'}
          </Button>
          <Button
            className={'submit-button'}
            color={'primary'}
            onClick={submit}
            variant={'contained'}>
            {'Submit'}
          </Button>
          {modeState === 0 &&
            <Button
              className={'generate-job-button'}
              color={'secondary'}
              onClick={() => setModeState(JOB_DETAIL)}
              variant={'contained'}>
              {'Generate Job'}
            </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state: {
  customers: {
    list: Array<ICustomer>
  },
  jobTypes: {
    list: Array<IJobTypes>
  }
}) => ({
  'customers': state.customers.list,
  'jobTypes': state.jobTypes.list
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateJob);
