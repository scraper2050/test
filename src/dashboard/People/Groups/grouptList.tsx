import React, { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import BCTable from '../../Components/BCTable';

import './grouplist.scoped.scss';

const GrouptList: () => JSX.Element = () => {
    const [modalFlag, setModalFlag] = useState(false);
    const [headCells, setHeadCells] = useState([
      {
        id: "group_name",
        label: "Group Name",
        sortable: true,
        width: '30%',
      },
      {
        id: "Email",
        label: "Email",
        sortable: true, 
        width: '70%',
      },
    ])
    const table_data = [
      {        
        group_name: "Name asdfasd1",
        Email: "Email isdfk"
      },
      {        
        group_name: "Name asdfasd1",
        Email: "Email wefs"
      },
      {        
        group_name: "Name asdfasd2",
        Email: "Email 463asd"
      },
      {        
        group_name: "Name asdfasd1",
        Email: "Email isd24fk"
      },
      {        
        group_name: "Name dfasdf",
        Email: "Email fbhsdfg"
      },
      {        
        group_name: "Name 34fgsfg",
        Email: "Email dfbxdfg"
      },
      {        
        group_name: "Name asdfw2353",
        Email: "Email dfasdf"
      },      
    ]

    let member: any;
    let manager: any;
    let group_Id: any;
    let groupName: any;
    let isRole:any;
    let userdata:any;
    let title: any;

    function onCreateGroup():void {
        // this.groupDlg.open();
    }

    function onMembers(item, index):void{
        member = item['members'];
        manager = item['manager']
        group_Id = item['_id'];
        groupName = item['title']
        console.log("Gorup name", groupName)
        console.log("member111111", member)
        console.log("manager44444", manager)
        
        // this.navigate(['/main/group-manager'], {
        //     queryParams: { "manager": JSON.stringify(this.manager), "members": JSON.stringify(this.member), "index": index, "id": this.group_Id, "groupName": this.groupName },
        //     skipLocationChange: true
        // });
    }

    function onConfirmAdd(): void{
        // this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
        let param = {
            title: title
        }
        // this.apiProvider.createGroup(param).subscribe(response => {
        //     console.log("Group  Response", response);
        //     if (response['status'] == 1) {
        //         this.toast(response['message'], "success");
        //         this.getGroups();
        //     } else {
        //         this.toast(response['message'], "Failed");
        //     }
        // })
        // this.groupDlg.close();
    }

    function onCancelAdd():void {
        // this.groupDlg.close();
    }

    return(        
        <div className="grouplist-container">
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
export default GrouptList;