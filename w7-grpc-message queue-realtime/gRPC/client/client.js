const PROTO_PATH = "./actors.proto";

import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const ActorService = grpc.loadPackageDefinition(packageDefinition).ActorService;
const client = new ActorService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

export default client