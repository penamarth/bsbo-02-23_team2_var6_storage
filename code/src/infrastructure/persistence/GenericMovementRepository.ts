import type { MovementRepository, StockMovement } from "@/domain/repository/MovementRepository";
import { ProductId } from "@/domain/valueobject/ProductId";
import { DateRange } from "@/shared";
import { MovementRecordedEvent } from "@/domain/event/MovementRecordedEvent";

export class GenericMovementRepository implements MovementRepository {
    private movements: StockMovement[] = [];

    record(movement: StockMovement): void {
        this.movements.push(movement);
    }

    getHistory(productId: ProductId, period: DateRange): MovementRecordedEvent[] {
        return this.movements
            .filter(m => 
                m.productId.equals(productId) &&
                m.timestamp >= period.startDate &&
                m.timestamp <= period.endDate
            )
            .map(m => new MovementRecordedEvent(
                m.id,
                m.type,
                m.productId,
                m.quantity,
                m.timestamp
            ));
    }
}

