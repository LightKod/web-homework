const db = require('../database');

// Define status constants
const STATUS_SUCCESS = 0;
const STATUS_ERROR = -1;

// Get all films
exports.getAllFilms = async (req, res) => {
    try {
        const results = await db('film').select('*');
        const status = results.length > 0 ? STATUS_SUCCESS : STATUS_ERROR;
        res.json({ results, status, message: "" });
    } catch (err) {
        console.error('Error fetching films:', err);
        return res.status(500).json({ error: 'Failed to retrieve films', status: STATUS_ERROR });
    }
}

// Get an film by ID
