import { formatDate, formatTime, phoneNumberFormatter } from 'helpers/format';

export const getVendorName = (vendor :any) => {
  if (vendor) {
    return vendor.profile
      ? vendor.profile.displayName
      : vendor.info.companyName;
  }
  return 'N/A';
};


export const formatJobReportDetails = (row: any) => {
  const baseObj = row;

  const { jobId } = baseObj;
  const customerName = baseObj.customer.profile.displayName;
  const customerId = baseObj.customer._id;
  const phoneNum = baseObj.customer.contact.phone;
  const phoneFormat = phoneNumberFormatter(phoneNum);
  const customerEmail = baseObj.customer.info.email;
  const workReport = baseObj.jobId;
  const customerAddress = baseObj && baseObj.customer.address;
  let address: any = '';
  if (customerAddress && customerAddress !== undefined) {
    address = `${customerAddress.street !== undefined &&
        customerAddress.street !== null
      ? customerAddress.street
      : ''
    }
      ${customerAddress.city !== undefined &&
          customerAddress.city !== null
    ? customerAddress.city
    : ''
} ${customerAddress.state !== undefined &&
          customerAddress.state !== null &&
          customerAddress.state !== 'none'
  ? customerAddress.state
  : ''
} ${customerAddress.zipCode !== undefined &&
          customerAddress.zipCode !== null
  ? customerAddress.zipCode
  : ''
}`;
  } else {
    address = 'N/A';
  }
  const jobType = baseObj.type.title;
  const jobDate =
    baseObj && baseObj.createdAt !== undefined
      ? baseObj.createdAt
      : 'N/A';
  const formatJobDate = formatDate(jobDate);
  const jobTime =
      baseObj && baseObj.createdAt !== undefined
        ? baseObj.createdAt
        : 'N/A';
  const formatJobTime = formatTime(jobTime);
  const technicianName = getVendorName(baseObj.technician || baseObj.contractor);

  const recordNote =
      baseObj && baseObj.description !== undefined
        ? baseObj.description
        : 'N/A';
  const purchaseOrderCreated =
      baseObj && baseObj.ticket !== undefined
        ? baseObj.ticket.jobCreated
        : 'N/A';
  const purchaseOrder = purchaseOrderCreated
    ? 'Yes'
    : 'No';

  const companyName =
      baseObj && baseObj.company.info !== undefined
        ? baseObj.company.info.companyName
        : 'N/A';
  const companyLogo =
      baseObj && baseObj.company.info !== undefined
        ? baseObj.company.info.logoUrl
        : 'N/A';
  const companyEmail =
      baseObj && baseObj.company.info !== undefined
        ? baseObj.company.info.companyEmail
        : 'N/A';
  const companyFax =
      baseObj && baseObj.company.contact !== undefined
        ? baseObj.company.contact.fax
        : 'N/A';
  const companyAddress =
      baseObj && baseObj.company.address;
  const companyPhone =
      baseObj && baseObj.company.contact !== undefined
        ? baseObj.company.contact.phone
        : 'N/A';
  const workPerformedLocation =
      baseObj && baseObj.ticket !== undefined
        ? baseObj.ticket.jobLocation
        : 'N/A';
  const location =
      workPerformedLocation === '' || null || undefined
        ? 'None Found'
        : workPerformedLocation;
  const workPerformedDate =
      baseObj && baseObj.ticket !== undefined
        ? baseObj.ticket.createdAt
        : 'N/A';
  const formatworkPerformedDate = formatDate(workPerformedDate);
  const workPerformedTimeScan =
      baseObj && baseObj.ticket !== undefined
        ? baseObj.ticket.createdAt
        : 'N/A';
  const workPerformedNote =
      baseObj && baseObj.ticket !== undefined
        ? baseObj.ticket.note
        : 'N/A';
  const formatworkPerformedTimeScan = formatTime(workPerformedTimeScan);
  const status = baseObj && baseObj.status === 2
    ? baseObj.status
    : 'N/A';
  const serviceTicket = baseObj && baseObj.ticket || null;
  const startTime = baseObj && baseObj.startTime !== undefined
    ? new Date(baseObj.startTime).toLocaleString()
    : 'N/A';
  const endTime = baseObj && baseObj.endTime !== undefined
    ? new Date(baseObj.endTime).toLocaleString()
    : 'N/A';

  const jobReportObj = {
    address,
    companyAddress,
    companyEmail,
    companyFax,
    companyLogo,
    companyName,
    companyPhone,
    customerEmail,
    customerId,
    customerName,
    endTime,
    formatJobDate,
    formatJobTime,
    formatworkPerformedDate,
    formatworkPerformedTimeScan,
    jobId,
    jobType,
    location,
    phoneFormat,
    purchaseOrder,
    recordNote,
    serviceTicket,
    startTime,
    status,
    technicianName,
    workPerformedNote,
    workReport
  };

  return jobReportObj;
};
