import React, { useEffect, useState } from 'react';
import ExclamationMark from './bc-ExclamationMark';
import Popup from './bc-popup';

interface PopupMarkProps {
  data: () => any;
  endpoint: string;
  params: object;
  callback: (dispatch: any) => Promise<unknown>;
}

interface IEmailsData {
  sentTo: string;
  sentAt: string;
  sentBy: string;
  deliveryStatus?: boolean;
}

const PopupMark: React.FC<PopupMarkProps> = ({ data, endpoint, params, callback }) => {
  const [ isPopupVisible, setPopupVisible ] = useState<boolean>(false);
  const [emails, setEmails] = useState<IEmailsData[]>([]);
  const bounceEmails: Array<string>= [];
  
  useEffect( () => {
    setEmails(data);
  })
  if(emails){
    for (const email of emails) {
      if (email.deliveryStatus === false) {
        bounceEmails.push(email.sentTo)
      }
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

  const handlePopMarkClick=(e:any)=>{
    e.stopPropagation();
  }

  return (
    <div style={styles} onClick={(e)=>handlePopMarkClick(e)} >
      <ExclamationMark
        mouseEnter={handleMouseHover}
        mouseLeave={handleMouseLeave}
      />
      {isPopupVisible && (
        <Popup 
          bounceEmails={bounceEmails} 
          mouseEnter={handleMouseHover} 
          mouseLeave={handleMouseLeave} 
          endpoint={endpoint} 
          params={params}
          callback={callback}
        />
      )}
    </div>
  );
};

export default PopupMark;

