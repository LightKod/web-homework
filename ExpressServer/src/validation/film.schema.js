import { z } from "zod";
import db from "../database.js"

const filmSchema = z.object({
    // title: varchar(255), non-nullable
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string"
    }).trim().min(1, {
        message: "Title cannot be empty"
    }).max(255, {
        message: "Title cannot exceeds 255 characters"
    }),

    // description: text, nullable
    description: z.string({
        invalid_type_error: "Description must be a string"
    }).nullish(),

    // release_year: year, nullable
    release_year: z.coerce.number({
        required_error: "Release year is required",
        invalid_type_error: "Release year must be a number"
    }).int({
        message: "Release year must be an integer"
    }).gte(1900, {
        message: "Release year must be between 1900 and 2100"
    }).lte(2100, {
        message: "Release year must be between 1900 and 2100"
    }).nullish(),

    // language_id: tinyint unsigned, non-nullable
    language_id: z.coerce.number({
        required_error: "Language ID is required",
        invalid_type_error: "Language ID must be a number"
    }).int({
        message: "Language ID must be an integer"
    }).positive({
        message: "Language ID must be a positive integer"
    }).lte(255, {
        message: "Invalid language ID"
    }),

    // original_language_id: tinyint unsigned, nullable
    original_language_id: z.coerce.number({
        invalid_type_error: "Original language ID must be a number"
    }).int({
        message: "Original language ID must be an integer"
    }).positive({
        message: "Original language ID must be a positive integer"
    }).lte(255, {
        message: "Invalid original language ID"
    }).nullish(),

    // rental_duration: tinyint unsigned, non-nullable
    rental_duration: z.coerce.number({
        required_error: "Rental duration is required",
        invalid_type_error: "Rental duration must be a number"
    }).int({
        message: "Rental duration must be an integer"
    }).positive({
        message: "Rental duration must be a positive integer"
    }).lte(255, {
        message: "Invalid rental duration"
    }),

    // rental_rate: decimal(4,2), non-nullable
    rental_rate: z.coerce.number({
        required_error: "Rental rate is required",
        invalid_type_error: "Rental rate must be a number"
    }).positive({
        message: "Rental rate must be positive"
    }).lt(10000, {
        message: "Rental rate must be lower than 10000"
    }),
    
    // length: smallint unsigned, nullable
    length: z.coerce.number({
        invalid_type_error: "Length must be a number"
    }).int({
        message: "Length must be an interger"
    }).positive({
        message: "Length must be positive"
    }).lt(65535, {
        message: "Length must be lower than 65535"
    }).nullish(),

    // replacement_cost: decimal(5,2), non-nullable
    replacement_cost: z.coerce.number({
        required_error: "Replacement cost is required",
        invalid_type_error: "Replacement cost must be a number"
    }).positive({
        message: "Replacement cost must be positive"
    }).lt(100000, {
        message: "Replacement cost must be lower than 100000"
    }),

    // rating: enum('G','PG','PG-13','R','NC-17'), nullable
    rating: z.enum(['G','PG','PG-13','R','NC-17'], {
        message: "Invalid rating type"
    }).nullish(),

    // special_features: set('Trailers','Commentaries','Deleted Scenes','Behind the Scenes'), nullable
    special_features: z.array(z.enum(['Trailers','Commentaries','Deleted Scenes','Behind the Scenes']))
}).refine(async (data) => {
    if(data.language_id === undefined || data.language_id === null) 
        return true
    const result = await db('language').where('language_id', data.language_id).first()
    return result ? true : false
}, {
    message: "Non-existed language id",
    path: ["language_id"]
}).refine(async (data) => {
    if(data.original_language_id === undefined || data.original_language_id === null) 
        return true
    const result = await db('language').where('language_id', data.original_language_id).first()
    return result ? true : false
}, {
    message: "Non-existed original language id",
    path: ["original_language_id"]
})

export default filmSchema