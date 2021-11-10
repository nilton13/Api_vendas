import { getCustomRepository } from "typeorm";
import path from "path";
import AppError from "../../../shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtheralMail from '../../../config/mail/EtheralMail';

interface IRequest {
    email: string;
}

//Serviço para Recuperação de senha
class SendForgotPasswordEmailService {
    public async execute({email}: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('User does not Exists.');
        }

        const { token } = await userTokenRepository.generate(user.id)

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

        await EtheralMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API Vendas] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                }
            }
        })
    }
}

export default SendForgotPasswordEmailService;