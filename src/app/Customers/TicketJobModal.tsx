import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Calendar } from "@material-ui/pickers";
import "./TicketJobModal.scss";
import {
  addMinutes,
  format,
  formatDuration,
  intervalToDuration,
} from "date-fns";

const titles: string[] = ["New Ticket", "New Job", "Job Detail"];

const JOB_DETAIL = 2;

type OptionType = {
  value: string;
  label: string;
};

const customers: OptionType[] = [
  { value: "0", label: "Customer0" },
  { value: "1", label: "Customer1" },
  { value: "2", label: "Customer2" },
  { value: "3", label: "Customer3" },
  { value: "4", label: "Customer4" },
];
const employeeTypes: OptionType[] = [
  { value: "0", label: "EmployeeType0" },
  { value: "1", label: "EmployeeType1" },
  { value: "2", label: "EmployeeType2" },
  { value: "3", label: "EmployeeType3" },
  { value: "4", label: "EmployeeType4" },
];
const jobTypes: OptionType[] = [
  { value: "0", label: "JobType0" },
  { value: "1", label: "JobType1" },
  { value: "2", label: "JobType2" },
  { value: "3", label: "JobType3" },
  { value: "4", label: "JobType4" },
];
const technicians: OptionType[] = [
  { value: "0", label: "Technician0" },
  { value: "1", label: "Technician1" },
  { value: "2", label: "Technician2" },
  { value: "3", label: "Technician3" },
  { value: "4", label: "Technician4" },
];
const equipments: OptionType[] = [
  { value: "0", label: "Equipment0" },
  { value: "1", label: "Equipment1" },
  { value: "2", label: "Equipment2" },
  { value: "3", label: "Equipment3" },
  { value: "4", label: "Equipment4" },
];

const startTimes: OptionType[] = [];
for (
  let startTime = new Date(1982, 12, 20, 0, 0);
  startTime < new Date(1982, 12, 21, 0, 0);
  startTime = addMinutes(startTime, 30)
) {
  let value = format(startTime, "hh:mm a");
  startTimes.push({ value, label: value });
}
const now = new Date();
const durations: OptionType[] = [];
for (let minutes = 60; minutes < 60 * 6 + 30; minutes += 30) {
  let value = formatDuration(
    intervalToDuration({ start: now, end: addMinutes(now, minutes) })
  );
  durations.push({ value, label: value });
}

interface TicketJobModalProps {
  modal: boolean;
  modalMode: number;
  cancel: (event: React.MouseEvent<any, MouseEvent>) => void;
  submit: (event: React.MouseEvent<any, MouseEvent>) => void;
}

const TicketJobModal: React.FC<TicketJobModalProps> = ({
  modal,
  cancel,
  submit,
  modalMode,
}: TicketJobModalProps) => {
  const [modeState, setModeState] = useState<number>(modalMode);

  const [employeeType, setEmployeeType] = useState("");
  const [jobType, setJobType] = useState("");
  const [technician, setTechnician] = useState("");
  const [customer, setCustomer] = useState("");
  const [equipment, setEquipment] = useState("");
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    modal && setModeState(modalMode);
  }, [modal, modalMode]);
  return (
    <div className="modal-wrapper">
      <Dialog open={modal} maxWidth={false}>
        <DialogTitle>{titles[modeState]}</DialogTitle>
        <DialogContent>
          <div className="modal-col">
            {modeState !== 1 && (
              <FormGroup className="required">
                <InputLabel>Select Customer</InputLabel>
                <Select
                  className="select"
                  value={customer}
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setCustomer(event.target.value as string);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {customers.map((customer) => (
                    <MenuItem value={customer.value} key={customer.value}>
                      {customer.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            )}
            {modeState !== 1 && (
              <FormGroup>
                <InputLabel>Notes / Special Instructions</InputLabel>
                <TextField
                  className="TextField"
                  fullWidth
                  multiline
                  rows="5"
                  name="instructions"
                  placeholder="..."
                  variant="outlined"
                />
              </FormGroup>
            )}

            {modeState !== 0 && (
              <FormGroup>
                <InputLabel>Employee Type</InputLabel>
                <Select
                  className="select"
                  value={employeeType}
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setEmployeeType(event.target.value as string);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {employeeTypes.map((employeeType) => (
                    <MenuItem
                      value={employeeType.value}
                      key={employeeType.value}
                    >
                      {employeeType.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            )}
            {modeState !== 0 && (
              <FormGroup className="required">
                <InputLabel>Job Type</InputLabel>
                <Select
                  className="select"
                  value={jobType}
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setJobType(event.target.value as string);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {jobTypes.map((jobType) => (
                    <MenuItem value={jobType.value} key={jobType.value}>
                      {jobType.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            )}
            {modeState !== 0 && (
              <FormGroup className="required">
                <InputLabel>Select Technician</InputLabel>
                <Select
                  className="select"
                  value={technician}
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setTechnician(event.target.value as string);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {technicians.map((technician) => (
                    <MenuItem value={technician.value} key={technician.value}>
                      {technician.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            )}
            {modeState !== 0 && (
              <FormGroup>
                <InputLabel>Select Equipment</InputLabel>
                <Select
                  className="select"
                  value={equipment}
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setEquipment(event.target.value as string);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {equipments.map((equipment) => (
                    <MenuItem value={equipment.value} key={equipment.value}>
                      {equipment.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            )}

            {modeState === 1 && (
              <FormGroup>
                <InputLabel>Description</InputLabel>
                <TextField
                  className="TextField"
                  fullWidth
                  multiline
                  rows="5"
                  name="instructions"
                  placeholder="..."
                  variant="outlined"
                />
              </FormGroup>
            )}
          </div>

          {modeState !== 0 && (
            <div className="modal-col">
              <FormGroup>
                <InputLabel>Schedule Date & Time</InputLabel>
                <FormGroup className="required">
                  <InputLabel>Choose Date</InputLabel>
                  <div className="calendar-container">
                    <Calendar
                      date={scheduleDate}
                      onChange={(date) => {
                        date !== null && setScheduleDate(date);
                      }}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <InputLabel>Start Time:</InputLabel>
                  <Select
                    className="select"
                    value={startTime}
                    variant="outlined"
                    onChange={(
                      event: React.ChangeEvent<{ value: unknown }>
                    ) => {
                      setStartTime(event.target.value as string);
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {startTimes.map((equipment) => (
                      <MenuItem value={equipment.value} key={equipment.value}>
                        {equipment.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <InputLabel>Duration</InputLabel>
                  <Select
                    className="select"
                    value={duration}
                    variant="outlined"
                    onChange={(
                      event: React.ChangeEvent<{ value: unknown }>
                    ) => {
                      setDuration(event.target.value as string);
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {durations.map((equipment) => (
                      <MenuItem value={equipment.value} key={equipment.value}>
                        {equipment.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormGroup>
              </FormGroup>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={cancel}
            variant="contained"
            className={"cancel-button"}
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            variant="contained"
            color="primary"
            className={"submit-button"}
          >
            Submit
          </Button>
          {modeState === 0 && (
            <Button
              onClick={() => setModeState(JOB_DETAIL)}
              variant="contained"
              color="secondary"
              className={"generate-job-button"}
            >
              Generate Job
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TicketJobModal;
