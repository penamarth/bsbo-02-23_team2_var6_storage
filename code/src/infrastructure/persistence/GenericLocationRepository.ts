import type { LocationRepository } from "@/domain/repository/LocationRepository";
import { LocationId } from "@/domain/valueobject/LocationId";
import { StorageLocation } from "@/domain/model/StorageLocation";
import { ProductDimensions } from "@/domain/valueobject/ProductDimensions";
import type { Optional } from "@/shared";

// EntityManager would be a database entity manager in real implementation
export interface EntityManager {
    find<T>(type: { new (...args: any[]): T }, id: string): Optional<T>;
    save<T>(entity: T): void;
}

export class GenericLocationRepository implements LocationRepository {
    private locations: Map<string, StorageLocation> = new Map();

    constructor(private readonly entityManager?: EntityManager) {}

    findById(id: LocationId): Optional<StorageLocation> {
        const location = this.locations.get(id.getValue());
        if (location) {
            return location;
        }
        if (this.entityManager) {
            return this.entityManager.find(StorageLocation, id.getValue());
        }
        return undefined;
    }

    findAvailableLocations(dimensions: ProductDimensions, quantity: number): StorageLocation[] {
        const available: StorageLocation[] = [];
        for (const location of this.locations.values()) {
            if (location.canStore(dimensions, quantity)) {
                available.push(location);
            }
        }
        return available;
    }

    save(location: StorageLocation): void {
        this.locations.set(location.getId().getValue(), location);
        if (this.entityManager) {
            this.entityManager.save(location);
        }
    }
}

