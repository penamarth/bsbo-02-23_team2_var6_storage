import { ReceiptCommand } from "../dto/ReceiptCommand";
import type { ReceiptId } from "@/shared";
import { Result } from "@/shared";
import type { ReceiptRepository } from "@/domain/repository/ReceiptRepository";
import { LocationAssignmentContext } from "@/domain/service/LocationAssignmentContext";
import { MovementService } from "@/domain/service/MovementService";
import type { OutboxService } from "./OutboxService";
import { Receipt } from "@/domain/model/Receipt";
import type { ProductRepository } from "@/domain/repository/ProductRepository";
import { ProductDimensions } from "@/domain/valueobject/ProductDimensions";

export class RegisterGoodsReceiptUseCase {
    constructor(
        private readonly receiptRepository: ReceiptRepository,
        private readonly locationService: LocationAssignmentContext,
        private readonly movementService: MovementService,
        private readonly outbox: OutboxService,
        private readonly productRepository: ProductRepository
    ) {}

    execute(command: ReceiptCommand): Result<ReceiptId> {
        try {
            const validationResult = command.validate();
            if (!validationResult.isValid()) {
                return Result.error(new Error(validationResult.getErrors().join(", ")));
            }

            const receiptId = this.receiptRepository.nextIdentity();
            const receipt = new Receipt(receiptId, command.supplier, command.items);
            
            // Process items and assign locations
            for (const item of command.items) {
                // Get product to retrieve dimensions
                const product = this.productRepository.findById(item.productId);
                if (!product) {
                    return Result.error(new Error(`Product not found: ${item.productId.getValue()}`));
                }
                
                // Find optimal location for each item
                const dimensions = product.getDimensions();
                const locationId = this.locationService.executeStrategy(
                    dimensions,
                    item.quantity
                );
                
                // Record movement
                this.movementService.recordReceiptMovement(
                    item.productId,
                    item.quantity,
                    locationId
                );
            }

            this.receiptRepository.save(receipt);
            this.outbox.add(receiptId);

            return Result.success(receiptId);
        } catch (error) {
            return Result.error(error instanceof Error ? error : new Error(String(error)));
        }
    }
}

