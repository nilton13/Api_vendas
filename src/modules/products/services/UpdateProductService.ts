import { getCustomRepository } from "typeorm";
import RedisCache from "../../../shared/cache/RedisCache";
import AppError from "../../../shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

// Dados sãoo esperados com parâmetros.
interface IRequest{
    id: string;
    name: string;
    price: number;
    quantity: number;
}


//Serviço para edição de um Produto.
class UpdateProductService {
    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        //Recuperando um produto através do ID.
        const product = await productsRepository.findOne(id);

        if(!product){
            throw new AppError('Product not Found');
        }

        // Utiliza a verificação para que o novo nome informado não seja igual ao nome de um produto ja existente.
        const productExists = await productsRepository.findByName(name);

        if(productExists && name != product.name){ 
            // Utilizando a classe AppError criada anteriormente para tratamento de erros.
            throw new AppError('There is already one product with this name')
        }
        
        const redisCache = new RedisCache();

        //Invalidando o Cache para atualização dos produtos.
        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        // Editando os campos.
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        // Salvando as alterações
        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;