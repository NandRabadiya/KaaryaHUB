import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT
} from './ActionTypes';


import { API_BASE_URL } from '../../config/api';
import { data } from 'react-router-dom';


export const register=userData=>async (dispatch)=>{
    dispatch({type:REGISTER_REQUEST});
    try {
     
        const {data}=await axios.post(`${API_BASE_URL}/auth/signup`,userData);

        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
            dispatch({type:REGISTER_SUCCESS,payload:data});
        }

        console.log("register success ",data);
     //   dispatch({type:REGISTER_SUCCESS,payload:response.data});
       // dispatch(loadUser());
    } catch (error) {
        dispatch({type: REGISTER_FAILURE, payload: error.response?.data?.error || "Registration failed"});
    
        console.log("register error ",error);
        console.log("register error message ",error.response.data.error);
    
    }
}



export const login=userData=>async (dispatch)=>{
    dispatch({type:LOGIN_REQUEST});
    try {
        const {data}=await axios.post(`${API_BASE_URL}/auth/signin`,userData);

        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
            dispatch({type:LOGIN_SUCCESS,payload:data});
        }

        console.log("Login  success ",data);
     //   dispatch({type:REGISTER_SUCCESS,payload:response.data});
       // dispatch(loadUser());
    } catch (error) {
        dispatch({type: LOGIN_FAILURE, payload: error.response?.data?.error || "Login failed"});
    
        console.log("Login error ",error);
        console.log("login error message ",error.response.data.error);

    
    }
}


export const getUser=()=>async (dispatch)=>{
    dispatch({type:GET_USER_REQUEST});
    try {
        const {data}=await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`
            }
        
        });

        // if(data.jwt){
        //     localStorage.setItem("jwt",data.jwt);
            dispatch({type:GET_USER_SUCCESS,payload:data});
        // }

        console.log("register success ",data);
     //   dispatch({type:REGISTER_SUCCESS,payload:response.data});
       // dispatch(loadUser());
    } catch (error) {
      //  dispatch({type:REGISTER_FAILURE,payload:error.response.data});
    
        console.log("register error ",error);
    
    }
}


export const logout=()=>async (dispatch)=>{
    dispatch({type:LOGOUT});
    localStorage.clear();
}