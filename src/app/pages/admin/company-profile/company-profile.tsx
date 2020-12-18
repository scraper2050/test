import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BCAdminProfile from '../../../components/bc-admin-profile/bc-admin-profile'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from 'actions/image/image.action';
import { updateCompanyProfileAction, getCompanyProfileAction } from 'actions/user/user.action';
import { CompanyProfile, CompanyProfileActonType, CompanyProfileStateType } from 'actions/user/user.types'
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';
import { phoneNumberFormatter, phoneNumberValidator } from 'helpers/format';
import { useHistory } from 'react-router-dom';
import BCCircularLoader from '../../../components/bc-circular-loader/bc-circular-loader';
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

function CompanyProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const image = useSelector((state: any) => state.image);
  const profileState: CompanyProfileStateType = useSelector((state: any) => state.profile);

  useEffect(() => {
    let user: User = {};
    user = JSON.parse(localStorage.getItem('user') || "");
    dispatch(getCompanyProfileAction(user?.company as string));
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { id, value } } = event;
    const inputError:{[s: string]: boolean} = {};

    switch (id) {
      case 'companyEmail':
        inputError.companyEmail = validator.isEmail(value);
        break;
      case 'phone':
        inputError.phone = phoneNumberValidator(value);
        break;
      case 'zipCode':
        inputError.zipCode = validator.isNumeric(value);
        break;
      default:
        break;
    }

    dispatch({ type: CompanyProfileActonType.ONCHANGE, payload: { id, value, inputError } });
  }

  const handleUpdateCompanyProfile = () => {
    const {
      companyName,
      companyEmail,
      phone,
      logoUrl,
      fax,
      city,
      state,
      zipCode,
      street
    } = profileState
    const data: CompanyProfile = {
      companyName,
      companyEmail,
      phone,
      logoUrl: (image?.data && image.data.imageUrl) ? image.data?.imageUrl : logoUrl,
      fax,
      city,
      state,
      zipCode,
      street
    }

    dispatch(updateCompanyProfileAction(data));
  }

  const cancel = () => {
    history.push('/main/admin/billing')
  }

  const imageSelected = (f: File) => {
    if (!f) return;
    const formData = new FormData();
    formData.append('image', f);
    dispatch(uploadImage(formData));
  }

  return (
        <MainContainer>
        <PageContainer>
          {
            profileState.isLoading ? (
              <BCCircularLoader />
            ) : (
              <BCAdminProfile
              avatar={{
                isEmpty: 'NO',
                url: !image.data ? profileState.logoUrl : image.data.imageUrl,
                onChange: imageSelected
              }}
              apply={handleUpdateCompanyProfile}
              cancel={cancel}
              inputError={profileState.inputError}
              fields={[
                {
                  left: {
                    id: 'companyName',
                    label: 'Company Name:',
                    placehold: 'Input Company Name',
                    value: profileState.companyName,
                    text: '',
                    onChange: handleOnChange
                  },
                  right: {
                    id: 'companyEmail',
                    label: 'Company Email:',
                    placehold: 'Input Company Email',
                    value: profileState.companyEmail,
                    text: 'please provide a valid email address',
                    onChange: handleOnChange
                  },
                },
                {
                  left: {
                    id: 'phone',
                    label: 'Phone:',
                    placehold: 'Input Phone Number',
                    value: phoneNumberFormatter(profileState.phone),
                    text: 'please provide a valid 10 digit phone number',
                    onChange: handleOnChange
                  },
                  right: {
                    id: 'fax',
                    label: 'Fax:',
                    placehold: 'Input Fax',
                    value: profileState.fax,
                    text: '',
                    onChange: handleOnChange
                  }
                },
                {
                  left: {
                    id: 'street',
                    label: 'Street:',
                    placehold: 'Input Street',
                    value: profileState.street,
                    text: '',
                    onChange: handleOnChange
                  },
                  right: {
                    id: 'city',
                    label: 'City:',
                    placehold: 'Input City',
                    value: profileState.city,
                    text: '',
                    onChange: handleOnChange
                  }
                },
                {
                  left: {
                    id: 'state',
                    label: 'State:',
                    placehold: 'Input State',
                    value: profileState.state,
                    text: '',
                    onChange: handleOnChange
                  },
                  right: {
                    id: 'zipCode',
                    label: 'Zip Code:',
                    placehold: 'Input Zip Code',
                    value: profileState.zipCode,
                    text: 'please enter a valid zip code',
                    onChange: handleOnChange
                  }
                },
              ]} />
            )
          }
        </PageContainer>
      </MainContainer>
    )
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
