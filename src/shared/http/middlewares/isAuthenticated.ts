import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import authConfig from "../../../config/auth";

interface ITokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

// Middleware para autenticação/proteção de rotas   
export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void{
    // Recuperando o token do Header da requisição
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError('JWT Token is missing.')
    }
    //Faz a separação dentro da estrutura do token da parte que será verificada!
    const [,token] = authHeader.split(' ');

    try {
        // Faz a verificação se o token recebido é igual ao secret da aplicação.
        const decodeToken = verify(token, authConfig.jwt.secret); 

        const { sub } = decodeToken as ITokenPayload;

        request.user = {
            id: sub,
        }

        return next();
    } catch {
        throw new AppError('Invalid JWT Token.');
    }
}