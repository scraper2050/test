import React, { useState } from 'react';
import styled from 'styled-components';
import BCAdminProfile from '../../../components/bc-admin-profile/bc-admin-profile'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from 'actions/image/image.action';

interface Props {
  profile: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }
  back: () => void;
}

function EmployeeProfile({profile, back} : Props) {
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

  console.log(profile);
  
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

  const apply = () => {
    if (firstNameValid === false
      || lastNameValid === false
      || emailValid === false
      || phoneValid === false) {
      return;
    }
  }

  const cancel = () => {
    back();
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
                  id: 'firstName',
                  label: 'First Name:',
                  placehold: 'John',
                  value: firstName,
                  valid: firstNameValid,
                  onChange: firstNameChanged
                },
                right: {
                  id: 'lastName',
                  label: 'Last name:',
                  placehold: 'Doe',
                  value: lastName,
                  valid: lastNameValid,
                  onChange: lastNameChanged
                }
              },
              {
                left: {
                  id: 'email',
                  label: 'Email:',
                  placehold: 'john.doe@gmail.com',
                  value: email,
                  valid: emailValid,
                  onChange: emailChanged
                },
                right: {
                  id: 'phone',
                  label: 'Phone:',
                  placehold: '1234567890',
                  value: phone,
                  valid: phoneValid,
                  onChange: phoneChanged
                }
              }
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


export default EmployeeProfile;
