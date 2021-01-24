import BCBackButtonNoLink from '../../../../components/bc-back-button/bc-back-button-no-link';
import BCTabs from '../../../../components/bc-tab/bc-tab';
import { Grid } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import styles from './reports.style';
import { withStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';

function CustomersJobEquipmentInfoReportsPage({ classes }: any) {
  const location = useLocation();
  const history = useHistory();

  const renderGoBack = (location: any) => {
    let baseObj = location;
    let customerName =
      baseObj["customerName"] && baseObj["customerName"] !== undefined
        ? baseObj["customerName"]
        : "N/A";
    let customerId =
      baseObj["customerId"] && baseObj["customerId"] !== undefined
        ? baseObj["customerId"]
        : "N/A";

    history.push({
      pathname: `/main/customers/${customerName}`,
      state: {
        customerName,
        customerId,
        from: 'job-equipment-info'
      }
    });
  }

  return (
    <>
      {/* <BCSubHeader title={'Admin'}>
        <BCToolBarSearchInput style={{
          'marginLeft': 'auto',
          'width': '321px'
        }}
        />
      </BCSubHeader> */}

      <MainContainer>
        <PageContainer>
          <Grid
            container
            spacing={4}>
            <BCBackButtonNoLink
              func={() => renderGoBack(location.state)}
            />
          </Grid>
        </PageContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 30px;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(CustomersJobEquipmentInfoReportsPage);
