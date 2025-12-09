import { ProductId } from "../valueobject/ProductId";

export class LowStockAlertEvent {
    constructor(
        public readonly productId: ProductId,
        public readonly currentStock: number,
        public readonly minLevel: number
    ) {}
}

