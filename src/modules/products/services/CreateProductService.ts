import { getCustomRepository } from "typeorm";
import RedisCache from "../../../shared/cache/RedisCache";
import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

//Serviço para criação de um novo Produto.
class CreateProductService {
    public async execute({name,price,quantity}: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        //Pesquisando no repositório se há algum produto com o mesmo nome do que será criado!
        const productExists = await productsRepository.findByName(name);

        if(productExists){ 
            // Utilizando a classe AppError criada anteriormente para tratamento de erros.
            throw new AppError('There is already one product with this name')
        }

        const redisCache = new RedisCache();

        //Preparando o objeto para salvar no repositório.
        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        //Invalidando o Cache para atualização dos produtos.
        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        //Salvando o objeto no repositório!
        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;