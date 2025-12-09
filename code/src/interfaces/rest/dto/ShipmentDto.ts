import { ShipmentCommand } from "@/application/dto/ShipmentCommand";
import { ShipmentItem } from "@/application/dto/ShipmentItem";
import { ProductId } from "@/domain/valueobject/ProductId";
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
                new ProductId(item.productId),
                new BatchId(item.batchId),
                item.quantity
            ))
        );
    }
}

