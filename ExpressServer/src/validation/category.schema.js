import { z } from "zod";

const categorySchema = z.object({
    name: z.string({
        invalid_type_error: "Category name must be string",
        required_error: "Category name is required"
    }).trim().max(25, {
        message: "Category name must be under 25 characters"
    }).min(1, {
        message: "Category name must have at least 1 character"
    })
})