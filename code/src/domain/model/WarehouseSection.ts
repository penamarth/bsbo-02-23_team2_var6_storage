import type { SectionId } from "@/shared";
import { StorageLocation } from "./StorageLocation";
import { ProductDimensions } from "../valueobject/ProductDimensions";

export class WarehouseSection {
    private locations: StorageLocation[] = [];

    constructor(
        private readonly id: SectionId,
        private readonly name: string
    ) {}

    getId(): SectionId {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    addLocation(location: StorageLocation): void {
        if (this.locations.some(loc => loc.getId().equals(location.getId()))) {
            throw new Error("Location already exists in section");
        }
        this.locations.push(location);
    }

    removeLocation(location: StorageLocation): void {
        const index = this.locations.findIndex(loc => loc.getId().equals(location.getId()));
        if (index === -1) {
            throw new Error("Location not found in section");
        }
        this.locations.splice(index, 1);
    }

    getLocations(): readonly StorageLocation[] {
        return this.locations;
    }

    findAvailableSpace(dimensions: ProductDimensions, quantity: number): StorageLocation[] {
        return this.locations.filter(location => location.canStore(dimensions, quantity));
    }
}

