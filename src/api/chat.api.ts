import request from '../utils/http.service';

export const getJobRequestChat = async (id:string) => {
  try {
    const response: any = await request(`/chats/jobRequest/${id}`, 'OPTIONS');
    const {status, message} = response.data;
    if (status === 1) {
      return response.data;
    } else {
      return {status, message};
    }
  } catch {
    return {status: 0, message: `Something went wrong`};
  }
}

export const postJobRequestChat = async (id:string, paramObject:FormData) => {
  try {
    const response: any = await request(`/chats/jobRequest/${id}`, 'POST', paramObject);
    const {status, message} = response.data;
    if (status === 1) {
      return response.data;
    } else {
      return {status, message};
    }
  } catch {
    return {status: 0, message: `Something went wrong`};
  }
}

export const markJobRequestChatRead = async (jobRequestID: string, messageID:string) => {
  try {
    const paramObject = {lastReadChatId: messageID};
    const response: any = await request(`/chats/jobRequest/${jobRequestID}/markRead`, 'POST', paramObject);
    const {status, message} = response.data;
    if (status === 1) {
      return response.data;
    } else {
      return {status, message};
    }
  } catch {
    return {status: 0, message: `Something went wrong`};
  }
}
