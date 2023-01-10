const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "chat.proto";
const SERVER_URI = "0.0.0.0:8080";

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const client = new protoDescriptor.ChatService(
  SERVER_URI,
  grpc.credentials.createInsecure()
);

client.join(
  {
    id: "80",
    name: "op",
  },
  (err, res) => {
    console.log(err, res);
    var cs = client.receiveMsg({
      user: "op",
    });
    cs.on("data", (data) => {
      console.log(data);
    });
  }
);