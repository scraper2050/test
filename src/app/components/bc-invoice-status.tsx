import React from 'react';

interface Props {
  status: string;
}


const bgColors: {[index: string]:string}={PAID: '#81c784', UNPAID: '#F50057', PARTIALLY_PAID: '#FA8029'};

export default function CSInvoiceStatus({status}:Props) {
  const textStatus = status.split('_').join(' ').toLowerCase();

  return (
    <div style={{
      width: 60,
      height: 60,
      borderRadius: '50%',
      border: `2px dashed ${bgColors[status]}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{
        color: bgColors[status],
        fontWeight: 'bold',
        transform: 'rotate(30deg)',
      }}>{status}</span>
    </div>
  );
}
