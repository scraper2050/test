export const customer: any = {
  _id: "",
  info: {
    name: "",
    email: "me@test.com",
  },
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
  contact: {
    name: "",
    phone: "313-234-5632",
  },
  isActive: false,
  company: "",
  contactname: "",
  profile: {
    firstName: "",
    lastName: "",
    displayName: "Stephen Okpala",
  },
};

export const JobData = {
  _id: "",
  jobId: "1",
  status: 0,
  employeeType: false,
  dateTime: "",
  description: "",
  createdAt: "12-3-2012",
  ticket: {
    scheduleDateTime: "",
    note: "",
    ticketId: "",
  },
  technician: {
    auth: {
      email: "",
    },
    profile: {
      displayName: "Sam Cork",
    },
    contact: {
      phone: "",
    },
    permissions: {
      role: "",
    },
  },
  customer: {
    auth: {
      email: "",
    },
    info: {
      email: "",
    },
    profile: {
      displayName: "Micheal Doe",
    },
    contact: {
      phone: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
  type: {
    title: "",
  },
  company: {
    auth: {
      email: "",
    },
    info: {
      companyName: "",
      logoUrl: "",
    },
    contact: {
      phone: "",
    },
    permissions: {
      role: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
  createdBy: {
    auth: {
      email: "",
    },
    info: {
      companyName: "",
    },
    profile: {
      displayName: "",
    },
    contact: {
      phone: "",
    },
    permissions: {
      role: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
  scans: {
    comment: "",
    timeOfScan: "",
    equipment: {
      info: {
        model: "",
        serialNumber: "",
        nfcTag: "",
        location: "",
      },
      images: [""],
      type: {
        title: "",
      },
      brand: {
        title: "",
      },
    },
  },
};
