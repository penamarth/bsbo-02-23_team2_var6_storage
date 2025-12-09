import type { ShipmentRepository } from "@/domain/repository/ShipmentRepository";
import type { ShipmentId } from "@/shared";
import { Shipment } from "@/domain/model/Shipment";

let shipmentIdCounter = 1;

export class SimpleShipmentRepository implements ShipmentRepository {
    private shipments: Map<number, Shipment> = new Map();

    nextIdentity(): ShipmentId {
        return shipmentIdCounter++;
    }

    save(shipment: Shipment): void {
        this.shipments.set(shipment.getId(), shipment);
    }
}

