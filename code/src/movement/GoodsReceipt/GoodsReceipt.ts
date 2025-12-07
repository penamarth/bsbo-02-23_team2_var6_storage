import { ReceiptStatus } from "./ReceiptStatus";
import { ReceiptItem } from "./ReceiptItem";
import { Product } from "@/core/Product";
import { StorageLocation } from "@/core/StorageLocation";

export class GoodsReceipt {
    private receiptNumber: string;
    private receiptDate: Date;
    private supplier: string;
    private status: ReceiptStatus;
    private items: ReceiptItem[];

    constructor(receiptNumber: string, receiptDate: Date, supplier: string) {
        this.receiptNumber = receiptNumber;
        this.receiptDate = receiptDate;
        this.supplier = supplier;
        this.status = ReceiptStatus.DRAFT;
        this.items = [];
    }

    registerReceipt(): void {
        console.log(`Регистрация поступления ${this.receiptNumber}`);
        this.status = ReceiptStatus.REGISTERED;
    }

    confirmReceipt(): void {
        console.log(`Подтверждение поступления ${this.receiptNumber}`);
        if (this.status === ReceiptStatus.REGISTERED) {
            this.status = ReceiptStatus.CONFIRMED;
        }
    }

    addItem(
        product: Product,
        quantity: number,
        batchNumber: string,
        unitPrice: number,
        storageLocation: StorageLocation
    ): void {
        console.log(`Добавление позиции в поступление ${this.receiptNumber}`);
        const item = new ReceiptItem(
            product,
            quantity,
            batchNumber,
            unitPrice,
            storageLocation
        );
        this.items.push(item);
    }

    calculateTotalQuantity(): number {
        console.log(
            `Расчет общего количества для поступления ${this.receiptNumber}`
        );
        return this.items.reduce(
            (total, item) => total + item.getQuantity(),
            0
        );
    }

    getReceiptNumber(): string {
        return this.receiptNumber;
    }

    getReceiptDate(): Date {
        return this.receiptDate;
    }

    getSupplier(): string {
        return this.supplier;
    }

    getStatus(): ReceiptStatus {
        return this.status;
    }

    getItems(): ReadonlyArray<ReceiptItem> {
        return this.items;
    }
}
