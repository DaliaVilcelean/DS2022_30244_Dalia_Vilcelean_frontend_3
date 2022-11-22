import axios from "axios"
import React, { useState, useEffect } from "react";
import {HOST} from '../../commons/hosts';






const endpoint = {
    person: 'User/Login'
    
};

const LOGIN_URL=HOST.backend_api+endpoint.person



export default async (username, password) => {

    try {
        console.log(username,password)
        console.log(LOGIN_URL);
        const response = await axios.post(LOGIN_URL,
            {
                username:username,
                password:password
            }
        )
       console.log(response.data)
        return response.data

      } 
      catch (error) {
         return {
            isError:true
         }
      }
}