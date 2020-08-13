import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    SIGNOUT_USER_SUCCESS,
    USER_DATA,
    USER_TOKEN_SET,
} from "../constants/actionTypes";
import axios from '../util/Api';

export const getUser = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        axios.get('/me',
        ).then(({ data }) => {
            console.log(" ___ getUser RESPONSE ___ ", data);
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: USER_DATA, payload: data.user });
        }).catch(err => {
            console.error("xxx getUser Request ERROR xxx", err);
            dispatch({ type: FETCH_ERROR, payload: "Error during get me request with this token" });
            dispatch({ type: SIGNOUT_USER_SUCCESS });
        });
    }
};
