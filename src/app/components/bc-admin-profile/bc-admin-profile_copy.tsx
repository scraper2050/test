import React, { useState } from 'react';
import styles from './bc-admin-profile.style';
import { Fab, TextField, withStyles, Typography } from "@material-ui/core";
import NoLogoImage from 'assets/img/avatars/NoImageFound.png'

interface Props {
  avatar: Avatar;
  noEdit?: any;
  inputError: { [k: string]: boolean };
  cancel: () => void;
  apply: () => void;
  fields: object[];
  classes: any;
  children?: React.ReactNode;
}

interface Avatar {
  isEmpty: string;
  url?: string;
  onChange: (f: File) => void
  noUpdate?: boolean
}

interface ColumnField {
  label: string;
  id: string;
  placehold: string;
  text: string;
  value: any;
  onChange: (newValue: any) => void
}

interface RowField {
  left?: ColumnField;
  right?: ColumnField;
}

function BCAdminProfile({ avatar, noEdit, inputError, cancel, apply, fields, classes, children }: Props) {
  const [editable, setEditable] = useState(false);
  const openFileDialog = () => {
    const input = document.getElementById('file-input');

    if (input) {
      input.click();
      setEditable(true);
    }
  }

  const apply_edit = () => {
    if (!editable) {
      setEditable(true);
    }
    else {
      if (typeof inputError['phone'] !== 'undefined' && !inputError['phone']) {
        return
      }
      if (typeof inputError['companyEmail'] !== 'undefined' && !inputError['companyEmail']) {
        return
      }
      if (typeof inputError['zipCode'] !== 'undefined' && !inputError['zipCode']) {
        return
      }

      setEditable(false);
      apply();
    }
  }

  const avatarUrl = `url(${avatar.url})`

  return (
    <div className={classes.profilePane}>
      <div className={classes.infoPane}>
        {
          avatar.isEmpty === 'NO' &&
          <div className={avatar.noUpdate ? classes.noUpdateAvatarArea : classes.avatarArea}>
            <div
              onClick={avatar.noUpdate ? () => { } : () => openFileDialog()} className={classes.imgArea}
              style={{
                'backgroundImage': `url(${avatar.url === '' && avatar.noUpdate ? NoLogoImage : avatar.url})`,
              }}>
              {
                avatar.url === '' &&
                <Fab
                  aria-label={'new-ticket'}
                  classes={{
                    'root': classes.fabRoot
                  }}
                  color={'primary'}
                  variant={'extended'}>
                  {'Select File'}
                </Fab>
              }
            </div>
            <div>
              <input id='file-input' type="file" onChange={(e: any) => { avatar.onChange(e.target.files[0]) }} style={{ display: 'none' }} />
            </div>
          </div>
        }
        <div className={avatar.isEmpty === 'YES' ? classes.infoArea : classes.infoAreaFullwidth}>
          {
            fields &&
            fields.map((element: RowField, index: number) => {
              return (

                < div key={index} className={classes.field} >
                  <div className={classes.leftField}>
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

                      <TextField
                        className={classes.root}
                        disabled={!editable}
                        id={element.left.id}
                        placeholder={element.left.placehold}
                        variant={'outlined'}
                        error={typeof inputError[element?.left.id] !== 'undefined' && !inputError[element?.left.id]}
                        value={element.left.value}
                        onChange={(e) => { element.left && element.left.onChange(e) }}
                        autoComplete='off'
                        helperText={
                          typeof inputError[element?.left.id] !== 'undefined' && !inputError[element?.left.id]
                          && (
                            <ErrorText text={element?.left.text} />
                          )
                        }
                      />
                    }
                  </div>
                  <div className={classes.rightField}>
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
                      <TextField
                        className={classes.root}
                        disabled={!editable}
                        id={element.right.id}
                        placeholder={element.right.placehold}
                        variant={'outlined'}
                        error={typeof inputError[element?.right.id] !== 'undefined' && !inputError[element?.right.id]}
                        value={element.right.value}
                        onChange={(e) => { element?.right && element.right.onChange(e) }}
                        autoComplete='off'
                        style={{
                          width: '80%'
                        }}
                        helperText={
                          typeof inputError[element?.right.id] !== 'undefined' && !inputError[element?.right.id]
                          && (
                            <ErrorText text={element.right.text} />
                          )
                        }
                      />
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      {
        !avatar.noUpdate &&
        <div className={classes.buttonPane}>
          <Fab
            aria-label={'new-ticket'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            style={{
              width: '100px',
              background: '#c00707',
              marginRight: '30px'
            }}
            onClick={cancel}
            variant={'extended'}>
            {'Cancel'}
          </Fab>
          {!noEdit &&
            <Fab
              aria-label={'new-ticket'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'secondary'}
              style={{
                width: '100px',
                background: '#219653',
              }}
              onClick={apply_edit}
              variant={'extended'}>
              {editable ? 'Apply' : 'Edit'}
            </Fab>
          }
        </div>
      }
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCAdminProfile);

function ErrorText({ text }: { text: string }) {
  return (
    <Typography align="left" variant="caption" color="error">
      {text}
    </Typography>
  );
}
