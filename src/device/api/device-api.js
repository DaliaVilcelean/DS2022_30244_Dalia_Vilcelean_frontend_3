import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    person: 'Devices/FindAllDevices',
    deviceId:'Devices/FindDeviceById',
    deleteDevice:'Devices/DeleteDevice/'
};
const endpoint1 = {
    person: 'Devices/AddDevice',
    update:'Devices/UpdateDevice'
};

function getDevices(callback) {
    
    let request = new Request(HOST.backend_api + endpoint.person, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
    

}

function getDeviceById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.deviceId+'{' + params.id+'}', {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function deleteDeviceById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.deleteDevice + params.id, {
       method: 'DELETE'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


function postDevice(user, callback){
    
    let request = new Request(HOST.backend_api + endpoint1.person , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
  
}
function updateDevice(user, callback){
    
    let request = new Request(HOST.backend_api + endpoint1.update, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
  
}

export {
    getDevices,
    getDeviceById,
    postDevice,
    deleteDeviceById,
    updateDevice
};
