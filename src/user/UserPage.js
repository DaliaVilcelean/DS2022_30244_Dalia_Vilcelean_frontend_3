import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom'
import API_USERS from './api/user-api'
import Device from './api/device-find'
import sendToQ from "./api/sendToQ";
import refreshAct from "./api/refreshAct";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import {actionCreators} from './api/RabbitMQ'
import rabbitMQMessageService from "./util/rabbitMqMessageService";


import Header from "./chat/components/Header/Header";

import { User } from "../chat_pb";
import { ChatServiceClient } from "../chat_grpc_web_pb";
import ChatPage from "./chat/pages/ChatPage/ChatPage";
import {  useRef } from "react";


export const client = new ChatServiceClient(
    "http://localhost:9090",
    null,
    null
  );
  


const  UserPage=()=>{



    const inputRef = useRef(null);
    const [submitted, setSubmitted] = useState(null);
    function joinHandler() {
      const _username = inputRef.current.value;
  
      const user = new User();
      user.setId(Date.now());
      user.setName(_username);
  
      client.join(user, null, (err, response) => {
        if (err) return console.log(err);
        const error = response.getError();
        const msg = response.getMsg();
  
        if (error === 1) {
          console.log(error, msg);
          setSubmitted(true);
         
          return;
        }
        window.localStorage.setItem("username", _username.toString());
        setSubmitted(true);
     
      });
    }
  
    function renderChatPage() {
      return <ChatPage client={client} />;
    }
  
    function renderJoinPage() {
      return (
        <div>
          <div>
            <h1>Join Chat As...</h1>
          </div>
          <div style={{ padding: "10px 0" }}>
            <input
              style={{ fontSize: "1.3rem" }}
              type="text"
              ref={inputRef}
              placeholder="Your username..."
            />
          </div>
          <div>
            <button
              onClick={joinHandler}
              style={{
                padding: "7px 38px",
                fontSize: "1.2em",
                boxSizing: "content-box",
                borderRadius: "4px",
              }}
            >
              Join
            </button>
          </div>
        </div>
      );
    }
  
  
  



const location=useLocation();
const userId=location.state.id;
const nameUser=location.state.name;


const [message,setMessage]=useState("Ati Depasit!!")
const [messages,setMessages]=useState([])
const [signalReceived,setSignalReceived]=useState("")
const state={message,messages,signalReceived}

const SendToQ = () => {
    console.log("send")
  sendToQ()
}
const refresh = () => {
    refreshAct();
}
const rabbitMQMessages = new rabbitMQMessageService((msg) => {
    receiveMessage(msg);
}, (msgs) => {
    receiveMQMessage(msgs);
});
const sendMessageSignal = (e) => {
    e.preventDefault();
    const { message } = state;
    console.log(state);
    rabbitMQMessages.sendMessage(message);
    console.log(message)
}
const receiveMessage = (msg) => {
    console.log('Signal received by component: ' + msg);
    setSignalReceived(msg);
}

const receiveMQMessage = (msgs) => {
    console.log('Messages received by component from MQ: ' + msgs);
    setMessages(msgs)
}
const handleChange1 = e => {
    const sampleObject = JSON.stringify(messages)
    
    const ss=JSON.parse(sampleObject)
console.log(ss)
    setMessage("Ati Depasit!!")
}

const [people, setPeople] = useState([]);
const getPeople = async () => {
    const response=await API_USERS(userId);
    setPeople(response);
};
useEffect(() => {
  getPeople();
  
 
  console.log(messages)
  refresh();
}, []);

const [device,setDevice] = useState([]);

const handleChange=async event=>{
    const response=await Device(event.target.value);
    console.log(event.target.value)
    handleChange1();
    console.log(response)
    setDevice(response);
}




return(

    <div>

        <CardHeader>
                    <strong> <b> Hello, {nameUser} !</b> </strong>
                </CardHeader>
                <>
<Header />
<div className="container">
        <main className="main">
          {submitted ? renderChatPage() : renderJoinPage()}
        </main>
      </div>
</>

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

                <div>
            <div style={{ background: 'bisque', margin: '10px'}}>
                {!!signalReceived && ` Signal received: ${signalReceived}`}
            </div>
            <div style={{ display: 'flex' }}>
                {/* <div style={{ margin: '10px' }}>
                    <input placeholder='Message' value={message} onChange={handleChange1} /> */}
                </div>
                <div style={{ margin: '10px' }}>
                    <button className="btn btn-primary" onClick={SendToQ}>SendToQ</button>
                </div>
                <div style={{ margin: '10px' }}>
                    <button className="btn btn-primary" onClick={sendMessageSignal}>Send Signal</button>
                </div>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Messages</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map(msg =>
                        <tr key={msg}>
                            <td>{msg}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
                
                           

  //  </div>

);
}




export default connect(
    state => state.rabbitMQMessages,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(UserPage);


