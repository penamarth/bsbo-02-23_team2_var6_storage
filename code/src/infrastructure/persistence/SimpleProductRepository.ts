import type { ProductRepository } from "@/domain/repository/ProductRepository";
import { ProductCode } from "@/domain/valueobject/ProductCode";
import { Product } from "@/domain/model/Product";
import type { Optional } from "@/shared";

export class SimpleProductRepository implements ProductRepository {
    private products: Map<string, Product> = new Map();

    findById(id: ProductCode): Optional<Product> {
        return this.products.get(id.getValue());
    }

    save(product: Product): void {
        this.products.set(product.getId().getValue(), product);
    }
}

