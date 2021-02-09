import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BCAdminProfile from '../../../../components/bc-admin-profile/bc-admin-profile';
import BCTabs from '../../../../components/bc-tab/bc-tab';
import BCBackButton from '../../../../components/bc-back-button/bc-back-button';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCAdminCard from '../../../../components/bc-admin-card/bc-admin-card';
import ReportsIcon from 'assets/img/icons/customers/Reports';
import JobsIcon from 'assets/img/icons/customers/Jobs';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PaymentIcon from '@material-ui/icons/Payment';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from 'actions/image/image.action';
import { updateCompanyProfileAction } from 'actions/user/user.action';
import { CompanyProfile } from 'actions/user/user.types'
import { useLocation, useHistory } from "react-router-dom";
import { getVendorDetailAction, loadingSingleVender } from 'actions/vendor/vendor.action';
import { Grid, withStyles } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import styles from './view-more.styles';
import BCBackButtonNoLink from '../../../../components/bc-back-button/bc-back-button-no-link';


function CompanyProfilePage({ classes }: any) {
  const dispatch = useDispatch();
  const image = useSelector((state: any) => state.image);
  const { vendorObj, loading = true } = useSelector((state: any) => state.vendors);
  const location = useLocation<any>();
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);


  const [companyName, setCompanyName] = useState('');
  const [companyNameValid] = useState(true);
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyEmailValid, setCompanyEmailValid] = useState(true);
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [fax, setFax] = useState('');
  const [faxValid] = useState(true);
  const [street, setStreet] = useState('');
  const [streetValid] = useState(true);
  const [city, setCity] = useState('');
  const [cityValid] = useState(true);
  const [state, setState] = useState('');
  const [stateValid] = useState(true);
  const [zipCode, setZipCode] = useState('');
  const [zipCodeValid, setZipCodeValid] = useState(true);

  const cancel = () => { }
  const apply = () => { }

  const imageSelected = (f: File) => {
    if (!f) return;
    const formData = new FormData();
    formData.append('image', f);
    dispatch(uploadImage(formData));
  }

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  useEffect(() => {

    if (vendorObj === undefined) {
      const obj: any = location.state;
      const vendorId = obj.vendorId;
      dispatch(loadingSingleVender());
      dispatch(getVendorDetailAction(vendorId));
    }
  }, []);


  useEffect(() => {
    if (vendorObj) {
      console.log(vendorObj, 'vendorObj')
      if (vendorObj.info.companyName) {
        setCompanyName(vendorObj.info.companyName);
      }
      if (vendorObj.info.companyEmail) {
        setCompanyEmail(vendorObj.info.companyEmail);
      }
      if (vendorObj.info.logoUrl) {
        setCompanyLogo(vendorObj.info.logoUrl);
      }
      if (vendorObj.contact.phone) {
        setPhone(vendorObj.contact.phone);
      }
      if (vendorObj.address.city) {
        setCity(vendorObj.address.city);
      }
      if (vendorObj.address.state) {
        setState(vendorObj.address.state);
      }
      if (vendorObj.address.zipCode) {
        setZipCode(vendorObj.address.zipCode);
      }
      if (vendorObj.address.street) {
        setStreet(vendorObj.address.street);
      }
    }
  }, [vendorObj]);


  const renderGoBack = (location: any) => {
    const baseObj = location;

    const stateObj = baseObj && baseObj['currentPage'] !== undefined ? {
      prevPage: baseObj['currentPage']
    } : {}

    history.push({
      pathname: `/main/admin/vendors`,
      state: stateObj
    });

  }

  return (
    <>
      <div className={classes.pageMainContainer}>
        <div className={classes.pageContainer}>
          <div className={classes.pageContent}>
            <Grid container>

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
                      'label': 'VENDOR INFO',
                      'value': 0
                    },
                    {
                      'label': 'JOBS/REPORTS INFO',
                      'value': 1
                    }
                  ]}
                />
              </div>

            </Grid>

            {loading ?
              <BCCircularLoader heightValue={'200px'} />
              : <SwipeableViews index={curTab} className={'swipe_wrapper'}>
                <div
                  className={`${classes.dataContainer} `}
                  hidden={curTab !== 0}
                  id={'0'}>
                  <MainContainer>
                    <PageContainer>
                      <BCAdminProfile
                        avatar={{
                          isEmpty: 'NO',
                          url: companyLogo !== '' ? companyLogo : '',
                          onChange: imageSelected,
                          noUpdate: true
                        }}
                        apply={apply}
                        cancel={cancel}
                        inputError={{}}
                        fields={[
                          {
                            left: {
                              id: 'companyName',
                              label: 'Company Name:',
                              placehold: 'Input Company Name',
                              value: companyName,
                              valid: companyNameValid
                            },
                            right: {
                              id: 'companyEmail',
                              label: 'Company Email:',
                              placehold: 'Input Company Emaill',
                              value: companyEmail,
                              valid: companyEmailValid
                            },
                          },
                          {
                            left: {
                              id: 'phone',
                              label: 'Phone:',
                              placehold: 'Input Phone Number',
                              value: phone,
                              valid: phoneValid
                            },
                            right: {
                              id: 'fax',
                              label: 'Fax:',
                              placehold: 'Input Fax',
                              value: fax,
                              valid: faxValid
                            }
                          },
                          {
                            left: {
                              id: 'street',
                              label: 'Street:',
                              placehold: 'Input Street',
                              value: street,
                              valid: streetValid
                            },
                            right: {
                              id: 'city',
                              label: 'City:',
                              placehold: 'Input City',
                              value: city,
                              valid: cityValid
                            }
                          },
                          {
                            left: {
                              id: 'state',
                              label: 'State:',
                              placehold: 'Input State',
                              value: state,
                              valid: stateValid
                            },
                            right: {
                              id: 'zipCode',
                              label: 'Zip Code:',
                              placehold: 'Input Zip Code',
                              value: zipCode,
                              valid: zipCodeValid
                            }
                          },
                        ]} />
                    </PageContainer>

                  </MainContainer>
                </div>

                <div
                  hidden={curTab !== 1}
                  style={{
                    'padding': '40px'
                  }}
                  id={'1'}>
                  <Grid container spacing={5}>
                    <Grid item>
                      <BCAdminCard
                        cardText={'Reports'}
                        color={'primary'}
                        func={() => { }}
                      >
                        <ReportsIcon />
                      </BCAdminCard>
                    </Grid>

                    <Grid item>
                      <BCAdminCard
                        cardText={'Jobs'}
                        color={'secondary'}
                        func={() => { }}
                      >
                        <JobsIcon />
                      </BCAdminCard>
                    </Grid>

                    <Grid
                      item>
                      <BCAdminCard
                        cardText={'Invoices'}
                        color={'primary-orange'}
                        func={() => { }}
                      >
                        <ReceiptIcon />
                      </BCAdminCard>
                    </Grid>

                    <Grid
                      item>
                      <BCAdminCard
                        cardText={'Estimates'}
                        color={'primary-green'}
                        func={() => { }}
                      >
                        <PaymentIcon />
                      </BCAdminCard>
                    </Grid>

                  </Grid>
                </div>

              </SwipeableViews>
            }
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
  /* padding-left: 65px; */
  padding-right: 65px;
  margin: 0 auto;
  button  {
    display: none;
  }
  input {
    color: black;
  }
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(CompanyProfilePage);
