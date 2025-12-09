import { ProductId } from "@/domain/valueobject/ProductId";
import { StockStatus } from "@/shared";

export class StockReportItem {
    constructor(
        public readonly productId: ProductId,
        public readonly sku: string,
        public readonly name: string,
        public readonly currentStock: number,
        public readonly status: StockStatus
    ) {}
}

