import { ProductCode } from "../valueobject/ProductCode";

export class LowStockAlertEvent {
    constructor(
        public readonly productId: ProductCode,
        public readonly currentStock: number,
        public readonly minLevel: number
    ) {}
}

