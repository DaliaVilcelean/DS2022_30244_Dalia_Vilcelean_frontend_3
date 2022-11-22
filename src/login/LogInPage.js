import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import validate from "../person/components/validators/person-validators.js"
import Button from "react-bootstrap/Button";
import logInApi from "./api/logIn-api.js";
import {Router} from 'react-router-dom'
import Input from "../Input";
import {Route, Navigate} from 'react-router-dom';

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Label} from 'reactstrap';
import AdminPage from "../AdminPage/AdminPage.js";
export const LOGIN_INPUT_WIDTH = '100%'
export const LOGIN_INPUT_HEIGHT = '44px'
export const LOCAL_STORAGE_USER_KEY = 'user'






const LogInPage=()=>{


    const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const navigate = useNavigate();


  const handleFormData = (event) => {
    const name=event.target.name;
    
    const value=event.target.value;
    console.log(event.target.value)
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
       
      };
      
    });
  };

  const validateFormData = () => {
    setMessage("");
    setUsernameError(false);
    setPasswordError(false);

    if (!formData.username && !formData.password) {
      setMessage("Username and password are required!");
      setUsernameError(true);
      setPasswordError(true);
      return false;
    } else if (!formData.password) {
      setMessage("Password is required!");
      setPasswordError(true);
      return false;
    } else if (!formData.username) {
      setMessage("Username is required!");
      setUsernameError(true);
      return false;
    }
    return true;
  };


  const login = async () => {
    if (validateFormData()) {
        console.log(formData)
      const response = await logInApi(formData.username, formData.password);
      console.log(response)
      if (response.isError) setMessage("Invalid credentials");
      else {
        const user = {
          id: response.id,
          username: response.username,
          type: response.type,
        };
        console.log(response.type)
        if(response.type=='admin'){
   navigate('/home')
   
        }
       
        else if(response.type=='user'){
        navigate('/user',{state:{id:response.id,name:response.username}}); }
     
        
        console.log(response)
       
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
        
     
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_USER_KEY)) navigate('/');
  }, [localStorage.getItem(LOCAL_STORAGE_USER_KEY)]);

  const toggleViewHidePassword = () => {
    setShowPassword(!showPassword);
  };



return(

    <div className="leftside-container">
      <h1 className="login-title">Login</h1>

      <Input
        _height={LOGIN_INPUT_HEIGHT}
        _width="380px"
        label="Username"
        name="username"
        type="username"
        placeholder={"Enter your Username here.."}
        onChangeHandler={handleFormData}
        errorToggle={usernameError}
      />
      <div className="password-container">
        <Input
          className="password-input"
          _height={LOGIN_INPUT_HEIGHT}
          _width="380px"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder={"Enter your password"}
          onChangeHandler={handleFormData}
          errorToggle={passwordError}
        />
        <button
          className="toggle-password-button"
          onClick={toggleViewHidePassword}
        >
          {showPassword ? (
            <i className="bi bi-eye"></i>
          ) : (
            <i className="bi bi-eye-slash"></i>
          )}
        </button>
      </div>
     
       <Button type={"login"} onClick={login}>
        Log in
        
           </Button>
      {message && <p className="error-message">{message}</p>}
    </div>
    
);

          
    
};
export default LogInPage;