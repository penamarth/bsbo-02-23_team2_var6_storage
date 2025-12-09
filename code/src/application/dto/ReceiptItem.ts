import { ProductId } from "@/domain/valueobject/ProductId";

export class ReceiptItem {
    constructor(
        public readonly productId: ProductId,
        public readonly quantity: number,
        public readonly batchNumber: string,
        public readonly expiryDate: Date
    ) {
        if (quantity <= 0) {
            throw new Error("Quantity must be positive");
        }
    }
}

