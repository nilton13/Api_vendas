import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest{
    id: string;
}


//Serviço para listagem de um Produto.
class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product | undefined> {
        const productsRepository = getCustomRepository(ProductRepository);
        //Recuperando um produto através do ID.
        const product = await productsRepository.findOne(id);

        if(!product){
            throw new AppError('Product not Found');
        }

        return product;
    }
}

export default ShowProductService;