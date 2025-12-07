import { Product } from "@/core/Product";
import { StorageLocation } from "@/core/StorageLocation";

export class ReceiptItem {
    private product: Product;
    private quantity: number;
    private batchNumber: string;
    private unitPrice: number;
    private storageLocation: StorageLocation;

    constructor(
        product: Product,
        quantity: number,
        batchNumber: string,
        unitPrice: number,
        storageLocation: StorageLocation
    ) {
        this.product = product;
        this.quantity = quantity;
        this.batchNumber = batchNumber;
        this.unitPrice = unitPrice;
        this.storageLocation = storageLocation;
    }

    calculateTotal(): number {
        console.log(
            `Расчет итога для позиции поступления: товар ${this.product.getId()}`
        );
        return this.quantity * this.unitPrice;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getBatchNumber(): string {
        return this.batchNumber;
    }

    getUnitPrice(): number {
        return this.unitPrice;
    }

    getStorageLocation(): StorageLocation {
        return this.storageLocation;
    }
}
