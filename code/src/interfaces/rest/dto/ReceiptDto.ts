import { ReceiptCommand } from "@/application/dto/ReceiptCommand";
import { ReceiptItem } from "@/application/dto/ReceiptItem";
import { ProductCode } from "@/domain/valueobject/ProductCode";

export class ReceiptDto {
    constructor(
        public readonly supplier: string,
        public readonly items: Array<{
            productId: string;
            quantity: number;
            batchNumber: string;
            expiryDate: string;
            supplier: string;
            receivedAt: string;
        }>
    ) {}

    toCommand(): ReceiptCommand {
        return new ReceiptCommand(
            this.supplier,
            this.items.map(item => new ReceiptItem(
                new ProductCode(item.productId),
                item.quantity,
                item.batchNumber,
                new Date(item.expiryDate),
                item.supplier,
                new Date(item.receivedAt)
            ))
        );
    }
}

