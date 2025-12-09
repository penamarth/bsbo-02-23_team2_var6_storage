import { ProductCode } from "@/domain/valueobject/ProductCode";
import { BatchId } from "@/domain/valueobject/BatchId";

export class ShipmentItem {
    constructor(
        public readonly productId: ProductCode,
        public readonly batchId: BatchId,
        public readonly quantity: number
    ) {
        if (quantity <= 0) {
            throw new Error("Quantity must be positive");
        }
    }
}

