import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    person: 'UserDevice/AddUserDevice',
   person1:'User/FindAllUsers',
   person2:'Devices/FindAllDevices'
};




function postUserDevice(user, callback){
    
    let request = new Request(HOST.backend_api + endpoint.person , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
    /*
   fetch(HOST.backend_api+'User/AddUser',{
    method: 'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        user:this.state
    })

   }).then(res=>res.json())
   .then((result)=>{
    alert(result);
    this.getPersons(callback);
   }, (error)=>{
    alert('Failed');
   })
   */
}

export {
  
    postUserDevice
};
