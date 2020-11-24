import React, { useState } from 'react';
import styled from 'styled-components';
import BCAdminProfile from '../../../components/bc-admin-profile/bc-admin-profile'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from 'actions/image/image.action';
import { updateCompanyProfileAction } from 'actions/user/user.action';
import { CompanyProfile } from 'actions/user/user.types'

function CompanyProfilePage() {
  const dispatch = useDispatch();
  const image = useSelector((state: any) => state.image);
  const [companyName, setCompanyName] = useState('');
  const [companyNameValid] = useState(true);
  const [companyEmail, setCompanyEmail] = useState('');
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

  const companyNameChanged = (newValue: string) => {
    setCompanyName(newValue);
  }

  const companyEmailChanged = (newValue: string) => {
    setCompanyEmail(newValue);
    setCompanyEmailValid(validator.isEmail(newValue));
  }

  const phoneChanged = (newValue: string) => {
    setPhone(newValue);
    setPhoneValid(validator.isMobilePhone(newValue));
  }

  const faxChanged = (newValue: string) => {
    setFax(newValue);
  }

  const streetChanged = (newValue: string) => {
    setStreet(newValue);
  }

  const cityChanged = (newValue: string) => {
    setCity(newValue);
  }

  const stateChanged = (newValue: string) => {
    setState(newValue);
  }

  const zipCodeChanged = (newValue: string) => {
    setZipCode(newValue);
    setZipCodeValid(validator.isNumeric(newValue));
  }

  const apply = () => {
    if (companyNameValid === false
      || companyEmailValid === false
      || phoneValid === false
      || faxValid === false
      || streetValid === false
      || cityValid === false
      || stateValid === false
      || zipCodeValid === false) {
      return;
    }

    let data: CompanyProfile = {
      companyName: companyName,
      companyEmail: companyEmail,
      logoUrl: !image.data ? '' : image.data.imageUrl,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
      phone: phone,
      fax: fax,
    }

    dispatch(updateCompanyProfileAction(data));
  }

  const cancel = () => {

  }

  const imageSelected = (f: File) => {
    if (!f) return;
    const formData = new FormData();
    formData.append('image', f);
    dispatch(uploadImage(formData));
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
          <BCAdminProfile
            avatar={{
              isEmpty: 'NO',
              url: !image.data ? '' : image.data.imageUrl,
              onChange: imageSelected
            }}
            apply={apply}
            cancel={cancel}
            fields={[
              {
                left: {
                  id: 'companyName',
                  label: 'Company Name:',
                  placehold: 'BlueClerk',
                  value: companyName,
                  valid: companyNameValid,
                  onChange: companyNameChanged
                },
                right: {
                  id: 'companyEmail',
                  label: 'Company Email:',
                  placehold: 'john.doe@gmail.com',
                  value: companyEmail,
                  valid: companyEmailValid,
                  onChange: companyEmailChanged
                },
              },
              {
                left: {
                  id: 'phone',
                  label: 'Phone:',
                  placehold: '1234567890',
                  value: phone,
                  valid: phoneValid,
                  onChange: phoneChanged
                },
                right: {
                  id: 'fax',
                  label: 'Fax:',
                  placehold: 'fax',
                  value: fax,
                  valid: faxValid,
                  onChange: faxChanged
                }
              },
              {
                left: {
                  id: 'street',
                  label: 'Street:',
                  placehold: 'Test test test',
                  value: street,
                  valid: streetValid,
                  onChange: streetChanged
                },
                right: {
                  id: 'city',
                  label: 'City:',
                  placehold: 'Austin',
                  value: city,
                  valid: cityValid,
                  onChange: cityChanged
                }
              },
              {
                left: {
                  id: 'state',
                  label: 'State:',
                  placehold: 'TX',
                  value: state,
                  valid: stateValid,
                  onChange: stateChanged
                },
                right: {
                  id: 'zipCode',
                  label: 'Zip Code:',
                  placehold: '78757',
                  value: zipCode,
                  valid: zipCodeValid,
                  onChange: zipCodeChanged
                }
              },
            ]} />
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


export default CompanyProfilePage;
