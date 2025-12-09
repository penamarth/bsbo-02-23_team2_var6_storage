import { ProductCode } from "@/domain/valueobject/ProductCode";

export class ReceiptItem {
    constructor(
        public readonly productId: ProductCode,
        public readonly quantity: number,
        public readonly batchNumber: string,
        public readonly expiryDate: Date,
        public readonly supplier: string,
        public readonly receivedAt: Date
    ) {
        if (quantity <= 0) {
            throw new Error("Quantity must be positive");
        }
    }
}

