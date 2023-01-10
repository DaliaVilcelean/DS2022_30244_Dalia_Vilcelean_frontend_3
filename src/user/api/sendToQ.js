import {HOST} from '../../commons/hosts';
import axios from 'axios';
import RestApiClient from "../../commons/api/rest-client";



const endpoint = {
    device: 'ReceiveData/SendToQ'
   
};




export default async () => {
    try {
      const response = await axios.get(HOST.backend_api + endpoint.device );
   
      return response.data;
    } catch (error) {
      return {
        isError: true,
      };
    }
  };
  