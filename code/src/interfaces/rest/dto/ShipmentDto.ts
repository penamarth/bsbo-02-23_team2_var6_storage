import { ShipmentCommand } from "@/application/dto/ShipmentCommand";
import { ShipmentItem } from "@/application/dto/ShipmentItem";
import { ProductCode } from "@/domain/valueobject/ProductCode";
import { BatchId } from "@/domain/valueobject/BatchId";

export class ShipmentDto {
    constructor(
        public readonly customer: string,
        public readonly items: Array<{
            productId: string;
            batchId: string;
            quantity: number;
        }>
    ) {}

    toCommand(): ShipmentCommand {
        return new ShipmentCommand(
            this.customer,
            this.items.map(item => new ShipmentItem(
                new ProductCode(item.productId),
                new BatchId(item.batchId),
                item.quantity
            ))
        );
    }
}

