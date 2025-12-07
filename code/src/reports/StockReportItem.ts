import { Product } from "@/core/Product";
import { StockStatus } from "./StockStatus";

export class StockReportItem {
    private product: Product;
    private currentStock: number;
    private minLevel: number;
    private maxLevel: number;
    private status: StockStatus;

    constructor(
        product: Product,
        currentStock: number,
        minLevel: number,
        maxLevel: number
    ) {
        this.product = product;
        this.currentStock = currentStock;
        this.minLevel = minLevel;
        this.maxLevel = maxLevel;
        this.status = this.checkStatus();
    }

    checkStatus(): StockStatus {
        console.log(`Проверка статуса для товара ${this.product.getId()}`);
        if (this.currentStock === 0) {
            return StockStatus.OUT_OF_STOCK;
        }
        if (this.currentStock < this.minLevel) {
            return StockStatus.BELOW_MIN;
        }
        if (this.maxLevel > 0 && this.currentStock > this.maxLevel) {
            return StockStatus.ABOVE_MAX;
        }
        return StockStatus.NORMAL;
    }

    getProduct(): Product {
        return this.product;
    }

    getCurrentStock(): number {
        return this.currentStock;
    }

    getMinLevel(): number {
        return this.minLevel;
    }

    getMaxLevel(): number {
        return this.maxLevel;
    }

    getStatus(): StockStatus {
        return this.status;
    }
}
