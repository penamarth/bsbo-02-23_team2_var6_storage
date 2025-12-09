import type { LocationAssignmentService } from "./LocationAssignmentService";
import { LocationId } from "../valueobject/LocationId";
import { ProductDimensions } from "../valueobject/ProductDimensions";
import type { LocationRepository } from "../repository/LocationRepository";

export class NearestLocationAssignmentStrategy implements LocationAssignmentService {
    constructor(private readonly locationRepository: LocationRepository) {}

    findOptimalLocation(dimensions: ProductDimensions, quantity: number): LocationId {
        const availableLocations = this.locationRepository.findAvailableLocations(dimensions, quantity);
        if (availableLocations.length === 0) {
            throw new Error("No available locations found");
        }
        // Strategy: find nearest location (simplified - returns first available)
        // In real implementation, would calculate distance based on coordinates
        const firstLocation = availableLocations[0];
        if (!firstLocation) {
            throw new Error("No available locations found");
        }
        return firstLocation.getId();
    }
}

