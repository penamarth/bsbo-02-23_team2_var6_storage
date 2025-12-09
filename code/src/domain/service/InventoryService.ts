import { ProductId } from "../valueobject/ProductId";
import { LowStockAlertEvent } from "../event/LowStockAlertEvent";

export interface InventoryService {
    getCurrentStock(productId: ProductId): number;
    checkStockLevels(): LowStockAlertEvent[];
}

