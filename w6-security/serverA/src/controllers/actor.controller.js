const db = require('../database');

// Define status constants
const STATUS_SUCCESS = 0;
const STATUS_ERROR = -1;

// Get all actors
module.exports.getAllActors = async (req, res) => {
    try {
        const results = await db('actor').select('*');
        const status = results.length > 0 ? STATUS_SUCCESS : STATUS_ERROR;
        res.json({ results, status, message: "" });
    } catch (err) {
        // console.error('Error fetching actors:', err);
        return res.status(500).json({ error: 'Failed to retrieve actors', status: STATUS_ERROR });
    }
}

// Get an actor by ID
module.exports.getActorById = async (req, res) => {
    const actorId = req.params.id;
    try {
        const result = await db('actor').where('actor_id', actorId).first();
        const status = result ? STATUS_SUCCESS : STATUS_ERROR;
        const msg = result ? "" : "No actor found";
        res.json({ result, status, message: msg });
    } catch (err) {
        console.error('Error fetching actor:', err);
        return res.status(500).json({ error: 'Failed to retrieve actor', status: STATUS_ERROR });
    }
}

// Add a new actor
module.exports.addActor = async (req, res) => {
    const { first_name, last_name } = req.body;
    try {
        const [actorId] = await db('actor').insert({ first_name, last_name });
        res.status(201).json({ message: 'Actor added', actorId, status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error adding actor:', err);
        return res.status(500).json({ error: 'Failed to add actor', status: STATUS_ERROR });
    }
}

// Delete an actor
module.exports.deleteActor = async (req, res) => {
    const actorId = req.params.id;
    try {
        await db('film_actor').where('actor_id', actorId).del();
        const deletedCount = await db('actor').where('actor_id', actorId).del();
        if (deletedCount === 0) {
            return res.status(200).json({ message: 'Actor not found', status: STATUS_ERROR });
        }
        res.json({ message: 'Actor deleted', status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error deleting actor:', err);
        return res.status(500).json({ error: 'Failed to delete actor', status: STATUS_ERROR });
    }
}

// Update an actor
module.exports.updateActor = async (req, res) => {
    const actorId = req.params.id;
    const { first_name, last_name } = req.body;
    try {
        const updatedCount = await db('actor').where('actor_id', actorId).update({ first_name, last_name });
        if (updatedCount === 0) {
            return res.status(200).json({ message: 'Actor not found', status: STATUS_ERROR });
        }
        res.json({ message: 'Actor updated', status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error updating actor:', err);
        return res.status(500).json({ error: 'Failed to update actor', status: STATUS_ERROR });
    }
}
