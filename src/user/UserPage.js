import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom'
import API_USERS from './api/user-api'
import Device from './api/device-find'


import UserTable from "./user-table";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";


const  UserPage=()=>{
  

const location=useLocation();
const userId=location.state.id;
const nameUser=location.state.name;
console.log(userId)


const [people, setPeople] = useState([]);
const getPeople = async () => {
    const response=await API_USERS(userId);
    console.log(response)
 
    setPeople(response);
};
useEffect(() => {
  getPeople();
}, []);

const [device,setDevice] = useState([]);

const handleChange=async event=>{
    const response=await Device(event.target.value);
    console.log(event.target.value)
    console.log(response)
    setDevice(response);
}

const handleClick=event=>{
    event.preventDefault();

    console.log(device)
    
}






 

return(

    <div>

        <CardHeader>
                    <strong> <b> Hello, {nameUser} !</b> </strong>
                </CardHeader>

                <Card>
                
                <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                           {
                               <table>

                                <tbody>

                            <tr>
                                <td>idUser</td>
                                <td>idDevice</td>
                                <td>Address</td>
                            </tr>

                           { people.map((item,i)=>(
                                <tr key={i}>
                                    <td>{item.idUser}</td>
                                    <td>{item.idDevice}</td>
                                    <td>{item.address}</td>
                                </tr>
                            ))}

                                </tbody>
                               </table>
                           }
                         
                                                        
                        </Col>
                        
                    </Row>
                    <br/>
                    <Row>            
                        <Col>  Search Devices By Id:
                        </Col>
                        <Col>
                        <input
                        type="text" id='device' name='device' 
                        onChange={handleChange} value={device}
                        autoComplete='off'

                        />
                        </Col>
                     
                      
                    </Row>
                    <Row>
                        <Col> Device: {JSON.stringify(device)}</Col>
                       
                    </Row>
               
                </Card>
                           

    </div>

);
}


export default UserPage;



/*
const location=useLocation();
    var userId=location.state.id;
    var idname=location.state.name;
    console.log(userId)
    const response =  UserApi(userId);
    console.log(response.result)
    var tableData=JSON.stringify(response);
*/