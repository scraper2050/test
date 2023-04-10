import React, {useState} from 'react';
import BCCircularLoader from "../bc-circular-loader/bc-circular-loader";


interface EmailButtonProps {
    data: any,
    Component: any,
    showLoader?: boolean,
    errorDispatcher: (message:string) => void;
    draftInvoiceHandler: (data:any, emailDefault:string) => void;
    invoiceHandler: (data:any, emailDefault:string) => void;
    oldJobReportHandler: (data:any) => void;
    getInvoiceEmailTemplate: (invoiceId: string) => Promise<any>;
}

export default function EmailButton({ data, Component, showLoader = true, errorDispatcher, draftInvoiceHandler, invoiceHandler, oldJobReportHandler, getInvoiceEmailTemplate }: EmailButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async(e: any) => {
    e.stopPropagation();
    if (data.typeText === 'Invoice') {
      setIsLoading(true);
      try {
        const response = await getInvoiceEmailTemplate(data.id);
        setIsLoading(false);
        const {emailTemplate: emailDefault, status, message} = response.data
        if (status === 1) {
          if(data?.invoice?.isDraft){
            draftInvoiceHandler(data, emailDefault)
          } else {
            invoiceHandler(data, emailDefault)
          }
        } else {
          errorDispatcher(message);
        }
      } catch (e) {
        setIsLoading(false);
        let message = 'Unknown Error'
        if (e instanceof Error) {
          message = e.message
        }
        errorDispatcher(message);
      }
    } else {
      oldJobReportHandler(data)
    }
  };

  return isLoading && showLoader? <BCCircularLoader heightValue={'10px'} size={20}/> :
    React.cloneElement(Component, { 'onClick': handleClick });
}


