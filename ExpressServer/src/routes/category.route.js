import express from 'express';
import { readFile } from 'fs/promises';
import categoryModel from '../models/category.model.js';
import categorySchema from '../validation/category.schema.js';

const schema = JSON.parse(await readFile(new URL('../schemas/category.json', import.meta.url)));
const router = express.Router();

const STATUS_SUCCESS = 0;
const STATUS_ERROR = -1;

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Category]
 *     summary: Retrieve all categories.
 *     description: Return a list of all categories
 *     responses:
 *       '200':
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Category'
 *       '404':
 *        description: Not Found 
 *       '500':
 *        description: Internal Server Error
 */
router.get('/', async function (req, res) {
  const list = await categoryModel.findAll();
  res.json(list);
})


/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Category's id
 *     summary: Find a category by ID.
 *     description: Retrieve a single category.
 *     responses:
 *       '200':
 *        description: Successful Operation
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Category'
 *       '204':
 *        description: No Content
 *       '400':
 *        description: Invalid ID supplied
 *       '404':
 *        description: Not Found
 *       '500':
 *        description: Internal Server Error
 */
router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const category = await categoryModel.findById(id);
  if (category === null) {
    return res.status(204).end();
  }

  res.json(category);
})


/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Category]
 *     summary: Create a new category.
 *     description: Add a category.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *     responses:
 *       '201':
 *        description: Successful Add a category
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *       '400':
 *        description: Invalid ID supplied
 *       '404':
 *        description:  Not Found
 *       '500':
 *        description: Internal Server Error
 */
router.post('/', async function (req, res) {
  let category = req.body;

  const validationResult = await categorySchema.safeParse({
    name: category
  })

  if (!validationResult.success) {
    return res.status(400).json({ error: "Failed to add category", message: validationResult.error.flatten().fieldErrors, status: STATUS_ERROR })
  }

  const ret = await categoryModel.add(category);
  category = {
    category_id: ret[0],
    ...category
  }
  res.status(201).json(category)
})


/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags:
 *        - Category
 *     summary: Delete a category by ID.
 *     description: Delete a single category from sakila database.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Category's id
 *     responses:
 *       '200':
 *        description: Successful Operation
 *       '400':
 *        description: Invalid ID supplied
 *       '404':
 *        description:  Not Found
 *       '500':
 *        description: Internal Server Error
 */
router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await categoryModel.del(id);
  res.json({
    affected: n
  });
})


/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     tags:
 *        - Category
 *     summary: Update a category by ID.
 *     description: Update one or many field in a single category.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *        description: Successful Operation, nunmbers of categories affected
 *       '400':
 *        description: Invalid ID supplied
 *       '404':
 *        description:  Not Found
 *       '500':
 *        description: Internal Server Error
 */
router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const category = req.body;

  const validationResult = await categorySchema.safeParse({
    name: category
  })

  if (!validationResult.success) {
    return res.status(400).json({ error: "Failed to update category", message: validationResult.error.flatten().fieldErrors, status: STATUS_ERROR })
  }

  const n = await categoryModel.patch(id, category);
  res.json({
    affected: n
  });
})

export default router;