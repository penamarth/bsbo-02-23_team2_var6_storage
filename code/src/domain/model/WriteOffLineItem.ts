import { InventoryBatch } from "./InventoryBatch";

export class WriteOffLineItem {
    constructor(
        private readonly batch: InventoryBatch,
        private readonly quantity: number,
        private readonly reason: string
    ) {
        if (quantity <= 0) {
            throw new Error("Quantity must be positive");
        }
        if (quantity > batch.getQuantity()) {
            throw new Error("Quantity cannot exceed batch quantity");
        }
    }

    getBatch(): InventoryBatch {
        return this.batch;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getReason(): string {
        return this.reason;
    }
}

