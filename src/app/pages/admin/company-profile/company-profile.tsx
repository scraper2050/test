import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCompanyProfileAction,
  getCompanyLocationsAction
} from 'actions/user/user.action';
import {
  CompanyLocation,
  CompanyProfileStateType
} from 'actions/user/user.types';
import BCCircularLoader from '../../../components/bc-circular-loader/bc-circular-loader';
import BCCompanyLocation
  from "../../../components/bc-company-profile/bc-company-location";
import BCCompanyProfile
  from "../../../components/bc-company-profile/bc-company-profile";
import {
  companyLocationFields,
} from "../../../components/bc-company-profile/fields";

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
  const [location, setLocation] = useState<CompanyLocation| null>(null);

  useEffect(() => {
    let user: User = {};
    user = JSON.parse(localStorage.getItem('user') || "");
    dispatch(getCompanyProfileAction(user?.company as string));
    dispatch(getCompanyLocationsAction());
  }, []);

  return (
    <MainContainer>
      <PageContainer>
        {
          profileState.isLoading ? (
              <BCCircularLoader/>
            ) :
            <div>
              <BCCompanyLocation setLocation={setLocation}/>
              <br />
              {location &&
                <BCCompanyProfile
                  fields={companyLocationFields(location)}
                />
              }
            </div>
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
