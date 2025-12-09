import type { ShipmentId } from "@/shared";
import { Shipment } from "../model/Shipment";

export interface ShipmentRepository {
    nextIdentity(): ShipmentId;
    save(shipment: Shipment): void;
}

