import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BCEmailPreference from '../../../components/bc-email-preference/bc-email-preference';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from 'api/user.api';
import { updateCompanyProfileAction, getCompanyProfileAction } from 'actions/user/user.action';
import { CompanyProfile, CompanyProfileStateType } from 'actions/user/user.types';
import { phoneRegExp, digitsOnly } from 'helpers/format';
import BCCircularLoader from '../../../components/bc-circular-loader/bc-circular-loader';
import { updateEmployeeEmailPreferences } from 'api/email-preferences.api';
import * as Yup from 'yup';
import { loginActions } from 'actions/auth/auth.action';
import { error, success, info } from 'actions/snackbar/snackbar.action'


function EmailPreferencePage() {
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);

  const userProfile: any = JSON.parse(localStorage.getItem('user') || '');

  const initialValues = {
    employeeId: userProfile._id,
    emailPreferences: userProfile.emailPreferences.preferences,
    emailTime: userProfile.emailPreferences.time
  }

  const apply = async (values: any) => {
    try {
      const response: any = await updateEmployeeEmailPreferences(values);

      if (response.message === "preferences updated successfully.") {

        let oldUserProfile = userProfile;

        let emailPreferences = oldUserProfile.emailPreferences;

        emailPreferences = {
          preferences: values.emailPreferences
        }

        if (values.emailTime !== undefined) {
          emailPreferences = {
            ...emailPreferences,
            time: `T${values.emailTime}`
          }
        }

        oldUserProfile = {
          ...oldUserProfile,
          emailPreferences
        }



        let token = localStorage.getItem('token');
        localStorage.setItem('user', JSON.stringify(oldUserProfile));

        dispatch(loginActions.success({
          token,
          user: oldUserProfile,
        }))

        dispatch(success("Email Preferences successfully updated!"));
        return true;
      } else if (response.message === "Email time is required for scheduled emails.") {
        dispatch(info("Email time is required for daily email."));
        return true;
      } else {
        dispatch(error("Something went wrong, please try again later."));
        return true;
      }
    } catch (err) {
      return true;
      console.log(err);
    }
  }


  return (
    <MainContainer>
      <PageContainer>
        {
          isLoading ? (
            <BCCircularLoader />
          ) : (
            <BCEmailPreference
              apply={(values: any) => apply(values)}
              initialValues={initialValues}
            />
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


export default EmailPreferencePage;
