import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Job } from 'actions/job/job.types';
import config from 'config';
import { getLocalStorageToken } from '../utils/local-storage.service';

const api = config.apiBaseURL;
const customerApi = config.apiCustomerURL;

const fetchToken = (isCustomerAPI = false) => {
  if (isCustomerAPI) {
    return localStorage.getItem('tokenCustomerAPI') || '';
  }
  let token = '';
  if (getLocalStorageToken()) {
    token = getLocalStorageToken();
  }
  return token;
};

interface ListResponse<T> {
  nextCursor: string;
  previousCursor: string;
  total: number;
  jobs: T[];
}

export const apiRTK = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers) => {
      let token = '';

      token = fetchToken();

      if (token) {
        headers.set('Authorization', `${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    listJobs: build.query<
      ListResponse<Job>,
      { url: string; type: string; data?: any; isCustomerAPI: boolean, params?:any }
    >({
      query: ({ url, isCustomerAPI = false, type, data, params }) => ({
        url: isCustomerAPI ? customerApi + url : api + url,
        method: type,
        params,
        body: data,
        responseHandler: (response) => response.json(),
      }),
    }),
  }),
});

export const { useListJobsQuery, usePrefetch } = apiRTK;

