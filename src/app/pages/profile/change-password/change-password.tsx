import * as yup from 'yup';
import BCUncontrolledPasswordInput from 'app/components/bc-password-input/bc-uncontrolled-password-input';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import { changePasswordAction } from 'actions/auth/auth.action';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { Fab, Paper } from '@material-ui/core';
import { PRIMARY_GREEN, PRIMARY_RED } from '../../../../constants';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChangePasswordValidation = yup.object().shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), ''], 'Passwords must match')
    .required('Confirm password is required'),
  currentPassword: yup.string().required('Current Password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be equal or more than 8 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gu,
      'New password must contain at least one upper case letter, one number, and one special character'
    )
    .required('New Password is required'),
});

function ChangePasswordPage() {
  const {
    changePasswordApi: { hasErrored, isLoading, msg },
  } = useSelector(({ auth }: any) => auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      confirmPassword: '',
      currentPassword: '',
      newPassword: '',
    },
    onSubmit: (values) => {
      dispatch(changePasswordAction.fetch(values));
    },
    validateOnBlur: false,
    validateOnChange: true,
    validationSchema: ChangePasswordValidation,
  });

  useEffect(() => {
    if (msg === 'Password changed successfully.') {
      formik.resetForm();
    }
  }, [msg]);

  useEffect(() => {
    return () => {
      dispatch(changePasswordAction.cancelled());
    };
  }, []);
  return (
    <MainContainer>
      <PageContainer>
        <Grid container>
          <Grid xs={7}>
            <ChangePasswordContainer>
              <Typography align={'left'} color={'primary'} variant={'h4'}>
                <strong>{'Change Password'}</strong>
              </Typography>
              <p className={'subtitle'}>
                {
                  'New password must be more than 8 characters, contain at least one upper case letter, one number, and one special character'
                }
              </p>

              <div className={'form-container'}>
                <form onSubmit={formik.handleSubmit}>
                  <BCUncontrolledPasswordInput
                    error={
                      formik.touched.currentPassword &&
                      Boolean(formik.errors.currentPassword)
                    }
                    helperText={
                      formik.touched.currentPassword &&
                      formik.errors.currentPassword
                    }
                    id={'currentPassword'}
                    label={'Current Password'}
                    name={'currentPassword'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder={'Current Password'}
                    value={formik.values.currentPassword}
                  />
                  <BCUncontrolledPasswordInput
                    error={
                      Boolean(formik.touched.newPassword) &&
                      Boolean(formik.errors.newPassword)
                    }
                    helperText={
                      formik.touched.newPassword && formik.errors.newPassword
                    }
                    id={'newPassword'}
                    label={'New Password'}
                    name={'newPassword'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder={'Current Password'}
                    value={formik.values.newPassword}
                  />
                  <BCUncontrolledPasswordInput
                    error={
                      Boolean(formik.touched.confirmPassword) &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    id={'confirmPassword'}
                    label={'Confirm Password'}
                    name={'confirmPassword'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder={'Current Password'}
                    value={formik.values.confirmPassword}
                  />
                  <div className={'actions-container'}>
                    <Fab color={'primary'} disabled={isLoading} type={'submit'}>
                      {'Change Password'}
                    </Fab>
                  </div>
                </form>
              </div>
              {msg && (
                <div className={hasErrored ? 'error' : 'success'}>{msg}</div>
              )}
            </ChangePasswordContainer>
          </Grid>
        </Grid>
      </PageContainer>
    </MainContainer>
  );
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

const ChangePasswordContainer = styled(Paper)`
  background: white;
  padding: 30px;
  width: 100%;
  border-radius: 4px;
  .success {
    color: ${PRIMARY_GREEN};
  }
  .error {
    color: ${PRIMARY_RED};
  }
  h4 {
    margin-bottom: 0;
  }
  p.subtitle {
    margin-bottom: 30px;
  }
  label {
    margin-bottom: 8px;
  }

  .actions-container {
    display: flex;
    justify-content: flex-end;
    margin: 30px 0 0;
  }
  .MuiTextField-root {
    margin-bottom: 20px;
  }
  .MuiFab-primary {
    width: 210px;
    color: #fff;
    border-radius: 30px;
    height: auto;
    padding: 10px;
  }
`;

export default ChangePasswordPage;
