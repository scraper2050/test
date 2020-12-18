import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BCAdminProfile from '../../../../components/bc-admin-profile/bc-admin-profile';
import BCBackButton from '../../../../components/bc-back-button/bc-back-button';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from 'actions/image/image.action';
import { updateCompanyProfileAction } from 'actions/user/user.action';
import { CompanyProfile } from 'actions/user/user.types'

function CompanyProfilePage() {
  const dispatch = useDispatch();
  const image = useSelector((state: any) => state.image);
  const company = useSelector((state: any) => state.vendors.detail);
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
    if(company && company.info.companyName) {
      setCompanyName(company.info.companyName);
    }
    if(company && company.info.companyEmail) {
      setCompanyEmail(company.info.companyEmail);
    }
    if(company && company.contact.phone) {
      setPhone(company.contact.phone);
    }
    if(company && company.address.city) {
      setCity(company.address.city);
    }
    if(company && company.address.state) {
      setState(company.address.state);
    }
    if(company && company.address.zipCode) {
      setZipCode(company.address.zipCode);
    }
    if(company && company.address.street) {
      setStreet(company.address.street);
    }
  });

  const cancel = () => {}
  const apply = () => {}

  const imageSelected = (f: File) => {
    if (!f) return;
    const formData = new FormData();
    formData.append('image', f);
    dispatch(uploadImage(formData));
  }

  return (
    <>
      <MainContainer>
        <BCBackButton
          link={'/main/admin/vendors'}
        />
        <PageContainer>        
          <BCAdminProfile
            avatar={{
              isEmpty: 'NO',
              url: !image.data ? '' : image.data.imageUrl,
              onChange: imageSelected
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
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
  margin-top: 10px;
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
  button {
    display: none;
  }
  input {
    color: black;
  }
`;


export default CompanyProfilePage;
