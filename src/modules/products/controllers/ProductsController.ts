import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";

export default class ProductsController {
    //Método para listar todos os Produtos
    public async index(request: Request, response: Response): Promise<Response>{
        // Cria-se uma nova instancia do serviço de Listagem
        const listProducts = new ListProductService();

        // Execução do método execute que aqui não precisa de nenhum parâmetro.
        const products = await listProducts.execute();

        return response.json(products)
    }

    // Recuperar um Produto pelo ID.
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showProduct = new ShowProductService();

        // Execução do método execute passando como parâmetro o ID.
        const product = await showProduct.execute({ id });

        return response.json(product);
    }

    // Criação de Produtos
    public async create(request: Request, response: Response): Promise<Response> {
        const { name,price,quantity } = request.body;

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            name,
            price,
            quantity,
        });

        return response.json(product);
    }

    // Edição de produto
    public async update(request: Request, response: Response): Promise<Response> {
        const { name,price,quantity } = request.body;
        const {id} = request.params;

        const updateProduct = new UpdateProductService();

        const product = await updateProduct.execute({
            id,
            name,
            price,
            quantity
        });

        return response.json(product)
    }

    //Deletar um Produto
    public async delete(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;

        const deleteProduct = new DeleteProductService();

        await deleteProduct.execute({id});

        return response.json([]);
    }
}