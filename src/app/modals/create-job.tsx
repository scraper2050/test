import { Calendar } from "@material-ui/pickers";
import { Dispatch } from "redux";
import { connect } from "react-redux";
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
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  addMinutes,
  format,
  formatDuration,
  intervalToDuration,
} from "date-fns";
import "./create-job.scss";

import { Action } from "redux-actions";
import { loadCustomersActions } from "actions/customer/customer.action";
import { loadJobTypesActions } from "actions/job-type/job-type.action";
import { loadAllEmployeesActions } from "actions/employee/employee.action";
import { loadCompanyContractsActions } from "actions/vendor/vendor.action";
import { loadCompanyEquipmentsActions } from "actions/company-equipment/company-equipment.action";

// models import
import { Contract } from "app/models/contract";
import { UserModel } from "app/models/user";
import { JobType } from "app/models/job";
import { Customer } from "app/models/customer";
import { CompanyEquipment } from "app/models/company-equipment";

const titles: string[] = ["New Ticket", "New Job", "Job Detail"];

const JOB_DETAIL = 2;

type OptionType = { value: string; label: string };

const employeeTypes: OptionType[] = [
  { label: "employee", value: "0" },
  { label: "vendor", value: "1" },
];

const startTimes: OptionType[] = [];
for (
  let startTime = new Date(1982, 12, 20, 0, 0);
  startTime < new Date(1982, 12, 21, 0, 0);
  startTime = addMinutes(startTime, 30)
) {
  const value = format(startTime, "hh:mm a");
  startTimes.push({
    label: value,
    value,
  });
}
const now = new Date();
const durations: OptionType[] = [];
for (let minutes = 60; minutes < 60 * 6 + 30; minutes += 30) {
  const value = formatDuration(
    intervalToDuration({
      end: addMinutes(now, minutes),
      start: now,
    })
  );
  durations.push({
    label: value,
    value,
  });
}

interface Props {
  modal: boolean;
  modalMode: number;
  cancel: (event: React.MouseEvent<any, MouseEvent>) => void;
  submit: (event: React.MouseEvent<any, MouseEvent>) => void;

  customers: Array<Customer>;
  jobTypes: Array<JobType>;
  employees: Array<UserModel>;
  companyContracts: Array<Contract>;
  companyEquipments: Array<CompanyEquipment>;

  loadCustomers: () => Action<any>;
  loadJobTypes: (paran?: { companyId: string }) => Action<any>;
  loadAllEmployees: () => Action<any>;
  loadCompanyContracts: () => Action<any>;
  loadCompanyEquipments: () => Action<any>;
}

