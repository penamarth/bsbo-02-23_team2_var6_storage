import { Product } from "./Product";
import { MovementType } from "./MovementType";

export class StockMovement {
    private id: string;
    private dateTime: Date;
    private movementType: MovementType;
    private product: Product;
    private quantity: number;
    private referenceDocument: string;
    private user: string;

    constructor(
        id: string,
        dateTime: Date,
        movementType: MovementType,
        product: Product,
        quantity: number,
        referenceDocument: string,
        user: string
    ) {
        this.id = id;
        this.dateTime = dateTime;
        this.movementType = movementType;
        this.product = product;
        this.quantity = quantity;
        this.referenceDocument = referenceDocument;
        this.user = user;
    }

    validateMovement(): boolean {
        console.log(`Проверка движения ${this.id}`);
        return (
            this.quantity > 0 &&
            this.product !== null &&
            this.referenceDocument.length > 0 &&
            this.user.length > 0
        );
    }

    getId(): string {
        return this.id;
    }

    getDateTime(): Date {
        return this.dateTime;
    }

    getMovementType(): MovementType {
        return this.movementType;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getReferenceDocument(): string {
        return this.referenceDocument;
    }

    getUser(): string {
        return this.user;
    }
}
