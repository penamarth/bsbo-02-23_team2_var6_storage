import { WriteOffStatus } from "./WriteOffStatus";
import { WriteOffItem } from "./WriteOffItem";
import { Product } from "@/core/Product";

export class WriteOff {
    private documentNumber: string;
    private writeOffDate: Date;
    private reason: string;
    private responsiblePerson: string;
    private status: WriteOffStatus;
    private items: WriteOffItem[];

    constructor(
        documentNumber: string,
        writeOffDate: Date,
        reason: string,
        responsiblePerson: string
    ) {
        this.documentNumber = documentNumber;
        this.writeOffDate = writeOffDate;
        this.reason = reason;
        this.responsiblePerson = responsiblePerson;
        this.status = WriteOffStatus.DRAFT;
        this.items = [];
    }

    createWriteOff(): void {
        this.status = WriteOffStatus.CREATED;
    }

    approveWriteOff(): void {
        if (this.status === WriteOffStatus.CREATED && this.items.length > 0) {
            this.status = WriteOffStatus.APPROVED;
        }
    }

    addItem(product: Product, quantity: number, reason: string): void {
        if (this.status === WriteOffStatus.APPROVED) {
            throw new Error("Cannot add items to an approved write-off");
        }

        const item = new WriteOffItem(product, quantity, reason);
        if (item.validateWriteOff()) {
            this.items.push(item);
        } else {
            throw new Error("Invalid write-off item");
        }
    }

    getDocumentNumber(): string {
        return this.documentNumber;
    }

    getWriteOffDate(): Date {
        return this.writeOffDate;
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

    getItems(): ReadonlyArray<WriteOffItem> {
        return this.items;
    }
}
