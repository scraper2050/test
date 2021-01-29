// I am to creat a job-report.types.ts in actions/customer/job-report/ folder for this:
export const types = {
  LOAD_JOBREPORT: "loadJobReportActions",
  SET_JOBREPORTS: "setJobReports",
  SET_SINGLE_JOBREPORT: "setSingleJobReport",
  GET_SINGLE_JOBREPORT: "getSingleJobReport",
};

export interface JobReport {
  _id: string;
  jobId: string;
  status: number;
  employeeType: boolean;
  dateTime: string;
  description: string;
  createdAt: string;
  ticket: {
    scheduleDateTime: string;
    note: string;
    ticketId: string;
  };
  technician: {
    auth: {
      email: string;
    };
    profile: {
      displayName: string;
    };
    contact: {
      phone: string;
    };
    permissions: {
      role: string;
    };
  };
  customer: {
    auth: {
      email: string;
    };
    info: {
      email: string;
    };
    profile: {
      displayName: string;
    };
    contact: {
      phone: string;
    };
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  type: {
    title: string;
  };
  company: {
    auth: {
      email: string;
    };
    info: {
      companyName: string;
      logoUrl: string;
    };
    contact: {
      phone: string;
    };
    permissions: {
      role: string;
    };
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  createdBy: {
    auth: {
      email: string;
    };
    info: {
      companyName: string;
    };
    profile: {
      displayName: string;
    };
    contact: {
      phone: string;
    };
    permissions: {
      role: string;
    };
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  scans: {
    comment: string;
    timeOfScan: string;
    equipment: {
      info: {
        model: string;
        serialNumber: string;
        nfcTag: string;
        location: string;
      };
      images: [string];
      type: {
        title: string;
      };
      brand: {
        title: string;
      };
    };
  };
}

export interface JobReportState {
  readonly loading: boolean;
  readonly jobReports?: JobReport[];
  readonly error?: string;
}

export enum JobReportActionType {
  GET = "getJobReports",
  SUCCESS = "getJobReportSuccess",
  FAILED = "getJobReportFailed",
}
