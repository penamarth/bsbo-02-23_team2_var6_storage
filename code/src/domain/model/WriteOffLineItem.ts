import { ProductCode } from "../valueobject/ProductCode";

export class WriteOffLineItem {
    constructor(
        private readonly productId: ProductCode,
        private readonly quantity: number,
        private readonly batchNumber: string,
        private readonly reason: string
    ) {
        if (quantity <= 0) {
            throw new Error("Quantity must be positive");
        }
    }

    getProductId(): ProductCode {
        return this.productId;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getBatchNumber(): string {
        return this.batchNumber;
    }

    getReason(): string {
        return this.reason;
    }
}

