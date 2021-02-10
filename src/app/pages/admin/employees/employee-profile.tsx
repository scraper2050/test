import React, { useState } from 'react';
import styled from 'styled-components';
import BCAdminProfile from '../../../components/bc-admin-profile/bc-admin-profile';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from 'actions/image/image.action';
import { Grid, withStyles } from '@material-ui/core';
import styles from './employees.style';
import BCBackButtonNoLink from '../../../components/bc-back-button/bc-back-button-no-link';
import { phoneRegExp } from 'helpers/format';
import * as Yup from 'yup';

interface Props {
  profile: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }
  back: () => void;
  classes: any
}

const userProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

function EmployeeProfile({ profile, back, classes }: Props) {
  const dispatch = useDispatch();
  const image = useSelector((state: any) => state.image);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [firstNameValid] = useState(true);
  const [lastName, setLastname] = useState(profile.lastName);
  const [lastNameValid] = useState(true);
  const [email, setEmail] = useState(profile.email);
  const [emailValid, setEmailVaild] = useState(true);
  const [phone, setPhone] = useState(profile.phone);
  const [phoneValid, setPhoneValid] = useState(true);


  const firstNameChanged = (newValue: string) => {
    setFirstName(newValue);
  }

  const emailChanged = (newValue: string) => {
    setEmail(newValue);
    setEmailVaild(validator.isEmail(newValue));
  }

  const phoneChanged = (newValue: string) => {
    setPhone(newValue);
    setPhoneValid(validator.isMobilePhone(newValue));
  }

  const lastNameChanged = (newValue: string) => {
    setLastname(newValue);
  }

  const apply = (values: any) => {
    console.log(values)
  }

  const cancel = () => {
    back();
  }

  const initialValues = {}

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

      <div
        style={{
          marginTop: '30px',
          marginBottom: '10px'
        }}
      >

        <BCBackButtonNoLink
          func={cancel}
        />
      </div>

      <div className={classes.pageMainContainer}>
        <div className={classes.pageContainer}>
          <div className={classes.pageContent}>




            <BCAdminProfile
              avatar={{
                isEmpty: 'NO',
                url: !image.data ? '' : image.data.imageUrl,
              }}
              apply={(values: any) => apply(values)}
              cancel={cancel}
              initialValues={initialValues}
              inputError={{}}
              fields={[
                {
                  left: {
                    id: 'firstName',
                    label: 'First Name:',
                    placehold: 'John',
                    value: firstName,
                  },
                  right: {
                    id: 'lastName',
                    label: 'Last name:',
                    placehold: 'Doe',
                    value: lastName,
                  }
                },
                {
                  left: {
                    id: 'email',
                    label: 'Email:',
                    placehold: 'john.doe@gmail.com',
                    value: email,
                  },
                  right: {
                    id: 'phone',
                    label: 'Phone:',
                    placehold: '1234567890',
                    value: phone,
                  }
                }
              ]} />
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
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(EmployeeProfile);

