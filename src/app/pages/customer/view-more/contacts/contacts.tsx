import React, { useState } from 'react';
import styles from './contacts.style';
import { Fab, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { DUMMY_DATA, DUMMY_COLUMN } from '../job-equipment-info/dummy-data';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import { modalTypes } from '../../../../../constants';

function CustomerContactsPage({ classes, data }: any) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const columns: any = [

    {
      'Header': 'Contact Name',
      'accessor': 'title',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Email',
      'accessor': 'edited',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Phone',
      'accessor': 'count',
      'className': 'font-bold',
      'sortable': true,
      'width': 100
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <Fab
            aria-label={'edit-contact'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            onClick={() => openEditContactModal()}
            variant={'extended'}>
            {'Edit Contact'}
          </Fab>
        </div>
      },
      'Header': 'Action',
      'id': 'action-edit-contact',
      'sortable': false,
      'width': 60
    },
  ]

  const openAddContactModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Add New Contact',
        'removeFooter': false
      },
      'type': modalTypes.ADD_CONTACT_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };


  const openEditContactModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Edit New Contact',
        'removeFooter': false
      },
      'type': modalTypes.ADD_CONTACT_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };


  return (
    <>
      <div className={classes.addButtonArea}>
        <Fab
          aria-label={'add-new-contact'}
          classes={{
            'root': classes.fabRoot
          }}
          color={'primary'}
          onClick={() => openAddContactModal()}
          variant={'extended'}>
          {'Add New Contact'}
        </Fab>
      </div>

      <BCTableContainer
        columns={columns}
        isLoading={isLoading}
        search
        searchPlaceholder={"Search contacts"}
        tableData={DUMMY_DATA}
        initialMsg="There are no contacts"
      />
    </>
  )
}


export default withStyles(
  styles,
  { 'withTheme': true }
)(CustomerContactsPage);