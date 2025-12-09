import { ProductId } from "@/domain/valueobject/ProductId";
import { BatchId } from "@/domain/valueobject/BatchId";

export class WriteOffItem {
    constructor(
        public readonly productId: ProductId,
        public readonly batchId: BatchId,
        public readonly quantity: number,
        public readonly reason: string
    ) {
        if (quantity <= 0) {
            throw new Error("Quantity must be positive");
        }
        if (!reason || reason.trim().length === 0) {
            throw new Error("Reason is required");
        }
    }
}

