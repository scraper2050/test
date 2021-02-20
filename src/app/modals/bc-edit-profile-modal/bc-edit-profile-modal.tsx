import * as CONSTANTS from "../../../constants";
import BCTextField from "../../components/bc-text-field/bc-text-field";
import styles from './bc-edit-profile-modal.styles';
import {
  DialogActions,
  Fab,
  Grid,
  InputLabel,
  withStyles,
  FormGroup,
} from '@material-ui/core';
import { Form, Formik } from "formik";
import React, { useState } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import { getBrands, loadingBrands } from 'actions/brands/brands.action';
import styled from "styled-components";
import UploadImageIcon from 'assets/img/icons/UploadImage';
import { upload } from 'api/image.api';
import { Image } from '../../../actions/image/image.types';


interface ColumnField {
  label: string;
  id: string;
  placehold: string;
  text: string;
  value: any;
  disabled?: boolean;
  onChange: (newValue: any) => void
}

interface RowField {
  left?: ColumnField;
  right?: ColumnField;
}


function BCEditProfileModal({
  classes,
  props
}: any): JSX.Element {
  const dispatch = useDispatch();

  const {
    avatar,
    apply,
    fields,
    initialValues,
    schema,
    userProfile
  } = props

  const [image, setImage] = useState<any>("")
  const [thumb, setThumb] = useState<any>("")


  const openFileDialog = () => {
    const input = document.getElementById('file-input');

    if (input) {
      input.click();
    }
  }


  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const onSuccess = () => {
    dispatch(closeModalAction());
    dispatch(getBrands());
    dispatch(loadingBrands());
  }



  const imageSelected = async (f: File) => {

    if (userProfile === undefined) {

      if (!f) return;
      const formData = new FormData();
      formData.append('image', f);
      const imageResponse: Image = await upload(formData);


      if (imageResponse.hasOwnProperty('message')) {
        return;
      } else {
        setImage(imageResponse.imageUrl ? imageResponse.imageUrl : "");
      }
    } else {
      let reader = new FileReader();

      await setImage(f)
      reader.onloadend = () => {
        setThumb(reader.result)
      }

      reader.readAsDataURL(f);
    }
  }


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        let oldValues = values;
        setSubmitting(true)
        if (image !== "") {
          oldValues = {
            ...values,
            logoUrl: image
          }
        }
        await apply(oldValues);

        setSubmitting(false)
        closeModal();
      }
      }
      validationSchema={schema}
      validateOnChange
    >
      {
        ({
          handleChange,
          values,
          errors,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form>

            <DataContainer >
              <Grid container>

                <Grid item xs={12} md={4} >
                  <Grid
                    container
                    direction="column"
                    spacing={3}
                    alignItems="center"
                    justify="center"
                    className={classes.uploadImageNoData}
                    style={{
                      'backgroundImage': `url(${thumb !== "" ? thumb : image !== "" ? image : avatar.url === '' ? '' : avatar.url})`,
                      'border': `${avatar.url !== '' || image !== "" ? '5px solid #00aaff' : '1px dashed #000000'}`,
                      'backgroundSize': 'cover',
                      'backgroundPosition': 'center',
                      'backgroundRepeat': 'no-repeat',
                    }}
                  >
                    <>
                      <Grid item>
                        {
                          avatar.url === "" && image === "" &&
                          <UploadImageIcon />
                        }
                      </Grid>
                      <Grid
                        className={avatar.url === '' && image === "" ? "" : classes.hadImageUrl}
                        item>
                        <Fab
                          size='large'
                          aria-label={'new-ticket'}
                          classes={{
                            'root': classes.fabRoot,
                          }}

                          onClick={() => openFileDialog()}
                          color={'primary'}
                          variant={'extended'}>
                          {'Upload Image'}
                        </Fab>
                      </Grid>
                      <div>
                        <input id='file-input' type="file"
                          onChange={(e: any) => { imageSelected(e.target.files[0]) }}
                          style={{ display: 'none' }} />
                      </div>
                    </>

                  </Grid>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={2}>
                    <Grid
                      style={{
                        width: '100%'
                      }}
                      item
                      className={classes.paper}
                      sm={12}>

                      {
                        fields &&
                        fields.map((element: RowField, index: number) => {
                          return (
                            <Grid key={index} container spacing={5}>

                              <Grid item xs={12} md={6}>
                                {
                                  element.left ?
                                    <FormGroup>
                                      <InputLabel className={classes.label}>
                                        <strong>{element.left.label}</strong>
                                      </InputLabel>
                                      <BCTextField
                                        name={element.left.id}
                                        placeholder={element.left.placehold}
                                        onChange={handleChange}
                                        disabled={element.left.disabled ? element.left.disabled : false}
                                      />
                                    </FormGroup>
                                    : <div />
                                }
                              </Grid>

                              <Grid item xs={12} md={6}>
                                {
                                  element.right ?
                                    <FormGroup>
                                      <InputLabel className={classes.label}>
                                        <strong>{element.right.label}</strong>
                                      </InputLabel>
                                      <BCTextField
                                        name={element.right.id}
                                        placeholder={element.right.placehold}
                                        onChange={handleChange}
                                        disabled={element.right.disabled ? element.right.disabled : false}
                                      />
                                    </FormGroup>
                                    : <div />
                                }
                              </Grid>

                            </Grid>
                          )
                        })
                      }
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </DataContainer>
            <DialogActions classes={{
              'root': classes.dialogActions
            }}>
              <Fab
                aria-label={'create-job'}
                classes={{
                  'root': classes.fabRoot
                }}
                style={{
                  marginRight: 40
                }}
                color={'secondary'}
                disabled={isSubmitting}
                onClick={() => closeModal()}
                variant={'extended'}>
                {'Cancel'}
              </Fab>
              <Fab
                aria-label={'create-job'}
                classes={{
                  'root': classes.fabRoot
                }}
                color={'primary'}
                disabled={isSubmitting}
                type={'submit'}
                variant={'extended'}>
                {'Submit'}
              </Fab>
            </DialogActions>
          </Form>
        )
      }
    </Formik>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 50px;
  margin-top: 12px;
  border-radius: 10px;
  background-color: ${CONSTANTS.PRIMARY_WHITE};

  .MuiFormLabel-root {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 30px;
    color: ${CONSTANTS.PRIMARY_DARK};
    margin-bottom: 6px;
  }
  .MuiInputBase-input {
    color: #383838;
    font-size: 16px;
    padding: 12px 14px;
  }
  .required > label:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
  .save-customer-button {
    margin-right: 16px;
    color: ${CONSTANTS.PRIMARY_WHITE};
  }
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCEditProfileModal);
