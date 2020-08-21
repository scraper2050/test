import Axios from 'axios';

// console.error("______ process.env.NODE_ENV ____", process.env.NODE_ENV)
let base_url = `https://blueclerk-node-api.deploy.blueclerk.com/api/v1/`;

if (process.env.NODE_ENV !== "development") {
    base_url = `https://blueclerk-node-api.deploy.blueclerk.com/api/v1/`;
}

let axios = Axios.create({
    baseURL: base_url,  //YOUR_API_URL HERE
    headers: {
        'Content-Type': 'application/json',
    }
});

const lToken = localStorage.getItem('token');
if(lToken) {
    console.error("Ltoken ==> ", lToken);
    const token = JSON.parse(lToken || "");
    console.error("__ token __", token);
    axios.defaults.headers.common['Authorization'] = token;
}

export default axios;