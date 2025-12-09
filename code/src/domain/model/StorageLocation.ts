import { LocationId } from "../valueobject/LocationId";
import { LocationCoordinates } from "../valueobject/LocationCoordinates";
import { ProductDimensions } from "../valueobject/ProductDimensions";
import { BatchId } from "../valueobject/BatchId";
import { InventoryBatch } from "./InventoryBatch";
import type { Capacity } from "@/shared";

export class StorageLocation {
    private subLocations: StorageLocation[] = [];
    private batches: BatchId[] = [];

    constructor(
        private readonly id: LocationId,
        private readonly coordinates: LocationCoordinates,
        private readonly capacity: Capacity,
        private occupied: number
    ) {
        if (occupied < 0 || occupied > capacity) {
            throw new Error("Occupied space must be between 0 and capacity");
        }
    }

    getId(): LocationId {
        return this.id;
    }

    getCoordinates(): LocationCoordinates {
        return this.coordinates;
    }

    getCapacity(): Capacity {
        return this.capacity;
    }

    getOccupied(): number {
        return this.occupied;
    }

    getBatches(): readonly BatchId[] {
        return this.batches;
    }

    getFreeSpace(): number {
        return this.capacity - this.occupied;
    }

    canStore(dimensions: ProductDimensions, quantity: number): boolean {
        const requiredVolume = dimensions.volume * quantity;
        return this.getFreeSpace() >= requiredVolume;
    }

    assignBatch(batch: InventoryBatch): void {
        const batchId = batch.getId();
        if (this.batches.some(b => b.equals(batchId))) {
            throw new Error("Batch already assigned to this location");
        }
        this.batches.push(batchId);
        const requiredSpace = batch.getQuantity() * 1; // Assuming 1 unit per quantity
        if (this.occupied + requiredSpace > this.capacity) {
            throw new Error("Not enough space for batch");
        }
        this.occupied += requiredSpace;
    }

    releaseSpace(volume: number): void {
        if (volume < 0) {
            throw new Error("Volume must be non-negative");
        }
        this.occupied = Math.max(0, this.occupied - volume);
    }

    addSubLocation(subLocation: StorageLocation): void {
        if (this.subLocations.some(loc => loc.getId().equals(subLocation.getId()))) {
            throw new Error("Sub-location already exists");
        }
        this.subLocations.push(subLocation);
    }

    removeSubLocation(subLocation: StorageLocation): void {
        const index = this.subLocations.findIndex(loc => loc.getId().equals(subLocation.getId()));
        if (index === -1) {
            throw new Error("Sub-location not found");
        }
        this.subLocations.splice(index, 1);
    }

    getChildLocations(): readonly StorageLocation[] {
        return this.subLocations;
    }

    isComposite(): boolean {
        return this.subLocations.length > 0;
    }
}

