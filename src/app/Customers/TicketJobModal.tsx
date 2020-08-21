import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import './TicketJobModal.scss';
import { ValueType } from 'react-select/src/types';

const titles: string[] = ['New Ticket', 'New Job', 'Job Detail'];

const JOB_DETAIL = 2;

type OptionType = {
  value: string;
  label: string;
};

const employeeTypes: OptionType[] = [
  { value: '0', label: 'EmployeeType0' },
  { value: '1', label: 'EmployeeType1' },
  { value: '2', label: 'EmployeeType2' },
  { value: '3', label: 'EmployeeType3' },
  { value: '4', label: 'EmployeeType4' }
];
const jobTypes: OptionType[] = [
  { value: '0', label: 'jobType0' },
  { value: '1', label: 'jobType1' },
  { value: '2', label: 'jobType2' },
  { value: '3', label: 'jobType3' },
  { value: '4', label: 'jobType4' }
];
const technicians: OptionType[] = [
  { value: '0', label: 'technician0' },
  { value: '1', label: 'technician1' },
  { value: '2', label: 'technician2' },
  { value: '3', label: 'technician3' },
  { value: '4', label: 'technician4' }
];
const customers: OptionType[] = [
  { value: '0', label: 'customer0' },
  { value: '1', label: 'customer1' },
  { value: '2', label: 'customer2' },
  { value: '3', label: 'customer3' },
  { value: '4', label: 'customer4' }
];

const TicketJobModal = ({ modal, cancel, submit, modalMode }) => {
  const [modeState, setModeState] = useState<number>(modalMode);

  const [employeeType, setEmployeeType] = useState<ValueType<OptionType>>();
  const [jobType, setJobType] = useState<ValueType<OptionType>>();
  const [technician, setTechnician] = useState<ValueType<OptionType>>();
  const [customer, setCustomer] = useState<ValueType<OptionType>>();

  useEffect(() => {
    modal && setModeState(modalMode);
  }, [modal, modalMode]);
  return (
    <div className="modal-wrapper">
      <Modal isOpen={modal}>
        <ModalHeader>{titles[modeState]}</ModalHeader>
        <ModalBody className="animated fadeIn">
          <div className="modal-col">

            {modeState !== 1 && (
              <FormGroup className="required">
                <Label>Select Customer</Label>
                <Select
                  name="customer"
                  value={customer}
                  options={customers}
                  onChange={(value: ValueType<OptionType>) => {
                    setCustomer(value);
                  }}
                />
              </FormGroup>
            )}
            {modeState !== 1 && (
              <FormGroup>
                <Label>Notes / Special Instructions</Label>
                <Input
                  type="textarea"
                  name="instructions"
                  rows="6"
                  placeholder="Notes / Special Instructions..."
                />
              </FormGroup>
            )}

            {modeState !== 0 && (
              <FormGroup>
                <Label>Employee Type</Label>
                <Select
                  name="employeeType"
                  value={employeeType}
                  options={employeeTypes}
                  onChange={(value: ValueType<OptionType>) => {
                    setEmployeeType(value);
                  }}
                />
              </FormGroup>
            )}
            {modeState !== 0 && (
              <FormGroup className="required">
                <Label>Job Type</Label>
                <Select
                  name="form-field-name2"
                  value={jobType}
                  options={jobTypes}
                  onChange={(value: ValueType<OptionType>) => {
                    setJobType(value);
                  }}
                />
              </FormGroup>
            )}
            {modeState !== 0 && (
              <FormGroup className="required">
                <Label>Select Technician</Label>
                <Select
                  name="form-field-name2"
                  value={technician}
                  options={technicians}
                  onChange={(value: ValueType<OptionType>) => {
                    setTechnician(value);
                  }}
                />
              </FormGroup>
            )}
            {modeState !== 0 && (
              <FormGroup>
                <Label>Select Equipment</Label>
                <Select
                  name="form-field-name2"
                  value={technician}
                  options={technicians}
                  onChange={(value: ValueType<OptionType>) => {
                    setTechnician(value);
                  }}
                />
              </FormGroup>
            )}

            {modeState === 1 && (
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="textarea"
                  name="instructions"
                  rows="6"
                  placeholder="Description..."
                />
              </FormGroup>
            )}
          </div>

          {modeState !== 0 && (
            <div className="modal-col">
              <FormGroup className="required">
                <Label>Schedule Date & Time</Label>
              </FormGroup>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            className="btn-pill btn-cancel"
            onClick={cancel}
          >
            Cancel
          </Button>{' '}
          <Button color="success" className="btn-pill" onClick={submit}>
            Submit
          </Button>
          {modeState === 0 && (
            <Button
              color="info"
              className="btn-pill"
              onClick={() => setModeState(JOB_DETAIL)}
            >
              Generate Job
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

TicketJobModal.propTypes = {
  modal: PropTypes.bool,
  mode: PropTypes.number,
  cancel: PropTypes.func,
  submit: PropTypes.func
};

export default TicketJobModal;
