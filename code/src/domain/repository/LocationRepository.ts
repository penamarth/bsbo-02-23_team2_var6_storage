import { LocationId } from "../valueobject/LocationId";
import { StorageLocation } from "../model/StorageLocation";
import { ProductDimensions } from "../valueobject/ProductDimensions";
import type { Optional } from "@/shared";

export interface LocationRepository {
    findById(id: LocationId): Optional<StorageLocation>;
    findAvailableLocations(dimensions: ProductDimensions, quantity: number): StorageLocation[];
    save(location: StorageLocation): void;
}

