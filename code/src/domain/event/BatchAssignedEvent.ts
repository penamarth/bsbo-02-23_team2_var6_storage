import { BatchId } from "../valueobject/BatchId";
import { LocationId } from "../valueobject/LocationId";
import { ProductId } from "../valueobject/ProductId";

export class BatchAssignedEvent {
    constructor(
        public readonly batchId: BatchId,
        public readonly locationId: LocationId,
        public readonly productId: ProductId
    ) {}
}

