import { ProductId } from "../valueobject/ProductId";
import { Product } from "../model/Product";
import type { Optional } from "@/shared";

export interface ProductRepository {
    findById(id: ProductId): Optional<Product>;
    save(product: Product): void;
}

