import { Product } from "@/core/Product";
import { ProductBatch } from "@/core/ProductBatch";

export class WriteOffItem {
    private product: Product;
    private quantity: number;
    private batch: ProductBatch | null;
    private reason: string;

    constructor(
        product: Product,
        quantity: number,
        reason: string,
        batch: ProductBatch | null = null
    ) {
        this.product = product;
        this.quantity = quantity;
        this.reason = reason;
        this.batch = batch;
    }

    validateWriteOff(): boolean {
        return this.quantity > 0 && this.reason.length > 0;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getBatch(): ProductBatch | null {
        return this.batch;
    }

    getReason(): string {
        return this.reason;
    }
}
