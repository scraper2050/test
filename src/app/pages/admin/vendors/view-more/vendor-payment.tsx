import React, {useEffect, useState} from 'react';
import BCAdminProfile from '../../../../components/bc-admin-profile/bc-admin-profile_copy';
import styled from 'styled-components';
import { uploadImage } from 'actions/image/image.action';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import {Vibration} from "@material-ui/icons";
import {Icon, IconButton, withStyles} from "@material-ui/core";
import styles from './view-more.styles';
import {useLocation} from "react-router-dom";
import BCTableContainer
  from "../../../../components/bc-table-container/bc-table-container";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BCMenuButton from "../../../../components/bc-menu-more";

import {info} from "../../../../../actions/snackbar/snackbar.action";

interface Props {
  classes: any;
  /*profile: {
    companyName?: string;
  }
  back: () => void;*/
}

const ITEMS = [
  {id: 0, title:'Edit'},
  {id: 1, title:'Delete'},
]

function VendorPayment({classes}: Props) {
  const image = useSelector((state: any) => state.image);
  const [tableData, setTableData] = useState<any[]>([]);
  const [showMenu, toggleMenu] = useState(-1);
  const location = useLocation<any>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const locationState = location.state;
  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;

  const [currentPage, setCurrentPage] = useState({
    'page': prevPage ? prevPage.page : 0,
    'pageSize': prevPage ? prevPage.pageSize : 10,
    'sortBy': prevPage ? prevPage.sortBy : []
  });
  useEffect(() => {
    getData();
  }, []);


  const getData = () => {
    const tempData = [{
      vendorName: 'Test Vendor',
      paymentDate: '2022-02-17',
      amount: 130,
      method: 'ACH',
      reference: '44444444444444',
      notes: 'Yes no, yes no, yes no'
    },{
      vendorName: 'Test Vendor',
      paymentDate: '2022-02-17',
      amount: 130,
      method: 'ACH',
      reference: '44444444444444',
      notes: 'Yes no, yes no, yes no'
    },{
      vendorName: 'Test Vendor',
      paymentDate: '2022-02-17',
      amount: 130,
      method: 'ACH',
      reference: '44444444444444',
      notes: 'Yes no, yes no, yes no'
    },{
      vendorName: 'Test Vendor',
      paymentDate: '2022-02-17',
      amount: 130,
      method: 'ACH',
      reference: '44444444444444',
      notes: 'Yes no, yes no, yes no'
    },
    ];
    setTableData(tempData);

  }

  const handleMenuButtonClick = (event: any, id: number, row:any) => {
    event.stopPropagation();

  }

  const columns: any = [
    {
      'Header': 'Vendor Name',
      'accessor': 'vendorName',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Payment Date',
      'accessor': 'paymentDate',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Amount',
      'accessor': 'amount',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Method',
      'accessor': 'method',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Reference No.',
      'accessor': 'reference',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Notes',
      'accessor': 'notes',
      'className': 'font-bold',
      'sortable': true,
    },
    { Cell({ row }: any) {
        return (
          <BCMenuButton
            icon={MoreHorizIcon}
            items={ITEMS}
            handleClick={(e, id) => handleMenuButtonClick(e, id, row.original)}/>
        )
      },
      'Header': 'Actions',
      'className': 'font-bold',
      'sortable': false,
      'width': 100
    },
  ];
  return (
    <BCTableContainer
      columns={columns}
      currentPage={currentPage}
      //isLoading={vendors.loading}
      //onRowClick={handleRowClick}
      search
      searchPlaceholder = 'Search Payments...'
      setPage={setCurrentPage}
      tableData={tableData}
    />
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(VendorPayment);
