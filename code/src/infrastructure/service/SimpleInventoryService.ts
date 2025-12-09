import type { InventoryService } from "@/domain/service/InventoryService";
import { ProductCode } from "@/domain/valueobject/ProductCode";
import { LowStockAlertEvent } from "@/domain/event/LowStockAlertEvent";

export class SimpleInventoryService implements InventoryService {
    private stock: Map<string, number> = new Map();

    getCurrentStock(productId: ProductCode): number {
        return this.stock.get(productId.getValue()) || 0;
    }

    setStock(productId: ProductCode, quantity: number): void {
        this.stock.set(productId.getValue(), quantity);
    }

    checkStockLevels(): LowStockAlertEvent[] {
        // Simplified implementation - in real scenario would check against product min stock levels
        return [];
    }
}

