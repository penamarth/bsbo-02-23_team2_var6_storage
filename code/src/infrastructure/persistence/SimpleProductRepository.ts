import type { ProductRepository } from "@/domain/repository/ProductRepository";
import { ProductId } from "@/domain/valueobject/ProductId";
import { Product } from "@/domain/model/Product";
import type { Optional } from "@/shared";

export class SimpleProductRepository implements ProductRepository {
    private products: Map<string, Product> = new Map();

    findById(id: ProductId): Optional<Product> {
        return this.products.get(id.getValue());
    }

    save(product: Product): void {
        this.products.set(product.getId().getValue(), product);
    }
}

