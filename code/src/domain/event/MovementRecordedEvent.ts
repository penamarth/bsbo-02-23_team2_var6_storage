import { MovementId, MovementType } from "@/shared";
import { ProductId } from "../valueobject/ProductId";

export class MovementRecordedEvent {
    constructor(
        public readonly movementId: MovementId,
        public readonly type: MovementType,
        public readonly productId: ProductId,
        public readonly quantity: number,
        public readonly timestamp: Date
    ) {}
}

