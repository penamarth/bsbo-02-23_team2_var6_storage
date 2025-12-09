import type { WarehouseId } from "@/shared";

export class StockReportQuery {
    constructor(
        public readonly warehouseId: WarehouseId,
        public readonly date: Date
    ) {}
}

