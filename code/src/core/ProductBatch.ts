import { Product } from "./Product";

export class ProductBatch {
    private batchNumber: string;
    private product: Product;
    private quantity: number;
    private receiptDate: Date;
    private expirationDate?: Date;
    private supplier?: string;

    constructor(
        batchNumber: string,
        product: Product,
        quantity: number,
        receiptDate: Date,
        expirationDate?: Date,
        supplier?: string
    ) {
        this.batchNumber = batchNumber;
        this.product = product;
        this.quantity = quantity;
        this.receiptDate = receiptDate;
        if (expirationDate !== undefined) this.expirationDate = expirationDate;
        if (supplier !== undefined) this.supplier = supplier;
    }

    isExpired(): boolean {
        console.log(
            `Проверка, истек ли срок годности партии ${this.batchNumber}`
        );
        if (!this.expirationDate) {
            return false;
        }
        return new Date() > this.expirationDate;
    }

    split(newQuantity: number): ProductBatch {
        console.log(
            `Разделение партии ${this.batchNumber} на количество ${newQuantity}`
        );
        if (newQuantity >= this.quantity) {
            throw new Error("New quantity must be less than current quantity");
        }
        this.quantity -= newQuantity;
        return new ProductBatch(
            `${this.batchNumber}-split`,
            this.product,
            newQuantity,
            this.receiptDate,
            this.expirationDate,
            this.supplier
        );
    }

    getBatchNumber(): string {
        return this.batchNumber;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getReceiptDate(): Date {
        return this.receiptDate;
    }

    getExpirationDate(): Date | undefined {
        return this.expirationDate;
    }

    getSupplier(): string | undefined {
        return this.supplier;
    }
}
