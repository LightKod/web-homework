import client from '../../client.js'
import grpc from '@grpc/grpc-js'

// Define status constants
const STATUS_SUCCESS = 0;
const STATUS_ERROR = -1;

const grpcToHttpStatus = {
    [grpc.status.NOT_FOUND]: 404,
    [grpc.status.INTERNAL]: 500
}

export async function getAllActors(req, res) {
    client.getAll(null, (err, data) => {
        if (!err) {
            res.json({ results: data.actors, status: STATUS_SUCCESS, message: "" })
        } else {
            return res.status(grpcToHttpStatus[err.code]).json({ error: err.details , status: STATUS_ERROR });
        }
    })
}

export async function getActorById(req, res) {
    const actorId = req.params.id;
    client.get({ actor_id: actorId }, (err, data) => {
        if (!err) {
            res.json({ result: data, status: STATUS_SUCCESS, message: "" })
        } else {
            return res.status(grpcToHttpStatus[err.code]).json({ error: err.details , status: STATUS_ERROR });
        }
    })
}

export async function addActor(req, res) {
    const { first_name, last_name } = req.body;
    const newActor = {
        first_name,
        last_name
    }

    client.insert(newActor, (err, data) => {
        if (!err) {
            res.json({ result: data, status: STATUS_SUCCESS, message: "Actor added" })
        } else {
            return res.status(grpcToHttpStatus[err.code]).json({ error: err.details , status: STATUS_ERROR });
        }
    })
}

export async function deleteActor(req, res) {
    const actorId = req.params.id;
    client.remove({ actor_id: actorId }, (err, _) => {
        if (!err) {
            res.json({ status: STATUS_SUCCESS, message: "Actor deleted" })
        } else {
            return res.status(grpcToHttpStatus[err.code]).json({ error: err.details , status: STATUS_ERROR });
        }
    })
}

export async function updateActor(req, res) {
    const actorId = req.params.id;
    const { first_name, last_name } = req.body;

    const newActor = {
        actor_id: actorId,
        first_name,
        last_name
    }

    client.update(newActor, (err, data) => {
        if (!err) {
            res.json({ result: data, status: STATUS_SUCCESS, message: "Actor updated" })
        } else {
            return res.status(grpcToHttpStatus[err.code]).json({ error: err.details , status: STATUS_ERROR });
        }
    })
}