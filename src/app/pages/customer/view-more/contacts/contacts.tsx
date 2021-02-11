import React, { useState, useEffect } from 'react';
import styles from './contacts.style';
import { Fab, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import { modalTypes } from '../../../../../constants';
import { getContacts, addContact, updateContact, removeContact } from 'api/contacts.api';
import { useLocation, useHistory } from 'react-router-dom';

function CustomerContactsPage({ classes, id, type, customerId }: any) {
  const dispatch = useDispatch();
  const { isLoading, refresh, contacts } = useSelector((state: any) => state.contacts);

  const location = useLocation<any>();
  const history = useHistory();


  const locationState = location.state;

  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;

  const [currentPage, setCurrentPage] = useState({
    page: 0,
    pageSize: 10,
    sortBy: [],
  });




  const initialValues = {
    name: "",
    email: "",
    phone: "",
    type,
    referenceNumber: id,
  }

  const columns: any = [

    {
      'Header': 'Contact Name',
      'accessor': 'name',
      'className': 'font-bold',
      'sortable': true,
      'width': 200
    },
    {
      'Header': 'Email',
      'accessor': 'email',
      'className': 'font-bold',
      'sortable': true,
      'width': 200
    },
    {
      'Header': 'Phone',
      'accessor': 'phone',
      'className': 'font-bold',
      'sortable': true,
      'width': 200
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
            onClick={() => openEditContactModal(row)}
            variant={'extended'}>
            {'Edit'}
          </Fab>
          <Fab
            aria-label={'edit-contact'}
            classes={{
              'root': classes.fabRoot
            }}
            style={{ marginLeft: 15 }}
            color={'secondary'}
            onClick={() => openDeleteContactModal(row)}
            variant={'extended'}>
            {'Delete'}
          </Fab>
        </div>
      },
      'Header': 'Actions',
      'id': 'action-edit-contact',
      'sortable': false,
      'width': 40
    },
  ]

  const handleAddContact = async (values: any) => {
    try {
      const response = await dispatch(addContact(values));
      return response;
    } catch (err) {
      throw new Error(err);
    }

  }

  const handleUpdateContact = async (values: any) => {

    try {
      const response = await dispatch(updateContact(values));
      return response;
    } catch (err) {
      throw new Error(err);
    }

  }

  const handleDeleteContact = async (values: any) => {

    try {
      const response = await dispatch(removeContact(values));
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }


  const openAddContactModal = () => {

    dispatch(setModalDataAction({
      'data': {
        'data': {
          initialValues,
          apply: (values: any) => handleAddContact(values),
          newContact: true,
          contacts,
          customerId,
        },
        'modalTitle': `${type === 'Customer' ? "Add Customer Contact" : "Add Job Location Contact"}`,
        'removeFooter': false
      },
      'type': modalTypes.ADD_CONTACT_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const openEditContactModal = (row: any) => {
    let origRow = row['original'];


    dispatch(setModalDataAction({
      'data': {
        'data': {
          initialValues: {
            name: origRow['name'],
            email: origRow['email'],
            phone: origRow['phone'],
            _id: origRow['_id'],
          },
          onEdit: true,
          apply: (values: any) => handleUpdateContact(values)
        },
        'modalTitle': 'Edit Contact',
        'removeFooter': false
      },
      'type': modalTypes.ADD_CONTACT_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };


  const openDeleteContactModal = (row: any) => {
    let origRow = row['original'];


    history.replace({
      ...history.location,
      state: {
        ...locationState,
        onUpdatePage: currentPage
      }
    })

    dispatch(setModalDataAction({
      'data': {
        'data': {
          contact: {
            name: origRow['name'],
            email: origRow['email'],
            phone: origRow['phone'],
            _id: origRow['_id'],
            type,
            referenceNumber: id,
          },
          apply: (values: any) => handleDeleteContact(values)
        },
        'modalTitle': 'Delete Contact',
        'removeFooter': false
      },
      'type': modalTypes.DELETE_CONTACT_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };



  useEffect(() => {
    let data: any = {
      type,
      referenceNumber: id
    }

    dispatch(getContacts(data));
  }, [refresh])


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
        currentPage={currentPage}
        setPage={setCurrentPage}
        columns={columns}
        isLoading={isLoading}
        search
        searchPlaceholder={"Search contacts"}
        tableData={contacts.sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))}
        initialMsg="There are no contacts"
      />
    </>
  )
}


export default withStyles(
  styles,
  { 'withTheme': true }
)(CustomerContactsPage);