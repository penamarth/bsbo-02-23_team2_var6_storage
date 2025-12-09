import { WriteOffCommand } from "../dto/WriteOffCommand";
import { Result, WriteOffStatus } from "@/shared";
import { WriteOffId } from "@/domain/valueobject/WriteOffId";
import type { WriteOffRepository } from "@/domain/repository/WriteOffRepository";
import type { InventoryService } from "@/domain/service/InventoryService";
import { MovementService } from "@/domain/service/MovementService";
import { WriteOffDocument } from "@/domain/model/WriteOffDocument";
import { WriteOffLineItem } from "@/domain/model/WriteOffLineItem";
import { ProductCode } from "@/domain/valueobject/ProductCode";
import { LocationCoordinates } from "@/domain/valueobject/LocationCoordinates";

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
            for (const item of command.items) {
                const lineItem = new WriteOffLineItem(
                    item.productId,
                    item.quantity,
                    item.batchId.getValue(),
                    item.reason
                );
                writeOff.addItem(lineItem);
            }

            writeOff.approve();
            this.writeOffRepository.save(writeOff);

            // Record movements
            for (const item of command.items) {
                // Coordinates would need to be determined from batch location
                const coordinates = new LocationCoordinates("A", "R1", "S1", 1);
                this.movementService.recordWriteOffMovement(
                    item.productId,
                    item.quantity,
                    coordinates
                );
            }

            return Result.success(writeOffId);
        } catch (error) {
            return Result.error(error instanceof Error ? error : new Error(String(error)));
        }
    }
}

