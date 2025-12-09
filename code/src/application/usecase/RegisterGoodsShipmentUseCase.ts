import { ShipmentCommand } from "../dto/ShipmentCommand";
import type { ShipmentId } from "@/shared";
import { Result } from "@/shared";
import type { ShipmentRepository } from "@/domain/repository/ShipmentRepository";
import type { InventoryService } from "@/domain/service/InventoryService";
import { MovementService } from "@/domain/service/MovementService";
import { Shipment } from "@/domain/model/Shipment";
import { LocationCoordinates } from "@/domain/valueobject/LocationCoordinates";

export class RegisterGoodsShipmentUseCase {
    constructor(
        private readonly shipmentRepository: ShipmentRepository,
        private readonly inventoryService: InventoryService,
        private readonly movementService: MovementService
    ) {}

    execute(command: ShipmentCommand): Result<ShipmentId> {
        try {
            const validationResult = command.validate();
            if (!validationResult.isValid()) {
                return Result.error(new Error(validationResult.getErrors().join(", ")));
            }

            // Check stock availability
            for (const item of command.items) {
                const currentStock = this.inventoryService.getCurrentStock(item.productId);
                if (currentStock < item.quantity) {
                    return Result.error(new Error(`Insufficient stock for product ${item.productId.getValue()}`));
                }
            }

            const shipmentId = this.shipmentRepository.nextIdentity();
            const shipment = new Shipment(shipmentId, command.customer, command.items);

            // Record movements
            for (const item of command.items) {
                // Coordinates would need to be determined from batch location
                // For now, using a placeholder
                const coordinates = new LocationCoordinates("A", "R1", "S1", 1);
                this.movementService.recordShipmentMovement(
                    item.productId,
                    item.quantity,
                    coordinates
                );
            }

            this.shipmentRepository.save(shipment);

            return Result.success(shipmentId);
        } catch (error) {
            return Result.error(error instanceof Error ? error : new Error(String(error)));
        }
    }
}

