import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


        

class SignalRController {
    constructor(props) {
        this.rConnection = new HubConnectionBuilder()
            .withUrl(`https://localhost:44368/messageHub`)
            .configureLogging(LogLevel.Information)
            .build();

        this.rConnection.start()
            .catch(err => {
                console.log('connection error');
            });
    }

    registerReceiveEvent = (callback) => {
        this.rConnection.on("ReceiveMessage", function (message) {
            console.log(message);
            callback(message);
        });
    }

    registerReceiveMQEvent = (callback) => {
        this.rConnection.on("ReceiveMQMessage", function (message) {
            console.log(message);
            callback(message);
        });
    }

    sendMessage = async (message) => {
        try {
            return await this.rConnection.invoke("SendMessage", message);
        } catch (data) {
            alert('cannot connect to the server');
        }
    }
}

const SignalRService = new SignalRController();
export default SignalRService;