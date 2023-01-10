import React, { useState, useEffect } from "react";

import BackgroundImg from '../commons/images/future-medicine.jpg';

import {Button, Container, Jumbotron} from 'reactstrap';
import Header from "../user/chat/components/Header/Header";

import { User } from "../chat_pb";
import { ChatServiceClient } from "../chat_grpc_web_pb";
import ChatPage from "../user/chat/pages/ChatPage/ChatPage";
import {  useRef } from "react";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };


export const client = new ChatServiceClient(
    "http://localhost:9090",
    null,
    null
  );


  



const Home=()=> {


    
    
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
        //window.alert("Username already exists.");
        return;
      }
      window.localStorage.setItem("username", _username.toString());
      setSubmitted(true);
      // history.push("chatslist");
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



    
        return (

            <div>

<>
<Header />
<div className="container">
        <main className="main">
          {submitted ? renderChatPage() : renderJoinPage()}
        </main>
      </div>
</>
        
        

                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-3" style={textStyle}>Integrated Medical Monitoring Platform for Home-care assistance</h1>
                        <p className="lead" style={textStyle}> <b>Enabling real time monitoring of patients, remote-assisted care services and
                            smart intake mechanism for prescribed medication.</b> </p>
                        <hr className="my-2"/>
                        <p  style={textStyle}> <b>This assignment represents the first module of the distributed software system "Integrated
                            Medical Monitoring Platform for Home-care assistance that represents the final project
                            for the Distributed Systems course. </b> </p>
                        <p className="lead">
                            <Button color="primary" onClick={() => window.open('http://coned.utcluj.ro/~salomie/DS_Lic/')}>Learn
                                More</Button>
                        </p>
                    </Container>
                </Jumbotron>

         

            </div>
        )
    };

export default Home
