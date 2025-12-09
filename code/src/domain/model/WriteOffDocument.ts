import { WriteOffId } from "../valueobject/WriteOffId";
import { WriteOffStatus, MovementId, MovementType } from "@/shared";
import { WriteOffLineItem } from "./WriteOffLineItem";
import { MovementRecordedEvent } from "../event/MovementRecordedEvent";
import { ProductId } from "../valueobject/ProductId";

export class WriteOffDocument {
    private items: WriteOffLineItem[] = [];

    constructor(
        private readonly id: WriteOffId,
        private readonly date: Date,
        private reason: string,
        private responsiblePerson: string,
        private status: WriteOffStatus
    ) {}

    getId(): WriteOffId {
        return this.id;
    }

    getDate(): Date {
        return this.date;
    }

    getReason(): string {
        return this.reason;
    }

    getResponsiblePerson(): string {
        return this.responsiblePerson;
    }

    getStatus(): WriteOffStatus {
        return this.status;
    }

    getItems(): readonly WriteOffLineItem[] {
        return this.items;
    }

    addItem(item: WriteOffLineItem): void {
        if (this.status === WriteOffStatus.APPROVED) {
            throw new Error("Cannot add items to approved write-off");
        }
        this.items.push(item);
    }

    approve(): void {
        if (this.items.length === 0) {
            throw new Error("Cannot approve write-off without items");
        }
        this.status = WriteOffStatus.APPROVED;
    }

    getMovementEvents(): MovementRecordedEvent[] {
        return this.items.map((item, index) => {
            const batch = item.getBatch();
            return new MovementRecordedEvent(
                new MovementId(`movement-${this.id.getValue()}-${index}`),
                MovementType.WRITE_OFF,
                batch.getProductId(),
                item.getQuantity(),
                new Date()
            );
        });
    }
}

