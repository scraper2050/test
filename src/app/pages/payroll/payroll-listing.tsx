import React, {useEffect, useState, useRef} from 'react';
import {Button, withStyles} from "@material-ui/core";
import styles from './payroll.styles';
import {useLocation} from "react-router-dom";
import BCTableContainer  from "../../components/bc-table-container/bc-table-container";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BCMenuButton from "../../components/bc-menu-more";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {ReactComponent as IconEdit} from "../../../assets/img/icons/sidebar/admin/commision_edit.svg";
import {
  openModalAction,
  setModalDataAction
} from "../../../actions/bc-modal/bc-modal.action";
import {modalTypes} from "../../../constants";
import {useDispatch} from "react-redux";

interface Props {
  classes: any;
}

const ITEMS = [
  {id: 0, title:'Edit Commisssion'},
  {id: 1, title:'Payment History'},
]

function Payroll({classes}: Props) {
  const dispatch = useDispatch();
  const location = useLocation<any>();
  const locationState = location.state;
  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;

  const [tableData, setTableData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState({
    'page': prevPage ? prevPage.page : 0,
    'pageSize': prevPage ? prevPage.pageSize : 10,
    'sortBy': prevPage ? prevPage.sortBy : []
  });

  useEffect(() => {
    getData();
  }, []);

  const renderCommission = (vendor: any) => {
    if (vendor.commission) {
      return (<span>{`${vendor.commission * 100}%`}</span>);
    }

    return (
      <Button
        variant="text"
        className={classes.commissionAdd}
        onClick={() => editCommission(vendor)}
      >
        <IconEdit />
        <span className={classes.commissionAddText}>Not set</span>
      </Button>
    )
  }

  const editCommission = (vendor: any) => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Edit Commission',
        'vendorCommission': vendor,
      },
      'type': modalTypes.EDIT_COMMISSION_MODAL
    }));

    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  const getData = () => {
    const tempData = [{
      vendorName: 'Test Vendor',
      commission: 0.2,
      contact: " John Doe",
      email: 'abc@email.com',
      phone: '(888) 888-8888',
    },{
      vendorName: 'Test Vendor',
      commission: null,
      contact: " John Doe",
      email: 'abc@email.com',
      phone: '(888) 888-8888',
    },{
      vendorName: 'Test Vendor',
      commission: 0.2,
      contact: " John Doe",
      email: 'abc@email.com',
      phone: '(888) 888-8888',
    },{
      vendorName: 'Test Vendor',
      commission: 0.2,
      contact: " John Doe",
      email: 'abc@email.com',
      phone: '(888) 888-8888',
    },
    ];
    setTableData(tempData);
  }

  const handleMenuButtonClick = (event: any, id: number, row:any) => {
    event.stopPropagation();
    switch (id) {
      case 0:
        editCommission(row);
        break;
    }
  }

  const columns: any = [
    {
      'Header': 'Vendor',
      'accessor': 'vendorName',
      'className': 'font-bold',
      'sortable': true,
    },
    { Cell({ row }: any) {
        return renderCommission(row.original)
      },
      'Header': 'Commission',
      'accessor': 'commission',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Contact',
      'accessor': 'contact',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Email',
      'accessor': 'email',
      'className': 'font-bold',
      'sortable': true,
    },
    {
      'Header': 'Phone',
      'accessor': 'phone',
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
      searchPlaceholder = 'Search Vendor List...'
      setPage={setCurrentPage}
      tableData={tableData}
    />
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(Payroll);
