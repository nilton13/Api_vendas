import 'reflect-metadata';
import  'dotenv/config'
import express, {  NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '../../errors/AppError';
import '../typeorm';   
import '../../../shared/container' 
import uploadConfig from '../../../config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);

app.use(errors());

//Middleware para tratamento de erros
app.use((error: Error, request: Request, response: Response, next: NextFunction) =>{
    if (error instanceof AppError){ // Verifica se o erro é uma intância da classe AppError.
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'    
    })
})

app.listen(8080, () =>{
    console.log("Server started on PORT 8080!")
})