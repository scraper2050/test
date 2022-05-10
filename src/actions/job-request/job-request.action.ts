import { types } from './job-request.types';

export const setJobRequests = (jobRequests: any) => {
  return {
    'payload': jobRequests,
    'type': types.SET_JOB_REQUESTS
  };
};
export const setPreviousJobRequestsCursor = (prevCursor: string) => {
  return {
    'payload': prevCursor,
    'type': types.SET_PREVIOUS_JOB_REQUESTS_CURSOR
  };
};
export const setNextJobRequestsCursor = (nextCursor: string) => {
  return {
    'payload': nextCursor,
    'type': types.SET_NEXT_JOB_REQUESTS_CURSOR
  };
};
export const setLastPageJobRequestsCursor = (lastPageCursor: string) => {
  return {
    'payload': lastPageCursor,
    'type': types.SET_LAST_PAGE_JOB_REQUESTS_CURSOR
  };
};
export const setTotal = (total: number) => {
  return {
    'payload': total,
    'type': types.SET_JOB_REQUESTS_TOTAL
  };
};
export const setCurrentPageIndex = (currentPageIndex: number) => {
  return {
    'payload': currentPageIndex,
    'type': types.SET_CURRENT_JOB_REQUESTS_PAGE_INDEX
  };
};
export const setCurrentPageSize = (currentPageSize: number) => {
  return {
    'payload': currentPageSize,
    'type': types.SET_CURRENT_JOB_REQUESTS_PAGE_SIZE
  };
};
export const setKeyword = (keyword: string) => {
  return {
    'payload': keyword,
    'type': types.SET_JOB_REQUESTS_SEARCH_KEYWORD
  };
};
export const setNumberOfOpenJobRequest = (numberOfOpenJobRequest: number) => {
  return {
    'payload': numberOfOpenJobRequest,
    'type': types.SET_NUMBER_OF_OPEN_JOB_REQUEST
  };
};
export const setJobRequestsLoading = (isLoading: any) => {
  return {
    'payload': isLoading,
    'type': types.SET_JOB_REQUEST_LOADING
  };
};

export const refreshJobRequests = (refresh: any) => {
  return {
    'payload': refresh,
    'type': types.SET_REFRESH_JOB_REQUEST_STATUS
  };
};
