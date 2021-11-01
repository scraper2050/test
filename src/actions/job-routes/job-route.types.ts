import {Job} from "../job/job.types";

export interface JobRoute {
  _id: string;
  _v: string;
  comapny: string;
  routes: [
    {
      order: number;
      job: Job;
    }
  ]
  scheduleDate: string;
  technician: {
    _id: string;
    __t: string;
    profile: {
      firstName?: string,
      lastName?: string,
      displayName: string;
      imageUrl?: string;
    }
  }
}

export interface JobsState {
  readonly isLoading: boolean;
  readonly refresh: boolean;
  readonly data?: Job[];
  readonly jobObj?: Job;
}

export enum JobActionType {
  GET = 'getJobs',
  SUCCESS = 'getJobsSuccess',
  FAILED = 'getJobsFailed',
}

export const JobTypes = ['pending', 'started', 'finished', 'cancelled'];
