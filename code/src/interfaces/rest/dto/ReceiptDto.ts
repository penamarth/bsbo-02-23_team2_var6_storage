import { ReceiptCommand } from "@/application/dto/ReceiptCommand";
import { ReceiptItem } from "@/application/dto/ReceiptItem";
import { ProductId } from "@/domain/valueobject/ProductId";

export class ReceiptDto {
    constructor(
        public readonly supplier: string,
        public readonly items: Array<{
            productId: string;
            quantity: number;
            batchNumber: string;
            expiryDate: string;
        }>
    ) {}

    toCommand(): ReceiptCommand {
        return new ReceiptCommand(
            this.supplier,
            this.items.map(item => new ReceiptItem(
                new ProductId(item.productId),
                item.quantity,
                item.batchNumber,
                new Date(item.expiryDate)
            ))
        );
    }
}

