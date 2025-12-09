import type { InventoryService } from "@/domain/service/InventoryService";
import { ProductId } from "@/domain/valueobject/ProductId";
import { LowStockAlertEvent } from "@/domain/event/LowStockAlertEvent";

export class SimpleInventoryService implements InventoryService {
    private stock: Map<string, number> = new Map();

    getCurrentStock(productId: ProductId): number {
        return this.stock.get(productId.getValue()) || 0;
    }

    setStock(productId: ProductId, quantity: number): void {
        this.stock.set(productId.getValue(), quantity);
    }

    checkStockLevels(): LowStockAlertEvent[] {
        // Simplified implementation - in real scenario would check against product min stock levels
        return [];
    }
}

