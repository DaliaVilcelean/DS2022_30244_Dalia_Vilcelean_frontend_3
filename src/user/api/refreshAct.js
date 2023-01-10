import {HOST} from '../../commons/hosts';
import axios from 'axios';
import RestApiClient from "../../commons/api/rest-client";



const endpoint = {
    device: 'ReceiveData/Refresh'
   
};




export default async () => {
    try {
      const response = await axios.get(HOST.backend_api + endpoint.device );
   console.log(response)
      return response.data;
    } catch (error) {
      return {
        isError: true,
      };
    }
  };
  