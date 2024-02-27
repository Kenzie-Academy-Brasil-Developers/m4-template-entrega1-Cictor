import { IProduct, IProductService } from "./interfaces";

class ProductList implements IProductService {
    private productList: IProduct[] = [];
    id: number = 1;

    createProduct(data: { name: string; price: number; }): IProduct {
        const { name, price } = data;
        const newProduct: IProduct = {
            id: this.id,
            name,
            price,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        
        this.productList.push(newProduct);
        this.id++;

        return newProduct;
    }

    getProducts(): IProduct[] {
        return this.productList; 
    }

    getOneProduct(id: number): IProduct | undefined {
        return this.productList.find((product) => product.id === id);
    }

    updateProduct(id: number, data: { name?: string | undefined; price?: number | undefined; }): IProduct {
        const index = this.productList.findIndex((product) => product.id === id);

        if(index !== -1){
            const existingProduct = this.productList[index];

            const updatedProduct: IProduct = {
                id: existingProduct.id,
                name: data.name !== undefined ? data.name : existingProduct.name,
                price: data.price !== undefined ? data.price : existingProduct.price,
                createdAt: existingProduct.createdAt,
                updatedAt: new Date(),
            };

            this.productList[index] = updatedProduct;
            return updatedProduct;
        }else{
            throw new Error('Product not found');
        }
    }

    deleteProduct(id: number): { message: string; } {
        const index = this.productList.findIndex((product) => product.id === id);

        if(index !== -1) {
            this.productList.splice(index, 1);
            return { message: "Product successfully deleted."}
        }else{
            throw new Error('Product not found');
        }
    }
}

export const productList = new ProductList();