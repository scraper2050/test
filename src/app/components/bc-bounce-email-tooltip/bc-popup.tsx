import React from 'react';
import WarningIcon from '@material-ui/icons/Warning';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { markAsRead } from 'api/invoicing.api';

interface PopupProps {
  mouseLeave: () => void;
  mouseEnter: () => void;
  bounceEmails: string[];
  endpoint: string;
  params: object;
  callback: (dispatch: any) => Promise<unknown>;
}

const Popup: React.FC<PopupProps> = ({ mouseEnter, mouseLeave, bounceEmails, endpoint, params, callback }) => {

  const dispatch = useDispatch()

  const popupStyles: React.CSSProperties = {
    position: 'absolute',
    top: '30px',
    right: '0',
    width: '260px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '26px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 0px #0000004D',
    zIndex: 999,
    fontFamily: 'Roboto',
  };

  const contentStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'start',
  };

  const iconContainerStyles: React.CSSProperties = {
    marginRight: '6px',
    color: '#ff0000',
    display: 'flex',
    justifyContent: 'center',
  };

  const iconStyles = {
    fontSize: '30px',
  };

  const headStyles: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ff0000',
  };

  const paraStyles: React.CSSProperties = {
    whiteSpace: 'pre-wrap',
    color: '#9d9d9d',
    fontSize: '14px',
    lineHeight: '28px',
    margin: '0px 0 16px 0',
  };

  const buttonStyles: React.CSSProperties = {
    border: '2px solid #fe0000',
    borderRadius: '6px',
    color: '#ff0000',
    fontWeight: 400,
    fontSize: '12px',
    padding: '8px 12px',
    marginTop: '0px',
  };

  const brStyles = {
    background: '#e9eaef',
    height: '2px',
    bordeRadius: '30px',
    margin: '12px 0 12px 0',
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mouseLeave();
    dispatch(markAsRead(endpoint, params, callback))
  };

  const emailStyles={
    color: 'rgba(0, 0, 0, 0.87)'
  }

  return (
    <div
      style={popupStyles}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div style={contentStyles}>
        <div style={iconContainerStyles}>
          <WarningIcon style={iconStyles} />
        </div>
        <div style={headStyles}>Invoice Not Sent</div>
      </div>
      <div style={brStyles}></div>
      <div>
        <p style={paraStyles}>
          There was an issue delivering<br />this invoice. Please check<br />the email: 
          {
           (bounceEmails.length===1)? 
           (bounceEmails.map((element:string,index: number)=> <span key={index} style={emailStyles} >  {element}</span>) ): 
           (bounceEmails.map((element: string,index: number) => <span key={index} style={emailStyles} >  {element},</span>))
          }
        </p>
      </div>
      <div>
        <Button
          style={buttonStyles}
          variant="outlined"
          onClick={handleButtonClick}
        >
          Mark as read
        </Button>
      </div>
    </div>
  );
};

export default Popup;

