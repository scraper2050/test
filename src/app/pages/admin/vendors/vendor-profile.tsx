import React, { useState } from 'react';
import BCAdminProfile from '../../../components/bc-admin-profile/bc-admin-profile_copy';
import styled from 'styled-components';
import { uploadImage } from 'actions/image/image.action';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  profile: {
    companyName?: string;
  }
  back: () => void;
}

function VendorProfile({ profile, back }: Props) {
  const image = useSelector((state: any) => state.image);

  console.log(profile);

  const cancel = () => {
    back();
  };

  const apply = () => {
    back();
  }

  const imageSelected = (f: File) => {
    console.log('selected')
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
            apply={apply}
            avatar={{
              'isEmpty': 'YES',
              'url': '',
              'onChange': () => { }
            }}
            cancel={cancel}
            noEdit={true}
            inputError={{}}
            fields={[
              {
                'left': {
                  'id': 'companyName',
                  'label': 'Company Name:',
                  'placehold': 'John',
                  'value': profile.companyName,
                }
              }
            ]}
          />
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


export default VendorProfile;
