import request from 'utils/http.service';

export const getAllRoutes = async (date: string) => {
  const requestLink = `/getAllJobRoutes?scheduleDate=${date}`;

  return new Promise(async (resolve, reject) => {
    try {
      const res: any = await request(requestLink, 'GET', false);

      if (res.status === 200) {
        return resolve(res);
      }
    } catch (err) {
      return reject(err);
    }
  });
};

export const getTecnicianRoutes = async (date: string) => {
  let _id = '';
  const user = localStorage.getItem('user');
  if (user) {
    _id =  (JSON.parse(user))._id;
  }
  const requestLink = `/getAllJobRoutes?scheduleDate=${date}&employeeType=0&technicianId=${_id}`;

  return new Promise(async (resolve, reject) => {
    try {
      const res: any = await request(requestLink, 'GET', false);

      if (res.status === 200) {
        return resolve(res);
      }
    } catch (err) {
      return reject(err);
    }
  });
};


