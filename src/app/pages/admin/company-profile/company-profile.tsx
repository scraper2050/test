import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BCAdminProfile from '../../../components/bc-admin-profile/bc-admin-profile'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from 'actions/image/image.action';
import { updateCompanyProfileAction } from 'actions/user/user.action';
import { CompanyProfile } from 'actions/user/user.types'
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';

interface User {
  _id?: string,
  auth?: {
    email?: string,
    password?: string
  },
  profile?: {
    firstName?: string,
    lastName?: string,
    displayName?: string
  },
  address?: {
    street?: string,
    city?: string,
    state?: string,
    zipCode?: string
  },
  contact?: {
    phone?: string
  },
  permissions?: {
    role?: 0
  },
  info?: {
    companyName?: string,
    companyEmail?: string,
    fax?: string,
    phone?: string,
    city?: string,
    state?: string,
    zipCode?: string,
    logoUrl?: string,
    industry?: string
  },
  company?: string
}

interface Company {
  companyName?: string,
  companyEmail?: string,
  fax?: string,
  phone?: string,
  city?: string,
  state?: string,
  zipCode?: string,
  logoUrl?: string,
  industry?: string,
  street?: string
}

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

  useEffect(() => {
    let user: User = {};
    user = JSON.parse(localStorage.getItem('user') || "");
    let company: Company = {};
    company = JSON.parse(localStorage.getItem('company') || "");
    
    if(company && company.companyName) {
      setCompanyName(company.companyName);
    }
    else if(user.info && user.info.companyName) {
      setCompanyName(user.info.companyName);
    }
    if(company && company.companyEmail) {
      setCompanyEmail(company.companyEmail);
    }
    else if(user.auth && user.auth.email) {
      setCompanyEmail(user.auth.email);
    }
    if(company && company.phone) {
      setPhone(company.phone);
    }
    else if(user.contact && user.contact.phone) {
      setPhone(user.contact.phone);
    }
    if(company && company.city) {
      setCity(company.city);
    }
    else if(user.address && user.address.city) {
      setCity(user.address.city);
    }
    if(company && company.state) {
      setState(company.state);
    }
    else if(user.address && user.address.state) {
      setState(user.address.state);
    }
    if(company && company.zipCode) {
      setZipCode(company.zipCode);
    }
    else if(user.address && user.address.zipCode) {
      setZipCode(user.address.zipCode);
    }
    if(company && company.street) {
      setStreet(company.street);
    }
    else if(user.address && user.address.street) {
      setStreet(user.address.street);
    }
  });

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

    const data: CompanyProfile = {
      companyName,
      companyEmail,
      logoUrl: !image.data ? '' : image.data.imageUrl,
      street,
      city,
      state,
      zipCode,
      phone,
      fax,
    }

    dispatch(updateCompanyProfileAction(data));

    localStorage.setItem(
      'company',
      JSON.stringify({
        companyName,
        companyEmail,
        phone,
        logoUrl: !image.data ? '' : image.data.imageUrl,
        fax,
        city,
        state,
        zipCode,
        street
      })
    );
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
                  placehold: 'Input Company Name',
                  value: companyName,
                  valid: companyNameValid,
                  onChange: companyNameChanged
                },
                right: {
                  id: 'companyEmail',
                  label: 'Company Email:',
                  placehold: 'Input Company Emaill',
                  value: companyEmail,
                  valid: companyEmailValid,
                  onChange: companyEmailChanged
                },
              },
              {
                left: {
                  id: 'phone',
                  label: 'Phone:',
                  placehold: 'Input Phone Number',
                  value: phone,
                  valid: phoneValid,
                  onChange: phoneChanged
                },
                right: {
                  id: 'fax',
                  label: 'Fax:',
                  placehold: 'Input Fax',
                  value: fax,
                  valid: faxValid,
                  onChange: faxChanged
                }
              },
              {
                left: {
                  id: 'street',
                  label: 'Street:',
                  placehold: 'Input Street',
                  value: street,
                  valid: streetValid,
                  onChange: streetChanged
                },
                right: {
                  id: 'city',
                  label: 'City:',
                  placehold: 'Input City',
                  value: city,
                  valid: cityValid,
                  onChange: cityChanged
                }
              },
              {
                left: {
                  id: 'state',
                  label: 'State:',
                  placehold: 'Input State',
                  value: state,
                  valid: stateValid,
                  onChange: stateChanged
                },
                right: {
                  id: 'zipCode',
                  label: 'Zip Code:',
                  placehold: 'Input Zip Code',
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
