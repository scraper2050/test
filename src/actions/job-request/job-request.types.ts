export const types = {
  'SET_JOB_REQUESTS': 'SET_JOB_REQUESTS',
  'SET_PREVIOUS_JOB_REQUESTS_CURSOR': 'SET_PREVIOUS_JOB_REQUESTS_CURSOR',
  'SET_NEXT_JOB_REQUESTS_CURSOR': 'SET_NEXT_JOB_REQUESTS_CURSOR',
  'SET_LAST_PAGE_JOB_REQUESTS_CURSOR': 'SET_LAST_PAGE_JOB_REQUESTS_CURSOR',
  'SET_JOB_REQUESTS_TOTAL': 'SET_JOB_REQUESTS_TOTAL',
  'SET_CURRENT_JOB_REQUESTS_PAGE_INDEX': 'SET_CURRENT_JOB_REQUESTS_PAGE_INDEX',
  'SET_CURRENT_JOB_REQUESTS_PAGE_SIZE': 'SET_CURRENT_JOB_REQUESTS_PAGE_SIZE',
  'SET_JOB_REQUESTS_SEARCH_KEYWORD': 'SET_JOB_REQUESTS_SEARCH_KEYWORD',
  'SET_NUMBER_OF_OPEN_JOB_REQUEST': 'SET_NUMBER_OF_OPEN_JOB_REQUEST',
  'SET_REFRESH_JOB_REQUEST_STATUS': 'SET_REFRESH_JOB_REQUEST_STATUS',
  'SET_JOB_REQUEST_LOADING': 'SET_JOB_REQUEST_LOADING',
};

interface JobRequest {
  _id: string;
  _v: string;
  charges: number;
  scheduleDate: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  estimate: string;
  customer: {
    address: {
      city: string;
      state: string;
      zipCode: string;
    };
    contactName: string;
    info: {
      email: string;
    };
    profile: {
      displayName: string;
    };
    contact: {
      phone: string;
    };
    location?: {
      coordinates?: number[];
    }
    _t: string;
    _id: string;
  };
  description: string;
  employeeType: false;
  endTime: string;
  equipment_scanned: false;
  jobId: string;
  no_of_equipment_scanned: number;
  type: {
    title: string;
    _id: string;
  };
  comment: string;
  status: string;
  company: {
    info: {
      companyName: string;
      companyEmail: string;
    };
    contact: {
      phone: string;
    };
    _id: string;
  };
  startTime: string;
  completeOnTime: false;
  createdAt: string;
  createdBy: {
    profile: {
      displayName: string;
    };
    _t: string;
    _id: string;
  };
  technician: {
    profile: {
      displayName: string;
    };
    __t: string;
    _id: string;
  };
  ticket: {
    note: string;
    ticketId: string;
    jobLocation: string;
    _id: string;
  };
  timeSpent: number;
  jobSite?: {
    location?: {
      coordinates?: number[];
    }
  }
  jobLocation?: {
    location?: {
      coordinates?: number[];
    }
  }
  tasks: any[];
}

export interface JobRequestState {
  readonly isLoading: boolean;
  readonly refresh: boolean;
  readonly jobRequests?: JobRequest[];
  prevCursor: string;
  nextCursor: string;
  lastPageCursor: string;
  total: number;
  currentPageIndex: number;
  currentPageSize: number;
  keyword: string;
  numberOfJobRequest: number;
}