import React from 'react';
import WarningIcon from '@material-ui/icons/Warning';
import { Button } from '@material-ui/core';

interface PopupProps {
  mouseLeave: () => void;
  mouseEnter: () => void;
}

const Popup: React.FC<PopupProps> = ({ mouseEnter, mouseLeave }) => {
  const popupStyles: React.CSSProperties = {
    position: 'absolute',
    top: '30px',
    right: '0',
    width: '260px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '26px',
    borderRadius: '12px',
    boxShadow: '0px 0px 10px 0px #0000004D',
    zIndex: 999,
    fontFamily: 'Roboto',
  };

  const contentStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const iconStyles: React.CSSProperties = {
    marginRight: '10px',
    color: '#fe0000',
    display: 'flex',
    justifyContent: 'center',
  };

  const textStyles: React.CSSProperties = {
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '21px',
    letterSpacing: '0px',
    color: '#fe0000',
  };

  const buttonStyles: React.CSSProperties = {
    border: '2px solid #fe0000',
    borderRadius: '6px',
    color: '#fe0000',
    fontWeight: '400',
    fontSize: '12px',
    padding: '8px',
    marginTop: '36px',
  };
  const brStyles = {
    background: '#c3c3c3',
    height: '3px',
    bordeRadius: '30px',
  };
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mouseLeave();
  };

  return (
    <div
      style={popupStyles}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div style={contentStyles}>
        <div style={iconStyles}>
          <WarningIcon style={iconStyles} />
        </div>
        <div style={textStyles}>Invoice Not Sent</div>
      </div>
      <div style={brStyles}></div>
      <div>
        <p style={{ marginBottom: '10px', textWrap: 'wrap', color: 'grey' }}>
          There was an issue delivering this invoice. Please check the email.
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

