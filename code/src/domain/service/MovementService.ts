import { ProductId } from "../valueobject/ProductId";
import { LocationId } from "../valueobject/LocationId";
import { MovementId, DateRange, MovementType } from "@/shared";
import type { MovementRepository } from "../repository/MovementRepository";
import { MovementRecordedEvent } from "../event/MovementRecordedEvent";
import type { EventPublisher } from "./EventPublisher";

export class MovementService {
    constructor(
        private readonly movementRepository: MovementRepository,
        private readonly eventPublisher: EventPublisher
    ) {}

    recordReceiptMovement(productId: ProductId, quantity: number, locationId: LocationId): MovementId {
        const movementId = new MovementId(`receipt-${Date.now()}`);
        const movement = {
            id: movementId,
            type: MovementType.RECEIPT,
            productId,
            quantity,
            locationId,
            timestamp: new Date()
        };
        this.movementRepository.record(movement);
        
        const event = new MovementRecordedEvent(movementId, MovementType.RECEIPT, productId, quantity, new Date());
        this.eventPublisher.publish(event);
        
        return movementId;
    }

    recordShipmentMovement(productId: ProductId, quantity: number, locationId: LocationId): MovementId {
        const movementId = new MovementId(`shipment-${Date.now()}`);
        const movement = {
            id: movementId,
            type: MovementType.SHIPMENT,
            productId,
            quantity,
            locationId,
            timestamp: new Date()
        };
        this.movementRepository.record(movement);
        
        const event = new MovementRecordedEvent(movementId, MovementType.SHIPMENT, productId, quantity, new Date());
        this.eventPublisher.publish(event);
        
        return movementId;
    }

    recordWriteOffMovement(productId: ProductId, quantity: number, locationId: LocationId): MovementId {
        const movementId = new MovementId(`writeoff-${Date.now()}`);
        const movement = {
            id: movementId,
            type: MovementType.WRITE_OFF,
            productId,
            quantity,
            locationId,
            timestamp: new Date()
        };
        this.movementRepository.record(movement);
        
        const event = new MovementRecordedEvent(movementId, MovementType.WRITE_OFF, productId, quantity, new Date());
        this.eventPublisher.publish(event);
        
        return movementId;
    }

    getMovementHistory(productId: ProductId, period: DateRange): MovementRecordedEvent[] {
        return this.movementRepository.getHistory(productId, period);
    }

    validateMovement(productId: ProductId, quantity: number, locationId: LocationId, type: MovementType): boolean {
        if (quantity <= 0) {
            return false;
        }
        // Additional validation logic can be added here
        return true;
    }
}

