import type { LocationAssignmentService } from "./LocationAssignmentService";
import { LocationCoordinates } from "../valueobject/LocationCoordinates";
import { ProductDimensions } from "../valueobject/ProductDimensions";

export class LocationAssignmentContext {
    private strategy: LocationAssignmentService;

    constructor(strategy: LocationAssignmentService) {
        this.strategy = strategy;
    }

    setStrategy(strategy: LocationAssignmentService): void {
        this.strategy = strategy;
    }

    executeStrategy(dimensions: ProductDimensions, quantity: number): LocationCoordinates {
        return this.strategy.findOptimalLocation(dimensions, quantity);
    }
}

