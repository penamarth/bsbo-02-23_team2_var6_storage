import { ProductId } from "../valueobject/ProductId";
import { LocationId } from "../valueobject/LocationId";
import { DateRange, MovementId, MovementType } from "@/shared";
import { MovementRecordedEvent } from "../event/MovementRecordedEvent";

export interface StockMovement {
    id: MovementId;
    type: MovementType;
    productId: ProductId;
    quantity: number;
    locationId: LocationId;
    timestamp: Date;
}

export interface MovementRepository {
    record(movement: StockMovement): void;
    getHistory(productId: ProductId, period: DateRange): MovementRecordedEvent[];
}

