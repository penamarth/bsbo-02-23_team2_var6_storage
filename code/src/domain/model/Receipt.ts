import type { ReceiptId } from "@/shared";
import { ReceiptItem } from "@/application/dto/ReceiptItem";

export class Receipt {
    constructor(
        private readonly id: ReceiptId,
        private readonly supplier: string,
        private readonly items: ReceiptItem[]
    ) {}

    getId(): ReceiptId {
        return this.id;
    }

    getSupplier(): string {
        return this.supplier;
    }

    getItems(): ReceiptItem[] {
        return this.items;
    }
}

