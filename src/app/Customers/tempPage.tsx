import React, { useState } from 'react'
import TicketJobModal from "./TicketJobModal";
import {
  Button
} from 'reactstrap';

const NEW_TICKET = 0;
const NEW_JOB = 1;

const TempPage: () => JSX.Element = () => {
  const [modal, setModal] = useState(false);
  const [modalMode, setModalMode] = useState(NEW_JOB);
  return (
    <div style={{
      width: '100%',
      height: '100vh',
    }}>
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
        <Button style={testButton}
          onClick={() => {
            setModal(true);
            setModalMode(NEW_TICKET);
          }}>New Ticket</Button>
        <Button style={testButton}
          onClick={() => {
            setModal(true);
            setModalMode(NEW_JOB);
          }}>New Job</Button>
      </div>
      {/* component use */}
      <TicketJobModal
        modal={modal}
        modalMode={modalMode}
        cancel={() => setModal(false)} submit={() => setModal(false)} />
      {/* ************* */}
    </div>
  );
}

const testButton = {
  margin: '50px',
  alignSelf: 'center',
}

export default TempPage;