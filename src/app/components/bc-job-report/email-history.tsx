
import BCTableContainer from '../bc-table-container/bc-table-container';
import React from 'react';
import { formatDatTimelll } from 'helpers/format';
import styled from 'styled-components';

type Email = {
    sentAt: string;
    sentTo: string;
}

interface EmailHistoryProps {
    emailHistory: Email[]
}

const columns: any = [
  {
    Cell({ row }: any) {
      const date = formatDatTimelll(row.original.sentAt);
      return date;
    },
    'Header': 'Date Sent',
    'accessor': 'sentAt',
    'id': 'sentAt',
    'sortable': true

  },
  {

    'Header': 'Sent to',
    'accessor': 'sentTo',
    'id': 'sentTo',
    'sortable': true
  }
];

const EmailHistoryContainer = styled.div`
  @media print {
      display: none;
  }
margin-bottom: 40px;`;
export default function EmailHistory({ emailHistory }:EmailHistoryProps) {
  if (!emailHistory.length) {
    return null;
  }
  return <EmailHistoryContainer>
    <h2>
      {'Email History'}
    </h2>
    <BCTableContainer
      columns={columns}
      initialMsg={'No history yet'}
      isDefault
      onRowClick={() => { }}
      pageSize={6}
      pagination={false}
      stickyHeader
      tableData={emailHistory.reverse()}
    />
  </EmailHistoryContainer>;
}


