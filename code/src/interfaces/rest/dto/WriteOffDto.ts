import { WriteOffCommand } from "@/application/dto/WriteOffCommand";
import { WriteOffItem } from "@/application/dto/WriteOffItem";
import { ProductId } from "@/domain/valueobject/ProductId";
import { BatchId } from "@/domain/valueobject/BatchId";

export class WriteOffDto {
    constructor(
        public readonly reason: string,
        public readonly responsiblePerson: string,
        public readonly items: Array<{
            productId: string;
            batchId: string;
            quantity: number;
            reason: string;
        }>
    ) {}

    toCommand(): WriteOffCommand {
        return new WriteOffCommand(
            this.reason,
            this.responsiblePerson,
            this.items.map(item => new WriteOffItem(
                new ProductId(item.productId),
                new BatchId(item.batchId),
                item.quantity,
                item.reason
            ))
        );
    }
}

