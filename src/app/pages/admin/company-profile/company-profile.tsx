import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BCAdminProfile from '../../../components/bc-admin-profile/bc-admin-profile'
import { useDispatch, useSelector } from 'react-redux';
import { updateCompanyProfileAction, getCompanyProfileAction } from 'actions/user/user.action';
import { CompanyProfile, CompanyProfileStateType } from 'actions/user/user.types';
import { phoneRegExp, digitsOnly } from 'helpers/format';
import BCCircularLoader from '../../../components/bc-circular-loader/bc-circular-loader';
import * as Yup from 'yup';

const companyProfileSchema = Yup.object().shape({
  companyName: Yup.string().required('Required'),
  companyEmail: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  zipCode: Yup.string().matches(digitsOnly, 'The field should have digits only')
});

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
  const profileState: CompanyProfileStateType = useSelector((state: any) => state.profile);
  const [imageUrl, setImageUrl] = useState("");
  const [update, setUpdate] = useState(true)


  const initialValues = profileState;

  const handleUpdateCompanyProfile = async (values: any) => {
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
    } = values


    const data: CompanyProfile = {
      companyName,
      companyEmail,
      phone,
      logoUrl,
      fax,
      city,
      state,
      zipCode,
      street
    }

    await dispatch(updateCompanyProfileAction(data));
    setUpdate(!update);
  }

  useEffect(() => {
    let user: User = {};
    user = JSON.parse(localStorage.getItem('user') || "");
    dispatch(getCompanyProfileAction(user?.company as string));
  }, [update]);

  return (
    <MainContainer>
      <PageContainer>
        {
          profileState.isLoading ? (
            <BCCircularLoader />
          ) : (
              <BCAdminProfile
                title="Edit Company Profile"
                avatar={{
                  isEmpty: 'NO',
                  url: imageUrl === "" ? initialValues.logoUrl : imageUrl,
                  imageUrl: imageUrl,
                }}
                apply={(value: any) => handleUpdateCompanyProfile(value)}
                inputError={profileState.inputError}
                initialValues={initialValues}
                schema={companyProfileSchema}
                fields={[
                  {
                    left: {
                      id: 'companyName',
                      label: 'Company Name:',
                      placehold: 'Input Company Name',
                      value: profileState.companyName,
                    },
                    right: {
                      id: 'companyEmail',
                      label: 'Company Email:',
                      placehold: 'Input Company Email',
                      value: profileState.companyEmail,
                    },
                  },
                  {
                    left: {
                      id: 'phone',
                      label: 'Phone:',
                      placehold: 'Input Phone Number',
                      value: profileState.phone,
                    },
                    right: {
                      id: 'fax',
                      label: 'Fax:',
                      placehold: 'Input Fax',
                      value: profileState.fax,
                    }
                  },
                  {
                    left: {
                      id: 'street',
                      label: 'Street:',
                      placehold: 'Input Street',
                      value: profileState.street,
                    },
                    right: {
                      id: 'city',
                      label: 'City:',
                      placehold: 'Input City',
                      value: profileState.city,
                    }
                  },
                  {
                    left: {
                      id: 'state',
                      label: 'State:',
                      placehold: 'Input State',
                      value: profileState.state,
                    },
                    right: {
                      id: 'zipCode',
                      label: 'Zip Code:',
                      placehold: 'Input Zip Code',
                      value: profileState.zipCode,
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
  width: 90%;
  margin-left: 20px;
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
