import { MovementId, MovementType } from "@/shared";
import { ProductCode } from "../valueobject/ProductCode";

export class MovementRecordedEvent {
    constructor(
        public readonly movementId: MovementId,
        public readonly type: MovementType,
        public readonly productId: ProductCode,
        public readonly quantity: number,
        public readonly timestamp: Date
    ) {}
}

