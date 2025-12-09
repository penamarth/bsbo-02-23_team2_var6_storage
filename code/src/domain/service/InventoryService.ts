import { ProductCode } from "../valueobject/ProductCode";
import { LowStockAlertEvent } from "../event/LowStockAlertEvent";

export interface InventoryService {
    getCurrentStock(productId: ProductCode): number;
    checkStockLevels(): LowStockAlertEvent[];
}

