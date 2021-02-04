import { withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import styles from "./view-more.styles";
import { useLocation } from "react-router-dom";
import {
  openModalAction,
  setModalDataAction,
} from "actions/bc-modal/bc-modal.action";
import {
  getCustomerDetailAction,
  loadingSingleCustomers,
} from "actions/customer/customer.action";
import { useDispatch, useSelector } from "react-redux";
import "../../../../scss/index.scss";
import { modalTypes } from "../../../../constants";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";

function CustomerInfoPage({ classes }: any) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { customerObj, loading } = useSelector((state: any) => state.customers);

  useEffect(() => {
    if (customerObj._id === "") {
      const obj: any = location.state;
      const customerId = obj.customerId;
      dispatch(loadingSingleCustomers());
      dispatch(getCustomerDetailAction({ customerId }));
    }
  }, []);

  const renderCustomerInfo = (row: any) => {
    let baseObj = row;
    let customerName =
      baseObj && baseObj["profile"] !== undefined
        ? baseObj["profile"]["displayName"]
        : "N/A";
    let customerAddress = baseObj && baseObj["address"];
    let vendorId = baseObj && baseObj["vendorId"];
    let customerId = baseObj && baseObj["_id"];
    let contactName =
      baseObj &&
        baseObj["contactName"] &&
        baseObj["contactName"] !== undefined &&
        baseObj["contactName"] !== ""
        ? baseObj["contactName"]
        : "N/A";
    let address: any = "";
    if (customerAddress && customerAddress !== undefined) {
      address = `${customerAddress["street"] !== undefined &&
        customerAddress["street"] !== null
        ? customerAddress["street"]
        : ""
        } 
      ${customerAddress["city"] !== undefined &&
          customerAddress["city"] !== null
          ? customerAddress["city"]
          : ""
        } ${customerAddress["state"] !== undefined &&
          customerAddress["state"] !== null &&
          customerAddress["state"] !== "none"
          ? customerAddress["state"]
          : ""
        } ${customerAddress["zipCode"] !== undefined &&
          customerAddress["zipCode"] !== null
          ? customerAddress["zipCode"]
          : ""
        }`;
    } else {
      address = "N/A";
    }
    let email =
      baseObj &&
        baseObj["info"] &&
        baseObj["info"] !== undefined &&
        baseObj["info"]["email"] !== ""
        ? baseObj["info"]["email"]
        : "N/A";
    let phone =
      baseObj &&
        baseObj["contact"] &&
        baseObj["contact"] !== undefined &&
        baseObj["contact"]["phone"] !== ""
        ? baseObj["contact"]["phone"]
        : "N/A";
    let location = baseObj && baseObj["location"] ? baseObj["location"] : [];
    let customerObj = {
      customerName: customerName,
      address,
      contactName: contactName,
      customerId,
      customerAddress,
      email,
      phone,
      location,
      vendorId
    };
    return customerObj;
  };
  const handleEditClick = (customer: any) => {
    dispatch(
      setModalDataAction({
        data: {
          customerObj: customer,
          modalTitle: "Edit Customer Information",
          removeFooter: false,
        },
        type: modalTypes.EDIT_CUSTOMER_INFO,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  if (loading) {
    return <BCCircularLoader heightValue={"200px"} />;
  } else {
    const customerData = renderCustomerInfo(customerObj);
    return (
      <div className="customer_info_wrapper">
        <div className="customer_container">
          <div className="name_wrapper customer_details">
            <strong>Name: </strong> {customerData.customerName}
          </div>
          <div className="customer_details">
            <strong>Contact Name: </strong> {customerData.contactName}
          </div>
          <div className="customer_details">
            <strong>Address: </strong>{" "}
            {customerData.address.trim() !== "" ? customerData.address : "N/A"}
          </div>
          <div className="customer_details">
            <strong>E-mail: </strong> {customerData.email}
          </div>
          <div className="customer_details">
            {customerData.vendorId !== "" ? <> <strong>Vendor Number: </strong> {customerData.vendorId} </> : null}
          </div>
          <div className="customer_details">
            <strong>Phone: </strong> {customerData.phone}
          </div>
        </div>
        <div
          className="edit_button"
          onClick={() => handleEditClick(customerData)}
        >
          <button className="MuiFab-primary">
            <i className="material-icons">edit</i>
          </button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CustomerInfoPage);
