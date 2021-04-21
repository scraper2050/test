import BCBackButton from '../../../../components/bc-back-button/bc-back-button';
import { Fab, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import styles from './subscription.style';
import { useDispatch, useSelector } from 'react-redux';
import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import { loadSubscriptions } from 'actions/subscription/subscription.action';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';

interface Props {
  classes: any;
}

function BillingSubscriptionPage({ classes }:Props) {
  const dispatch = useDispatch();
  const { error, loading, subscriptions } = useSelector((state: any) => state.subscriptions);


  useEffect(() => {
    dispatch(loadSubscriptions.fetch());
  }, []);

  const columns: any = [
    {
      'Header': 'Subscription',
      'accessor': 'label',
      'sortable': true,
      'width': 60
    },
    {
      'Header': 'Number of Subscriptions',
      'accessor': 'value',
      'className': 'font-bold',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return (
          <div className={'flex items-center'}>
            <Fab
              aria-label={'edit'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'primary'}
              // OnClick={() => renderViewMore(row)}
              variant={'extended'}>
              {'Edit'}
            </Fab>
          </div>
        );
      },
      'id': 'action',
      'sortable': false,
      'width': 60
    }
  ];

  if (error) {
    return <h2>
      {error}
    </h2>;
  }


  if (loading) {
    return <BCCircularLoader heightValue={'200px'} />;
  }

  return (
    <MainContainer>
      <BCBackButton link={'/main/admin/billing'} />
      <PageContainer>
        <PageContent>
          <Grid container >
            <Grid
              item
              xs={6}>
              <BCTableContainer
                columns={columns}
                isLoading={subscriptions.loading}
                isPageSaveEnabled
                search
                searchPlaceholder={'Search for subscriptions'}
                tableData={subscriptions}
              />
            </Grid>

          </Grid>
        </PageContent>
      </PageContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
  flex-direction: column;
  margin-top: 10px;
`;

const PageContainer = styled.div`
  display: block;
  width: 100%;
`;

const PageContent = styled.div`
  '@media(min-width: 1909px)': {
    padding-left: 60px
  };
  padding: 20px 30px;

  td {
    text-transform: capitalize;
  }
  button {
    color: white;
  }
}`;


export default withStyles(styles, { 'withTheme': true })(BillingSubscriptionPage);
