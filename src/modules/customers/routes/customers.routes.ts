import { Router } from "express";
import CustomersController from "../controllers/CustomersController";
import { celebrate, Joi, Segments } from 'celebrate';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.get('/',customersController.index);

customersRouter.get(
    '/:id',
    celebrate({ // Middleware para validação de Parâmetros.
        [Segments.PARAMS]: {// Validação que verifica se o parâmetro ID é uma String do tipo uuid.
            id: Joi.string().uuid().required(),
        }
    }), 
    customersController.show
);

customersRouter.post(
    '/',
    celebrate({ // Validação de dados que serão passado no BODY.Para criação de dados.
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
    }),
    customersController.create
);

customersRouter.put(
    '/:id',
    celebrate({ // Validação de dados que serão passado no BODY.Para criação de dados.
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {// Validação que verifica se o parâmetro ID é uma String do tipo uuid.
            id: Joi.string().uuid().required(),
        },
    }),
    customersController.update
);

customersRouter.delete(
    '/:id',
    celebrate({ // Middleware para validação de Parâmetros.
        [Segments.PARAMS]: {// Validação que verifica se o parâmetro ID é uma String do tipo uuid.
            id: Joi.string().uuid().required(),
        }
    }),  
    customersController.delete
);

export default customersRouter;