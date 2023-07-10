import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ProductInput } from "../dtos/inputs/ProductInput";
import { Product } from "../dtos/models/Product";
import { v4 as uuidv4 } from "uuid";

let products: Product[] = [];

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  createProduct(@Arg("input") input: ProductInput): Product {
    const newProduct: Product = {
      id: uuidv4(),
      ...input,
      createdAt: new Date(),
    };
    products.push(newProduct);
    return newProduct;
  }

  @Mutation(() => Product)
  updateProduct(
    @Arg("id") id: string,
    @Arg("input") input: ProductInput
  ): Product {
    const existingProduct = products.find((product) => product.id === id);
    if (!existingProduct) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    const updatedProduct = {
      ...existingProduct,
      ...input,
      createdAt: existingProduct.createdAt,
    };
    products = products.map((product) =>
      product.id === id ? updatedProduct : product
    );
    return updatedProduct;
  }

  @Mutation(() => String)
  deleteProduct(@Arg("id") id: string): string {
    const existingProductIndex = products.findIndex(
      (product) => product.id === id
    );
    if (existingProductIndex === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    const deletedProductId = products[existingProductIndex].id;
    products.splice(existingProductIndex, 1);
    return deletedProductId;
  }

  @Query(() => [Product])
  products(): Product[] {
    return products;
  }
}
