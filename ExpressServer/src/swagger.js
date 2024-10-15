// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API cho cơ sở dữ liệu Sakila',
      version: '1.0.0',
      description: 'API cho quản lý danh mục phim sử dụng cơ sở dữ liệu Sakila.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Thay đổi URL theo môi trường của bạn
      },
    ],
    components: {
      schemas: {
        Film: {
          type: 'object',
          properties: {
            film_id: {
              type: 'integer',
              example: 1,
            },
            title: {
              type: 'string',
              example: 'Inception',
            },
            description: {
              type: 'string',
              example: 'A mind-bending thriller',
            },
            release_year: {
              type: 'integer',
              example: 2010,
            },
            language_id: {
              type: 'integer',
              example: 1,
            },
            original_language_id: {
              type: 'integer',
              example: 1,
            },
            rental_duration: {
              type: 'integer',
              example: 5,
            },
            rental_rate: {
              type: 'number',
              format: 'float',
              example: 4.99,
            },
            length: {
              type: 'integer',
              example: 148,
            },
            replacement_cost: {
              type: 'number',
              format: 'float',
              example: 20.00,
            },
            rating: {
              type: 'string',
              example: 'PG-13',
            },
            special_features: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['Trailers', 'Commentaries'],
            },
          },
        },
        FilmInput: {
          type: 'object',
          required: [
            'title',
            'description',
            'release_year',
            'language_id',
            'rental_duration',
            'rental_rate',
            'length',
            'replacement_cost',
            'rating',
          ],
          properties: {
            title: {
              type: 'string',
              example: 'Inception',
            },
            description: {
              type: 'string',
              example: 'A mind-bending thriller',
            },
            release_year: {
              type: 'integer',
              example: 2010,
            },
            language_id: {
              type: 'integer',
              example: 1,
            },
            original_language_id: {
              type: 'integer',
              example: 1,
            },
            rental_duration: {
              type: 'integer',
              example: 5,
            },
            rental_rate: {
              type: 'number',
              format: 'float',
              example: 4.99,
            },
            length: {
              type: 'integer',
              example: 148,
            },
            replacement_cost: {
              type: 'number',
              format: 'float',
              example: 20.00,
            },
            rating: {
              type: 'string',
              example: 'PG-13',
            },
            special_features: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['Trailers', 'Commentaries'],
            },
          },
        },
        // Định nghĩa thêm các schema khác nếu cần
        Actor: {
          type: 'object',
          required: [
            'actor_id',
            'first_name',
            'last_name',
            'last_update'
          ],
          properties: {
            actor_id: {
              type: 'integer',
            },
            first_name: {
              type: 'string',
              description: 'Actor\'s first name'
            },
            last_name: {
              type: 'string',
              description: 'Actor\'s last name'
            },
            last_update: {
              type: 'string',
              format: 'date-time',
              description: 'Update time'
            }
          },
        },
        Category: {
          type: 'object',
          required: [
            'category_id',
            'name',
            'last_update'
          ],
          properties: {
            actor_id: {
              type: 'integer',
            },
            name: {
              type: 'string'
            },
            last_update: {
              type: 'string',
              format: 'date-time',
              description: 'Update time'
            }
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.route.js'], // Đường dẫn tới các tệp chứa chú thích Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
