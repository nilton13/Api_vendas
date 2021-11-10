import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from "../controllers/OrdersController";

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.get(
    '/:id',
    celebrate({ // Middleware para validação de Parâmetros.
        [Segments.PARAMS]: {// Validação que verifica se o parâmetro ID é uma String do tipo uuid.
            id: Joi.string().uuid().required(),
        }
    }), 
    ordersController.show
);

ordersRouter.post(
    '/',
    celebrate({ // Validação de dados que serão passado no BODY.Para criação de dados.
        [Segments.BODY]: {
            customer_id: Joi.string().required(),
            products: Joi.required()
        },
    }),
    ordersController.create
);

export default ordersRouter;