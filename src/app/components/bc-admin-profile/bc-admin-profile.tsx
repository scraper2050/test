import React from 'react';
import styles from './bc-admin-profile.style';
import { Grid, withStyles } from '@material-ui/core';
import NoLogoImage from 'assets/img/avatars/NoImageFound.png';
import NoCompanyLogo from 'assets/img/avatars/NoCompanyLogo.png';

interface Props {
  avatar: Avatar;
  noEdit?: boolean;
  inputError?: { [k: string]: boolean };
  cancel?: () => void;
  apply: any;
  fields: object[];
  classes: any;
  children?: React.ReactNode;
  initialValues?: any;
  schema?: any;
  userProfile?: boolean;
  openAddContactModal?: (passedProps:any) => void;
}

interface Avatar {
  isEmpty?: string;
  url?: string;
  onChange?: (f: File) => void
  noUpdate?: boolean
  imageUrl?: any;
}

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

function BCAdminProfile(props: Props) {
  const {
    avatar,
    fields,
    classes,
    userProfile = true,
    openAddContactModal,
  } = props;

  return (
    <div className={classes.profilePane}>
      <div className={classes.infoPane}>
        {
          !avatar.noUpdate &&
          <div
            className={`edit_button ${classes.editButton}`}
            onClick={() => typeof openAddContactModal === 'function' && openAddContactModal(props)}>
            <button className={'MuiFab-primary'}>
              <i className={'material-icons'}>
                {'edit'}
              </i>
            </button>
          </div>
        }

        {
          avatar.isEmpty === 'NO' &&
          <div className={avatar.noUpdate ? classes.noUpdateAvatarArea : classes.avatarArea}>
            {userProfile ?
              <div
                className={classes.imgArea}
                style={{
                  'backgroundImage': `url(${avatar.url === '' ? NoLogoImage : avatar.url})`
                }}
              /> :
              <img src={avatar.url === '' ? NoCompanyLogo : avatar.url}/>
            }
          </div>
        }

        <div className={avatar.isEmpty === 'YES' ? classes.infoArea : classes.infoAreaFullwidth}>
          <Grid
            container
            spacing={3}>

            {
              fields &&
              fields.map((element: RowField, index: number) => {
                return (
                  <Grid
                    item
                    key={index}
                    xs={12}>
                    <Grid container>
                      <Grid
                        item
                        xs={6}
                        sm={6}>
                        <Grid
                          container
                          direction={'column'}>

                          {
                            element.left &&
                            <div className={classes.label}>
                              <strong>
                                {element.left.label}
                              </strong>
                            </div>
                          }
                          {
                            element.left &&
                            <div className={classes.label}>
                              {element.left.value}
                            </div>
                          }
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}>
                        <Grid
                          container
                          direction={'column'}>
                          {
                            element.right &&
                            <div className={classes.label}>
                              <strong>
                                {element.right.label}
                              </strong>
                            </div>
                          }
                          {
                            element.right &&
                            <div className={classes.label}>
                              {element.right.value}
                            </div>
                          }
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })
            }
          </Grid>
        </div>
      </div>
    </div >
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCAdminProfile);
