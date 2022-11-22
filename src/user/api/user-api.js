import axios from "axios";
import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";



const endpoint = {
    person: 'UserDevice/FilterByUserId/'
   
};




export default async (userId) => {
    try {
      const response = await axios.get(HOST.backend_api + endpoint.person + `${userId}`);
   
      return response.data;
    } catch (error) {
      return {
        isError: true,
      };
    }
  };
  

  