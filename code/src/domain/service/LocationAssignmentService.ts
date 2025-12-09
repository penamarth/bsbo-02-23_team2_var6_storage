import { LocationCoordinates } from "../valueobject/LocationCoordinates";
import { ProductDimensions } from "../valueobject/ProductDimensions";

export interface LocationAssignmentService {
    findOptimalLocation(dimensions: ProductDimensions, quantity: number): LocationCoordinates;
}

