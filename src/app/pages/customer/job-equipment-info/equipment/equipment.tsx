import BCBackButtonNoLink from '../../../../components/bc-back-button/bc-back-button-no-link';
import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import BCTabs from '../../../../components/bc-tab/bc-tab';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from './equipment.style';
import { withStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import { DUMMY_DATA, DUMMY_COLUMN } from '../dummy-data';

function CustomersJobEquipmentInfoEquipmentPage({ classes }: any) {
  const location = useLocation();
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const renderGoBack = (location: any) => {
    const baseObj = location;
    let customerName =
      baseObj["customerName"] && baseObj["customerName"] !== undefined
        ? baseObj["customerName"]
        : "N/A";
    let customerId =
      baseObj["customerId"] && baseObj["customerId"] !== undefined
        ? baseObj["customerId"]
        : "N/A";

    let linkKey: any = localStorage.getItem('nestedRouteKey');
    localStorage.setItem('prevNestedRouteKey', linkKey);
    localStorage.setItem('nestedRouteKey', `${customerName}`);

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
      <div className={classes.pageMainContainer}>
        <div className={classes.pageContainer}>
          <div className={classes.pageContent}>

            <Grid
              container>
              <BCBackButtonNoLink
                func={() => renderGoBack(location.state)}
              />
              <div className="tab_wrapper">
                <BCTabs
                  curTab={curTab}
                  indicatorColor={'primary'}
                  onChangeTab={handleTabChange}
                  tabsData={[
                    {
                      'label': 'CUSTOMER EQUIPMENT',
                      'value': 0
                    },
                  ]}
                />
              </div>
            </Grid>

            <div
              style={{
                'height': '15px'
              }}
            />

            <div
              className={`${classes.dataContainer} `}
              hidden={curTab !== 0}
              id={'0'}>
              <BCTableContainer
                columns={DUMMY_COLUMN}
                isLoading={isLoading}
                search
                searchPlaceholder={"Search...(Keyword, Datae, Tag, etc.)"}
                tableData={DUMMY_DATA}
                initialMsg="There are no data!"
              />
            </div>

          </div>
        </div>
      </div>
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
)(CustomersJobEquipmentInfoEquipmentPage);
