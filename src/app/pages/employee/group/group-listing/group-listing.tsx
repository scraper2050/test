import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import styles from './../group.styles';
import { withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups, loadingGroups } from 'actions/group/group.action';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';

function GroupListing({ classes }: any) {
  const dispatch = useDispatch();
  const groups = useSelector((state: any) => state.groups); 
  const columns: any = [
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>{ row.index + 1 }</div>;
      },
      'Header': 'No#',
      'sortable': true,
      'width': 60
    },
    {
      'Header': 'Group Name',
      'accessor': 'title',
      'className': 'font-bold',
      'sortable': true
    }
  ];

  useEffect(() => {
    dispatch(loadingGroups());
    dispatch(getGroups());
  }, []);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (
    <DataContainer
      id={'0'}>
      {
        groups.loading ? 
          <BCCircularLoader heightValue={'200px'} /> : 
          <BCTableContainer
          columns={columns}
          onRowClick={handleRowClick}
          search
          searchPlaceholder={'Search Groups...'}
          tableData={groups.data}
        />
      }
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(GroupListing);
