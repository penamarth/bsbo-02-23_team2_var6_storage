import { ProductCode } from "@/domain/valueobject/ProductCode";
import { StockStatus } from "@/shared";

export class StockReportItem {
    constructor(
        public readonly productId: ProductCode,
        public readonly sku: string,
        public readonly name: string,
        public readonly currentStock: number,
        public readonly status: StockStatus
    ) {}
}

