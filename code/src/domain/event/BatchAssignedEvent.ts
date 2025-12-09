import { BatchId } from "../valueobject/BatchId";
import { LocationId } from "../valueobject/LocationId";
import { ProductCode } from "../valueobject/ProductCode";

export class BatchAssignedEvent {
    constructor(
        public readonly batchId: BatchId,
        public readonly locationId: LocationId,
        public readonly productId: ProductCode
    ) {}
}

