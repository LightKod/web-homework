const db = require('../database');

// Get all actors
exports.getAllActors = async (req, res) => {
    try {
        const results = await db('actor').select('*');
        res.json(results);
    } catch (err) {
        console.error('Error fetching actors:', err);
        return res.status(500).json({ error: 'Failed to retrieve actors' });
    }
};

// Get an actor by ID
exports.getActorById = async (req, res) => {
    const actorId = req.params.id;
    try {
        const result = await db('actor').where('actor_id', actorId).first();
        if (!result) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        res.json(result);
    } catch (err) {
        console.error('Error fetching actor:', err);
        return res.status(500).json({ error: 'Failed to retrieve actor' });
    }
};

// Add a new actor
exports.addActor = async (req, res) => {
    const { first_name, last_name } = req.body;
    try {
        const [actorId] = await db('actor').insert({ first_name, last_name }); // Insert and get the inserted ID
        res.status(201).json({ message: 'Actor added', actorId });
    } catch (err) {
        console.error('Error adding actor:', err);
        return res.status(500).json({ error: 'Failed to add actor' });
    }
};

// Delete an actor
exports.deleteActor = async (req, res) => {
    const actorId = req.params.id;
    try {
        //await db('film_actor').where('actor_id', actorId).del(); //Kinda dangerous

        const deletedCount = await db('actor').where('actor_id', actorId).del();
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        res.json({ message: 'Actor deleted' });
    } catch (err) {
        console.error('Error deleting actor:', err);
        return res.status(500).json({ error: 'Failed to delete actor' });
    }
};

// Update an actor
exports.updateActor = async (req, res) => {
    const actorId = req.params.id;
    const { first_name, last_name } = req.body;
    try {
        const updatedCount = await db('actor').where('actor_id', actorId).update({ first_name, last_name });
        if (updatedCount === 0) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        res.json({ message: 'Actor updated' });
    } catch (err) {
        console.error('Error updating actor:', err);
        return res.status(500).json({ error: 'Failed to update actor' });
    }
};
