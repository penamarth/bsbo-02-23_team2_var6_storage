import { Product } from "@/core/Product";
import { ProductBatch } from "@/core/ProductBatch";

export class ShipmentItem {
    private product: Product;
    private quantity: number;
    private batch: ProductBatch;
    private unitPrice: number;

    constructor(
        product: Product,
        quantity: number,
        batch: ProductBatch,
        unitPrice: number
    ) {
        this.product = product;
        this.quantity = quantity;
        this.batch = batch;
        this.unitPrice = unitPrice;
    }

    calculateTotal(): number {
        console.log(
            `Расчет итога для позиции отгрузки: товар ${this.product.getId()}`
        );
        return this.quantity * this.unitPrice;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getBatch(): ProductBatch {
        return this.batch;
    }

    getUnitPrice(): number {
        return this.unitPrice;
    }
}
