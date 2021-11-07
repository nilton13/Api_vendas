import { Router } from "express";
import ProductsController from "../controllers/ProductsController";
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/',productsController.index);

productsRouter.get(
    '/:id',
    celebrate({ // Middleware para validação de Parâmetros.
        [Segments.PARAMS]: {// Validação que verifica se o parâmetro ID é uma String do tipo uuid.
            id: Joi.string().uuid().required(),
        }
    }), 
    productsController.show
);

productsRouter.post(
    '/',
    celebrate({ // Validação de dados que serão passado no BODY.Para criação de dados.
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quatity: Joi.number().required()
        },
    }),
    productsController.create
);

productsRouter.put(
    '/:id',
    celebrate({ // Validação de dados que serão passado no BODY.Para criação de dados.
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quatity: Joi.number().required()
        },
        [Segments.PARAMS]: {// Validação que verifica se o parâmetro ID é uma String do tipo uuid.
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.update
);

productsRouter.delete(
    '/:id',
    celebrate({ // Middleware para validação de Parâmetros.
        [Segments.PARAMS]: {// Validação que verifica se o parâmetro ID é uma String do tipo uuid.
            id: Joi.string().uuid().required(),
        }
    }),  
    productsController.delete
);

export default productsRouter;