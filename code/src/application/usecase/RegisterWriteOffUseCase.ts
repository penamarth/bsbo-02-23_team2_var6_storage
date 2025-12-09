import { WriteOffCommand } from "../dto/WriteOffCommand";
import { Result, WriteOffStatus } from "@/shared";
import { WriteOffId } from "@/domain/valueobject/WriteOffId";
import type { WriteOffRepository } from "@/domain/repository/WriteOffRepository";
import type { InventoryService } from "@/domain/service/InventoryService";
import { MovementService } from "@/domain/service/MovementService";
import { WriteOffDocument } from "@/domain/model/WriteOffDocument";
import { WriteOffLineItem } from "@/domain/model/WriteOffLineItem";
import { InventoryBatch } from "@/domain/model/InventoryBatch";
import { BatchId } from "@/domain/valueobject/BatchId";
import { ProductId } from "@/domain/valueobject/ProductId";
import { LocationId } from "@/domain/valueobject/LocationId";

export class RegisterWriteOffUseCase {
    constructor(
        private readonly writeOffRepository: WriteOffRepository,
        private readonly inventoryService: InventoryService,
        private readonly movementService: MovementService
    ) {}

    execute(command: WriteOffCommand): Result<WriteOffId> {
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

            const writeOffId = this.writeOffRepository.nextIdentity();
            const writeOff = new WriteOffDocument(
                writeOffId,
                new Date(),
                command.reason,
                command.responsiblePerson,
                WriteOffStatus.DRAFT
            );

            // Create line items from command items
            // Note: In real implementation, we would need to fetch InventoryBatch from repository
            for (const item of command.items) {
                // This is a simplified version - in real implementation, fetch batch from repository
                const batch = new InventoryBatch(
                    item.batchId,
                    item.productId,
                    item.quantity,
                    new Date(),
                    new Date(),
                    "unknown"
                );
                const lineItem = new WriteOffLineItem(batch, item.quantity, item.reason);
                writeOff.addItem(lineItem);
            }

            writeOff.approve();
            this.writeOffRepository.save(writeOff);

            // Record movements
            for (const item of command.items) {
                // LocationId would need to be determined from batch location
                const locationId = new LocationId("default-location");
                this.movementService.recordWriteOffMovement(
                    item.productId,
                    item.quantity,
                    locationId
                );
            }

            return Result.success(writeOffId);
        } catch (error) {
            return Result.error(error instanceof Error ? error : new Error(String(error)));
        }
    }
}

