import { ArrowDropDown } from '@material-ui/icons';
import styles from './bc-roles-permissions.style';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import initialRolesAndPermissions, { Permission, permissionDescriptions } from './rolesAndPermissions';
import { CSButton } from 'helpers/custom';

interface BcRolesPermissionsProps extends WithStyles<typeof styles> {}

const BcRolesPermissions: FC<BcRolesPermissionsProps> = ({ classes }) => {
  const { employeeDetails } = useSelector((state: any) => state.employees);
  let { rolesAndpermissions } : { rolesAndpermissions: Permission } = employeeDetails;

  if (!rolesAndpermissions) {
    rolesAndpermissions = initialRolesAndPermissions;
  }

  const [roles, setRoles] = useState(rolesAndpermissions);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({ });
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateRoles = (key: string) => {
    const permissions = roles[key];
    Object.keys(permissions).forEach(p => {
      permissions[p] = !permissions[p];
    });

    setRoles(state => ({ ...state,
      [key]: permissions }));
  };

  const handleUpdatePermissions = (roleKey: string, permissionKey: string) => {
    const permissions = roles[roleKey];
    permissions[permissionKey] = !permissions[permissionKey];

    setRoles(state => ({ ...state,
      [roleKey]: permissions }));
  };

  const getIsRoleActive = (key: string) => {
    const permissions = roles[key];
    // If one of the permissions is active, role is active
    return Object.values(permissions).some(a => a);
  };

  const handleExpand = (key: string) => {
    setExpanded(state => {
      return { ...state,
        [key]: !state[key] };
    });
  };

  return (
    <Grid container direction={'column'} className={classes.container}>
      <div className={classes.headerContainer}>
        <Typography align={'left'} variant={'h4'} color={'primary'}>
          <strong>{'Roles / Permissions'}</strong>
        </Typography>
        {!isEditing &&
          <CSButton
            aria-label={'new-ticket'}
            color={'primary'}
            onClick={() => {
              setIsEditing(true);
            }}
            variant={'contained'}>
            {'Edit Role/Permissions\r'}
          </CSButton>
        }
      </div>
      <div className={classes.contentContainer}>
        {Object.keys(rolesAndpermissions).map(roleKey => {
          const permissions = rolesAndpermissions[roleKey];
          const roleText = permissionDescriptions[roleKey];
          let permissionKeys: string[] = [];

          if (permissions) {
            permissionKeys = Object.keys(permissions);
          }
          if (isEditing) {
            return (
              <Accordion expanded={Boolean(expanded[roleKey])} className={classes.card} style={{ 'borderTopLeftRadius': '10px',
                'borderTopRightRadius': '10px' }}>
                <AccordionSummary
                  expandIcon={
                    <ArrowDropDown
                      style={{ 'cursor': 'pointer' }}
                      onClick={() => {
                        handleExpand(roleKey);
                      }}
                    />
                  }>
                  <FormControlLabel
                    classes={{ 'label': classes.checkboxLabel }}
                    control={
                      <Checkbox
                        color={'primary'}
                        checked={getIsRoleActive(roleKey)}
                        onChange={() => {
                          handleUpdateRoles(roleKey);
                        }}
                        name={roleKey}
                      />
                    }
                    label={roleText}
                  />
                </AccordionSummary>
                <AccordionDetails className={classes.permissions}>
                  {permissionKeys.map(key => {
                    const permissionValue = permissions[key];
                    const permissionText = permissionDescriptions[key];
                    return (
                      <FormControlLabel
                        classes={{ 'label': classes.checkboxLabel }}
                        control={
                          <Checkbox
                            color={'primary'}
                            checked={permissionValue}
                            onChange={() => handleUpdatePermissions(roleKey, key)}
                            name={permissionText}
                          />
                        }
                        label={permissionText}
                      />
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          }
          return (
            <div className={classes.card} style={{ 'borderTopLeftRadius': '10px',
              'borderTopRightRadius': '10px',
              'padding': '1rem' }}>
              <Typography>{roleText}</Typography>
            </div>
          );
        })}
        {isEditing &&
          <div className={classes.actionsContainer}>
            <Button onClick={() => setIsEditing(false)} variant={'outlined'} className={classes.cancelBtn}>{'Cancel'}</Button>
            <CSButton>{'Save Changes'}</CSButton>
          </div>
        }
      </div>
    </Grid>
  );
};

export default withStyles(
  styles,
  { 'withTheme': true }
)(BcRolesPermissions);

