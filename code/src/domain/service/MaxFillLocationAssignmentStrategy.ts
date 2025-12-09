import type { LocationAssignmentService } from "./LocationAssignmentService";
import { LocationCoordinates } from "../valueobject/LocationCoordinates";
import { ProductDimensions } from "../valueobject/ProductDimensions";
import type { LocationRepository } from "../repository/LocationRepository";

export class MaxFillLocationAssignmentStrategy implements LocationAssignmentService {
    constructor(private readonly locationRepository: LocationRepository) {}

    findOptimalLocation(dimensions: ProductDimensions, quantity: number): LocationCoordinates {
        const availableLocations = this.locationRepository.findAvailableLocations(dimensions, quantity);
        if (availableLocations.length === 0) {
            throw new Error("No available locations found");
        }
        // Strategy: find location with maximum fill (least free space)
        const sortedLocations = availableLocations.sort((a, b) => 
            a.getFreeSpace() - b.getFreeSpace()
        );
        const firstLocation = sortedLocations[0];
        if (!firstLocation) {
            throw new Error("No available locations found");
        }
        return firstLocation.getCoordinates();
    }
}

