import React, { Component, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
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
  const table_data = [
    {
      No:1,
      Name:"Andl siels",
      Email:"ee@gmail.com",
      Phone_Number:"1984-22032-33",
      View:"werw",
    },
    {
      No:2,
      Name:"ssde sienhd",
      Email:"ttt@gmail.com",
      Phone_Number:"1984-22032-33",
      View:"sdfsd",
    },
    {
      No:3,
      Name:"swwed sss",
      Email:"uuu@gmail.com",
      Phone_Number:"1984-22032-33",
      View:"sdf",
    },
    {
      No:4,
      Name:"eetss ddd",
      Email:"uurd@gmail.com",
      Phone_Number:"1984-22032-33",
      View:"jjxcvxcvj",
    },
    {
      No:5,
      Name:"tteexs sss",
      Email:"wwaq@gmail.com",
      Phone_Number:"1984-22032-33",
      View:"ertert3",
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
                        <th className= "col-sm-1">
                            <div>No.</div>
                        </th>
                        <th className= "col-sm-2">
                            <div> Name</div>
                        </th >
                        <th className= "col-sm-2">
                            <div>Email</div>
                        </th>
                        <th className= "col-sm-5">
                            <div>Phone Number</div>
                        </th>
                        <th className= "col-sm-2">
                            <div>View</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                      table_data.map((data, ind)=>(
                        <tr className="line-hover" key={ind}>
                          <td>{ data.No }</td>
                          <td>{ data.Name }</td>
                          <td>{ data.Email }</td>
                          <td>{ data.Phone_Number }</td>
                          <td>{ data.View }</td>
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
export default TechList;
