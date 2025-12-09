import { ProductCode } from "../valueobject/ProductCode";
import { ProductDimensions } from "../valueobject/ProductDimensions";
import { StockThresholds } from "../valueobject/StockThresholds";
import type { SKU, UnitOfMeasure } from "@/shared";

export class Product {
    constructor(
        private readonly id: ProductCode,
        private readonly sku: SKU,
        private readonly name: string,
        private readonly category: string,
        private readonly unit: UnitOfMeasure,
        private readonly dimensions: ProductDimensions,
        private readonly stockLevels: StockThresholds
    ) {}

    getId(): ProductCode {
        return this.id;
    }

    getSku(): SKU {
        return this.sku;
    }

    getName(): string {
        return this.name;
    }

    getCategory(): string {
        return this.category;
    }

    getUnit(): UnitOfMeasure {
        return this.unit;
    }

    getDimensions(): ProductDimensions {
        return this.dimensions;
    }

    getStockLevels(): StockThresholds {
        return this.stockLevels;
    }

    isBelowMinStock(currentQuantity: number): boolean {
        return currentQuantity < this.stockLevels.min;
    }
}

