import * as api from '../api';
import {AUTH} from '../constants/actionTypes.js';

export const signin = (formData, navigate, setErrorMsg) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData);

        dispatch({type: AUTH, data});
        setErrorMsg('');
        navigate('/main');
    } catch (error) {
        setErrorMsg(error.response.data.message);
        console.log(error.response.data.message);
    }
}

export const signup = (formData, navigate, setErrorMsg) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);
        
        dispatch({type: AUTH, data});
        setErrorMsg('');
        navigate('/main');
    } catch (error) {
        setErrorMsg(error.response.data.message);
        console.log(error.response.data.message);
    }
}