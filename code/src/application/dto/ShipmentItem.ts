import { ProductId } from "@/domain/valueobject/ProductId";
import { BatchId } from "@/domain/valueobject/BatchId";

export class ShipmentItem {
    constructor(
        public readonly productId: ProductId,
        public readonly batchId: BatchId,
        public readonly quantity: number
    ) {
        if (quantity <= 0) {
            throw new Error("Quantity must be positive");
        }
    }
}