function CreateJob({
  modal,
  cancel,
  submit,
  modalMode,

  customers,
  jobTypes,
  employees,
  companyContracts,
  companyEquipments,

  loadCustomers,
  loadJobTypes,
  loadAllEmployees,
  loadCompanyContracts,
  loadCompanyEquipments,
}: Props) {

  const [modeState, setModeState] = useState<number>(modalMode);

  const [employeeType, setEmployeeType] = useState("0");
  const [jobType, setJobType] = useState("");
  const [technician, setTechnician] = useState("");
  const [technicians, setTechnicians] = useState<Array<OptionType>>([]);
  const [customer, setCustomer] = useState("");
  const [equipment, setEquipment] = useState("");
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    loadCustomers();
    // loadJobTypes({ companyId: "5f360274e63e8251bab08256" });
    loadJobTypes();
    loadCompanyEquipments();
  }, [loadCustomers, loadJobTypes, loadCompanyEquipments]);

  useEffect(() => {
    modal && setModeState(modalMode);
  }, [modal, modalMode]);

  useEffect(() => {
    switch (employeeType) {
      case "0":
        loadAllEmployees();
        break;
      case "1":
        loadCompanyContracts();
        break;
    }
  }, [employeeType, loadAllEmployees, loadCompanyContracts]);

  useEffect(() => {
    let _technicians: Array<OptionType> = [];
    if (employeeType === "0") {
      employees.map((employee) =>
        _technicians.push({
          value: employee._id,
          label: employee.profile.displayName,
        })
      );
      setTechnicians(_technicians);
    } else if (employeeType === "1") {
      companyContracts.map((contract) =>
        _technicians.push({
          value: contract._id,
          label: contract.contractor,
        })
      );
      setTechnicians(_technicians);
    }
  }, [employeeType, employees, companyContracts]);

  const handleSubmit = (e: React.MouseEvent<any, MouseEvent>) => {
    if (modeState) {
      
    }
    submit(e);
  };

  return (
    <div className={"modal-wrapper"}>
      <Dialog maxWidth={false} open={modal}>
        <DialogTitle>{titles[modeState]}</DialogTitle>
        <DialogContent>
          <div className={"modal-col"}>
            {modeState !== 1 && (
              <FormGroup className={"required"}>
                <InputLabel>{"Select Customer"}</InputLabel>
                <Select
                  className={"select"}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setCustomer(event.target.value as string);
                  }}
                  value={customer}
                  variant={"outlined"}
                >
                  <MenuItem value={""}>
                    <em>{"None"}</em>
                  </MenuItem>
                  {customers.map((customer) => (
                    <MenuItem key={customer._id} value={customer._id}>
                      {customer.profile.displayName}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            )}
            {modeState !== 1 && (
              <FormGroup>
                <InputLabel>{"Notes / Special Instructions"}</InputLabel>
                <TextField
                  className={"TextField"}
                  fullWidth
                  multiline
                  name={"instructions"}
                  placeholder={"..."}
                  rows={"5"}
                  variant={"outlined"}
                />
              </FormGroup>
            )}

            {modeState !== 0 && (
              <FormGroup>
                <InputLabel>{"Employee Type"}</InputLabel>
                <Select
                  className={"select"}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setEmployeeType(event.target.value as string);
                  }}
                  value={employeeType}
                  variant={"outlined"}
                >
                  {/* <MenuItem value={""}>
                    <em>{"None"}</em>
                  </MenuItem> */}
                  {employeeTypes.map((employeeType) => (
                    <MenuItem
                      key={employeeType.value}
                      value={employeeType.value}
                    >
                      {employeeType.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            )}
            {modeState !== 0 && (
              <FormGroup className={"required"}>
                <InputLabel>{"Job Type"}</InputLabel>
                <Select
                  className={"select"}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setJobType(event.target.value as string);
                  }}
                  value={jobType}
                  variant={"outlined"}
                >
                  <MenuItem value={""}>
                    <em>{"None"}</em>
                  </MenuItem>
                  {jobTypes.map((jobType) => (
                    <MenuItem key={jobType._id} value={jobType._id}>
                      {jobType.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            )}
            {modeState !== 0 && (
              <FormGroup className={"required"}>
                <InputLabel>{"Select Technician"}</InputLabel>
                <Select
                  disabled={employeeType === ""}
                  className={"select"}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setTechnician(event.target.value as string);
                  }}
                  value={technician}
                  variant={"outlined"}
                >
                  <MenuItem value={""}>
                    <em>{"None"}</em>
                  </MenuItem>
                  {technicians.map((technician) => (
                    <MenuItem key={technician.value} value={technician.value}>
                      {technician.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            )}
            {modeState !== 0 && (
              <FormGroup>
                <InputLabel>{"Select Equipment"}</InputLabel>
                <Select
                  className={"select"}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setEquipment(event.target.value as string);
                  }}
                  value={equipment}
                  variant={"outlined"}
                >
                  <MenuItem value={""}>
                    <em>{"None"}</em>
                  </MenuItem>
                  {companyEquipments.map((equipment) => (
                    <MenuItem key={equipment._id} value={equipment._id}>
                      {equipment.company}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            )}

            {modeState === 1 && (
              <FormGroup>
                <InputLabel>{"Description"}</InputLabel>
                <TextField
                  className={"TextField"}
                  fullWidth
                  multiline
                  name={"instructions"}
                  placeholder={"..."}
                  rows={"5"}
                  variant={"outlined"}
                />
              </FormGroup>
            )}
          </div>

          {modeState !== 0 && (
            <div className={"modal-col"}>
              <FormGroup>
                <InputLabel>{"Schedule Date & Time"}</InputLabel>
                <FormGroup className={"required"}>
                  <InputLabel>{"Choose Date"}</InputLabel>
                  <div className={"calendar-container"}>
                    <Calendar
                      date={scheduleDate}
                      onChange={(date) => {
                        date !== null && setScheduleDate(date);
                      }}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <InputLabel>{"Start Time:"}</InputLabel>
                  <Select
                    className={"select"}
                    onChange={(
                      event: React.ChangeEvent<{ value: unknown }>
                    ) => {
                      setStartTime(event.target.value as string);
                    }}
                    value={startTime}
                    variant={"outlined"}
                  >
                    <MenuItem value={""}>
                      <em>{"None"}</em>
                    </MenuItem>
                    {startTimes.map((equipment) => (
                      <MenuItem key={equipment.value} value={equipment.value}>
                        {equipment.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <InputLabel>{"Duration"}</InputLabel>
                  <Select
                    className={"select"}
                    onChange={(
                      event: React.ChangeEvent<{ value: unknown }>
                    ) => {
                      setDuration(event.target.value as string);
                    }}
                    value={duration}
                    variant={"outlined"}
                  >
                    <MenuItem value={""}>
                      <em>{"None"}</em>
                    </MenuItem>
                    {durations.map((equipment) => (
                      <MenuItem key={equipment.value} value={equipment.value}>
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
            className={"cancel-button"}
            onClick={cancel}
            variant={"contained"}
          >
            {"Cancel"}
          </Button>
          <Button
            className={"submit-button"}
            color={"primary"}
            onClick={handleSubmit}
            variant={"contained"}
          >
            {"Submit"}
          </Button>
          {modeState === 0 && (
            <Button
              className={"generate-job-button"}
              color={"secondary"}
              onClick={() => setModeState(JOB_DETAIL)}
              variant={"contained"}
            >
              {"Generate Job"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state: {
  customers: {
    list: Array<Customer>;
  };
  jobTypes: {
    list: Array<JobType>;
  };
  employees: {
    list: Array<UserModel>;
  };
  vendor: {
    companyContracts: Array<Contract>;
  };
  companyEquipment: {
    list: Array<CompanyEquipment>;
  };
}) => ({
  customers: state.customers.list,
  jobTypes: state.jobTypes.list,
  employees: state.employees.list,
  companyContracts: state.vendor.companyContracts,
  companyEquipments: state.companyEquipment.list,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadJobTypes: (param?: { companyId: string }) =>
    dispatch(loadJobTypesActions.fetch(param)),
  loadCustomers: () => dispatch(loadCustomersActions.fetch()),
  loadAllEmployees: () => dispatch(loadAllEmployeesActions.fetch()),
  loadCompanyContracts: () => dispatch(loadCompanyContractsActions.fetch()),
  loadCompanyEquipments: () => dispatch(loadCompanyEquipmentsActions.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateJob);
