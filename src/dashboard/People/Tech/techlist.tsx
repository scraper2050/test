import React, { useState } from 'react'

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import BCTable from '../../Components/BCTable';

import AvatarImg1 from '../../../assets/img/avatars/1.jpg';
import AvatarImg2 from '../../../assets/img/avatars/2.jpg';
import AvatarImg3 from '../../../assets/img/avatars/3.jpg';
import AvatarImg4 from '../../../assets/img/avatars/4.jpg';
import AvatarImg5 from '../../../assets/img/avatars/5.jpg';
import AvatarImg6 from '../../../assets/img/avatars/6.jpg';

import './techlist.scoped.scss';

const TechList: () => JSX.Element = () => {
  let member: any;
  let manager: any;
  let group_Id: any;
  let groupName: any;
  let isRole:any;
  let userdata:any;
  let title: any;
  
  const [modalFlag, setModalFlag] = useState(false);
  
  const [headCells, setHeadCells] = useState([
    {
      id: 'Name',
      label: 'Name',
      sortable: true,
      width: '20%',
    },
    {
      id: 'Email',
      label: 'Email',
      sortable: true,
      width: '20%',
    },
    {
      id: 'Phone_Number',
      label: 'Phone Number',
      sortable: true,
      width: '20%',
    },
    {
      id: 'View',
      label: 'View',
      sortable: false,
      isImage: true
    },
  ])
  const table_data = [
    {
      Name:"Andl siels",
      Email:"ee@gmail.com",
      Phone_Number:"1984-22032-33",
      View: AvatarImg1,
    },
    {      
      Name: "ssde sienhd",
      Email: "ttt@gmail.com",
      Phone_Number: "1984-22032-35",
      View: AvatarImg2,
    },
    {      
      id: 'phone_number',
      Name:"swwed sss",
      Email:"uuu@gmail.com",
      Phone_Number:"1984-22032-36",
      View: AvatarImg3,
    },
    {      
      Name:"eetss ddd",
      Email:"uurd@gmail.com",
      Phone_Number:"1984-22032-32",
      View:AvatarImg4,
    },
    {      
      Name:"tteexs sss",
      Email:"wwaq@gmail.com",
      Phone_Number:"1984-22032-31",
      View: AvatarImg5,
    },
    {      
      Name:"asdf sdf",
      Email:"wwaq@gmail.com",
      Phone_Number:"1984-2321-31",
      View: AvatarImg6,
    }
  ]

  function onConfirmAdd(): void{
    let param = {
      title: title
    }
}

  function onCancelAdd():void {
      // this.groupDlg.close();
  }
 
  return(        
    <div className="techlist-container">

      <div className="row">
        <div className="actionOption col-md-12 col-sm-12">
          <div className="col-md-6 pl-0 col-sm-6">
            <div className="search-box-div col-md-12 col-sm-12">
              <div className="col-md-1 searchIcon pr-0 col-sm-1 col-xs-2">
                <i aria-hidden="true" className="fa fa-search fa-3x"></i>
              </div>
              <div className="col-md-10 pl-0 col-sm-10 col-xs-10">
                <input className="form-control search-box-field" placeholder="Search Here..." type="text"/>
              </div>
            </div>
          </div>

          <div className="col-md-6 actionBtn col-sm-6">
            <div className="singleBtn"></div>
          </div>
        </div>
      </div>

      <BCTable 
        tableData={table_data}
        headCells={headCells}
        pagination={true}
      />    

      <Modal isOpen={modalFlag} >
        <ModalHeader className="modelHeader">
            <h3 >Add Group</h3>
        </ModalHeader>
        <ModalBody>
            <div className="control-caption">Title
                <div>
                    <input className="form-control"type="text" placeholder="Title" />
                </div>
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-success" onClick={()=>onConfirmAdd()}>OK</button>
            <button className="btn btn-danger" onClick={()=>onCancelAdd()}>Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default TechList;
