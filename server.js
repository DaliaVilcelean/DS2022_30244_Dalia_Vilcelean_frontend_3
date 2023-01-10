const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "chat.proto";
const SERVER_URI = "0.0.0.0:8080";

const usersInChat = [];
const observers = [];

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);


const join = (call, callback) => {
  const user = call.request;

  
  const userExiist = usersInChat.find((_user) => _user.name == user.name);
  if (!userExiist) {
    usersInChat.push(user);
    callback(null, {
      error: 0,
      msg: "Success",
    });
  } else {
    callback(null, { error: 1, msg: "user already exist." });
  }
};

const sendMsg = (call, callback) => {
  const chatObj = call.request;
  observers.forEach((observer) => {
    observer.call.write(chatObj);
  });
 

  callback(null, {});
};

const getAllUsers = (call, callback) => {
  callback(null, { users: usersInChat });
};

const receiveMsg = (call, callback) => {
  observers.push({
    call,
  });
};

const server = new grpc.Server();

server.addService(protoDescriptor.ChatService.service, {
  join,
  sendMsg,
  getAllUsers,
  receiveMsg,
});

server.bindAsync(SERVER_URI,
     grpc.ServerCredentials.createInsecure(),
     (err, result) => !err ? server.start() : logger.error(err));


console.log("Server is running!");