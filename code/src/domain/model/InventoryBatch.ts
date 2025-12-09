import { BatchId } from "../valueobject/BatchId";
import { ProductId } from "../valueobject/ProductId";

export class InventoryBatch {
    constructor(
        private readonly id: BatchId,
        private readonly productId: ProductId,
        private quantity: number,
        private readonly receivedAt: Date,
        private readonly expiresAt: Date,
        private readonly supplier: string
    ) {
        if (quantity <= 0) {
            throw new Error("Quantity must be positive");
        }
    }

    getId(): BatchId {
        return this.id;
    }

    getProductId(): ProductId {
        return this.productId;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getReceivedAt(): Date {
        return this.receivedAt;
    }

    getExpiresAt(): Date {
        return this.expiresAt;
    }

    getSupplier(): string {
        return this.supplier;
    }

    isExpired(now: Date): boolean {
        return now > this.expiresAt;
    }

    split(quantity: number): InventoryBatch {
        if (quantity >= this.quantity) {
            throw new Error("Split quantity must be less than current quantity");
        }
        this.quantity -= quantity;
        return new InventoryBatch(
            new BatchId(`${this.id.getValue()}-split`),
            this.productId,
            quantity,
            this.receivedAt,
            this.expiresAt,
            this.supplier
        );
    }
}

