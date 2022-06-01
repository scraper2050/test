import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BCAdminProfile from '../../../components/bc-admin-profile/bc-admin-profile'
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCompanyProfileAction,
  getCompanyProfileAction,
  getCompanyLocationsAction
} from 'actions/user/user.action';
import { CompanyProfile, CompanyProfileStateType } from 'actions/user/user.types';
import { phoneRegExp, digitsOnly } from 'helpers/format';
import BCCircularLoader from '../../../components/bc-circular-loader/bc-circular-loader';
import * as Yup from 'yup';
import BCCompanyLocation
  from "../../../components/bc-company-profile/bc-company-location";

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
  const [update, setUpdate] = useState(true);
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
      street,
      paymentTerm
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
      street,
      paymentTerm
    }

    await dispatch(updateCompanyProfileAction(data));
    setUpdate(!update);
  }

  useEffect(() => {
    let user: User = {};
    user = JSON.parse(localStorage.getItem('user') || "");
    dispatch(getCompanyProfileAction(user?.company as string));
    dispatch(getCompanyLocationsAction());
  }, [update]);

  return (
    <MainContainer>
      <PageContainer>
        {
          profileState.isLoading ? (
              <BCCircularLoader/>
            ) :
            <BCCompanyLocation
              avatar={{
                isEmpty: 'NO',
                url: imageUrl === "" ? initialValues.logoUrl : imageUrl,
                imageUrl: imageUrl,
              }}
              companyName={profileState.companyName}
              // locations={profileState.locations}
              //companyID={user?.company}
            />
        }
      </PageContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  margin-left: 10px;
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
