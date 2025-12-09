import type { ShipmentId } from "@/shared";
import { ShipmentItem } from "@/application/dto/ShipmentItem";

export class Shipment {
    constructor(
        private readonly id: ShipmentId,
        private readonly customer: string,
        private readonly items: ShipmentItem[]
    ) {}

    getId(): ShipmentId {
        return this.id;
    }

    getCustomer(): string {
        return this.customer;
    }

    getItems(): ShipmentItem[] {
        return this.items;
    }
}

