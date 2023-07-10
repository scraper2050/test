import React, { useEffect, useState } from 'react';
import ExclamationMark from './bc-ExclamationMark';
import Popup from './bc-popup';

interface PopupMarkProps {
  data: any;
}

const PopupMark: React.FC<PopupMarkProps>= ({data}) => {
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [emails, setEmails]= useState<any>([])

  const bounceEmails: Array<string>= [];

  useEffect(()=>{
    setEmails(data.original.emailHistory)
  })
  
  for (const email of emails) {
    if (email.deliveryStatus === false){
      bounceEmails.push(email.sentTo)
    }
  }

  //styles
  const styles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
  };

  const handleMouseHover = (): void => {
    setPopupVisible(true);
  };

  const handleMouseLeave = (): void => {
    setPopupVisible(false);
  };

  return (
    <div style={styles}>
      <ExclamationMark
        mouseEnter={handleMouseHover}
        mouseLeave={handleMouseLeave}
      />
      {isPopupVisible && (
        <Popup bounceEmails={bounceEmails} mouseEnter={handleMouseHover} mouseLeave={handleMouseLeave} />
      )}
    </div>
  );
};

export default PopupMark;