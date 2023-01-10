import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import { actionCreators } from './api/RabbitMQ';
import rabbitMQMessageService from './util/rabbitMqMessageService';


class MessagesTable extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '', messages: [], signalReceived: '' };

        this.rabbitMQMessageService = new rabbitMQMessageService((msg) => {
            this.receiveMessage(msg);
        }, (msgs) => {
            this.receiveMQMessage(msgs);
        });
    }

    componentDidMount() {
        // This method is called when the component is first added to the document
        this.props.refreshAction();
        //this.timeInterval = setInterval(() => {
        //    this.props.refreshAction();
        //}, 1000);
    }

    sendToQ = () => {
        console.log("send")
        this.props.sendToQAction();
    }

    refresh = () => {
        this.props.refreshAction();
    }

    handleChange = (e) => {
        this.setState({ message: e.target.value });
    }

    receiveMessage = (msg) => {
        console.log('Signal received by component: ' + msg);
        this.setState({ signalReceived: msg });
    }

    receiveMQMessage = (msgs) => {
        console.log('Messages received by component from MQ: ' + msgs);
        this.setState({ messages: msgs });
    }

    sendMessageSignal = (e) => {
        e.preventDefault();
        const { message } = this.state;
        this.rabbitMQMessageService.sendMessage(message);
    }

    render() {
        const { message, messages, signalReceived } = this.state;
        return (
            <div>
            <div style={{ background: 'bisque', margin: '10px'}}>
                {!!this.props.signalReceived && ` Signal received: ${this.props.signalReceived}`}
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: '10px' }}>
                    <input placeholder='Message' value={this.props.message} onChange={this.props.handleChange} />
                </div>
                <div style={{ margin: '10px' }}>
                    <button className="btn btn-primary" onClick={this.props.sendToQ}>SendToQ</button>
                </div>
                <div style={{ margin: '10px' }}>
                    <button className="btn btn-primary" onClick={this.props.sendMessageSignal}>Send Signal</button>
                </div>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Messages</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.messages.map(msg =>
                        <tr key={msg}>
                            <td>{msg}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
        
    }
}



export default connect(
    state => state.rabbitMQMessages,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(MessagesTable);