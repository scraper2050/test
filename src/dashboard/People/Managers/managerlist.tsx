import React, { Component, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './managerlist.scoped.scss';

const ManagerList: () => JSX.Element = () => {
    const [modalFlag, setModalFlag] = useState(false);
    const table_data = [
      {
        no:1,
        groupname:"tttt",
        view:"dddd",
      },
      {
        no:2,
        groupname:"sssssss",
        view:"jjj",
      },
      {
        no:3,
        groupname:"fffffff",
        view:"dd",
      }
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
        <div className="managerlist-container">
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

            <div className="card customTableHeaderTop col-sm-12 p-0">
              <div className="table-container card-body p-0">
                <table className="table table-striped">
                  <thead>
                      <tr>
                          <th className= "col-sm-2">
                              <div>No.</div>
                          </th>
                          <th className= "col-sm-7">
                              <div> Name</div>
                          </th >
                          <th className= "col-sm-3">
                              <div>Email</div>
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                        table_data.map((data, ind)=>(
                          <tr className="line-hover" key={ind}>
                            <td>{ data.no }</td>
                            <td>{ data.groupname }</td>
                            <td>{ data.view }</td>
                          </tr>
                        ))
                      }                     
                  </tbody>
                  <tfoot>
                      <tr>
                          <td >
                              {/* <mfBootstrapPaginator></mfBootstrapPaginator> */}
                          </td>
                      </tr>
                  </tfoot>
                </table>
              </div>
            </div>
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
export default ManagerList;
