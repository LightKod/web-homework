import db from '../database.js';
import filmSchema from '../validation/film.schema.js'

// Define status constants
const STATUS_SUCCESS = 0;
const STATUS_ERROR = -1;

// Get all films
export async function getAllFilms(req, res) {
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
export async function getFilmById(req, res) {
    const filmId = req.params.id;
    try {
        const result = await db('film').where('film_id', filmId).first();
        const status = result ? STATUS_SUCCESS : STATUS_ERROR;
        const msg = result ? "" : "No film found";
        res.json({ result, status, message: msg });
    } catch (err) {
        console.error('Error fetching film:', err);
        return res.status(500).json({ error: 'Failed to retrieve film', status: STATUS_ERROR });
    }
}

// Add a new film
export async function addFilm(req, res) {
    const { title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features } = req.body;
    try {
        const specialFeatures = special_features ? [... new Set(special_features.split(','))] : []

        const validationResult = await filmSchema.safeParseAsync({
            title,
            description,
            release_year,
            language_id,
            original_language_id,
            rental_duration,
            rental_rate,
            length,
            replacement_cost,
            rating,
            special_features: specialFeatures
        })

        if (!validationResult.success) {
            return res.status(400).json({ error: "Failed to add film", message: validationResult.error.flatten().fieldErrors, status: STATUS_ERROR })
        }

        const [filmId] = await db('film').insert({ title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features: specialFeatures.join(',') });
        res.status(201).json({ message: 'Film added', filmId, status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error adding film:', err);
        return res.status(500).json({ error: 'Failed to add film', status: STATUS_ERROR });
    }
}

// Delete an film
export async function deleteFilm(req, res) {
    const filmId = req.params.id;
    try {
        const deletedCount = await db('film').where('film_id', filmId).del();
        if (deletedCount === 0) {
            return res.status(200).json({ message: 'Film not found', status: STATUS_ERROR });
        }
        res.json({ message: 'Film deleted', status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error deleting film:', err);
        return res.status(500).json({ error: 'Failed to delete film', status: STATUS_ERROR });
    }
}

// Update an film
export async function updateFilm(req, res) {
    const filmId = req.params.id;
    const { title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features } = req.body;
    try {
        const specialFeatures = special_features ? [... new Set(special_features.split(','))] : []

        const validationResult = await filmSchema.safeParseAsync({
            title,
            description,
            release_year,
            language_id,
            original_language_id,
            rental_duration,
            rental_rate,
            length,
            replacement_cost,
            rating,
            special_features: specialFeatures
        })

        if (!validationResult.success) {
            return res.status(400).json({ error: "Failed to update film", message: validationResult.error.flatten().fieldErrors, status: STATUS_ERROR })
        }

        const updatedCount = await db('film').where('film_id', filmId).update({ title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features });
        if (updatedCount === 0) {
            return res.status(200).json({ message: 'Film not found', status: STATUS_ERROR });
        }
        res.json({ message: 'Film updated', status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error updating film:', err);
        return res.status(500).json({ error: 'Failed to update film', status: STATUS_ERROR });
    }
}
