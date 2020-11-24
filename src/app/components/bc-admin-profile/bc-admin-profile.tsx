import React from 'react';
import styles from './bc-admin-profile.style';
import { Fab, TextField, withStyles } from "@material-ui/core";

interface Props {
  avatar: Avatar;
  cancel: () => void;
  apply: () => void;
  fields: Array<object>;
  classes: any;
  children?: React.ReactNode;
}

interface Avatar {
  isEmpty: string;
  url?: string;
  onChange: (f: any) => void
}

interface columnField {
  label: string;
  id: string;
  placehold: string;
  valid: boolean;
  value: any;
  onChange: (newValue: any) => void
}

interface RowField {
  left?: columnField;
  right?: columnField;
}

function BCAdminProfile({ avatar, cancel, apply, fields, classes, children }: Props) {
  let openFileDialog = () => {
    const input = document.getElementById('file-input');

    if (input) {
      input.click();
    }
  }

  return (
    <div className={classes.profilePane}>
      <div className={classes.infoPane}>
        {
          avatar.isEmpty === 'NO' &&
          <div className={classes.avatarArea}>
            <div onClick={() => openFileDialog()} className={classes.imgArea} style={{ 'backgroundImage': `url(${avatar.url})` }}>
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
              return <div key={index} className={classes.field}>
                <div className={classes.leftField}>
                  {
                    element.left &&
                    <div className={classes.label}>{element.left.label}</div>
                  }
                  {
                    element.left &&
                    <TextField
                      id={element.left.id}
                      placeholder={element.left.placehold}
                      variant={'outlined'}
                      error={!element.left.valid}
                      value={element.left.value}
                      onChange={(e) => { element.left && element.left.onChange(e.target.value) }}
                      autoComplete='off'
                      style={{
                        width: '80%'
                      }}
                    />
                  }
                </div>
                <div className={classes.rightField}>
                  {
                    element.right &&
                    <div className={classes.label}>{element.right.label}</div>
                  }
                  {
                    element.right &&
                    <TextField
                      id={element.right.id}
                      placeholder={element.right.placehold}
                      variant={'outlined'}
                      error={!element.right.valid}
                      value={element.right.value}
                      onChange={(e) => { element.right && element.right.onChange(e.target.value) }}
                      autoComplete='off'
                      style={{
                        width: '80%'
                      }}
                    />
                  }
                </div>
              </div>
            })
          }
        </div>
      </div>
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
          onClick={apply}
          variant={'extended'}>
          {'Apply'}
        </Fab>
      </div>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCAdminProfile);
