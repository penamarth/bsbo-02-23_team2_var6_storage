import { ProductCode } from "../valueobject/ProductCode";
import { LocationCoordinates } from "../valueobject/LocationCoordinates";
import { DateRange, MovementId, MovementType } from "@/shared";
import { MovementRecordedEvent } from "../event/MovementRecordedEvent";

export interface StockMovement {
    id: MovementId;
    type: MovementType;
    productId: ProductCode;
    quantity: number;
    coordinates: LocationCoordinates;
    timestamp: Date;
}

export interface MovementRepository {
    record(movement: StockMovement): void;
    getHistory(productId: ProductCode, period: DateRange): MovementRecordedEvent[];
}

