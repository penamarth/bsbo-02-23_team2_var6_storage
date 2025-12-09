import { ProductCode } from "../valueobject/ProductCode";
import { Product } from "../model/Product";
import type { Optional } from "@/shared";

export interface ProductRepository {
    findById(id: ProductCode): Optional<Product>;
    save(product: Product): void;
}

