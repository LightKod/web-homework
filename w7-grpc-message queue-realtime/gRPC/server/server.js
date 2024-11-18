const PROTO_PATH = "./actors.proto"

const grpc = require ('@grpc/grpc-js')
const protoLoader = require ('@grpc/proto-loader')

const db = require ('./database')

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

var actorsProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

server.addService(actorsProto.ActorService.service, {
    getAll: async (_, callback) => {
        try {
            const actors = await db('actor').select('*');
            callback(null, { actors });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: error.message
            });
        }
    },

    get: async (call, callback) => {
        try {
            const actor = await db('actor').where('actor_id', call.request.actor_id).first();

            if (actor) {
                callback(null, actor);
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                });
            }
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: error.message
            });
        }
    },

    insert: async (call, callback) => {
        try {
            let actor = call.request
            const [actorId] = await db('actor').insert({ first_name: actor.first_name, last_name: actor.last_name });
            
            actor.actor_id = actorId
            callback(null, actor)
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: error.message
            });
        }
    },

    update: async (call, callback) => {
        try {
            let actor = call.request
            const updatedCount = await db('actor').where('actor_id', actor.actor_id).update({ first_name: actor.first_name, last_name: actor.last_name });
            if (updatedCount === 0) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                });
            } else {
                callback(null, actor)
            }
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: error.message
            });
        }
    },

    remove: async (call, callback) => {
        try {
            await db('film_actor').where('actor_id', call.request.actor_id).del();
            const deletedCount = await db('actor').where('actor_id', call.request.actor_id).del();
            if (deletedCount === 0) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                });
            } else {
                callback(null, {})
            }
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: error.message
            });
        }
    }
})

server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error("Failed to bind server:", error);
        return;
    }
    console.log(`Server running at http://127.0.0.1:${port}`);
})