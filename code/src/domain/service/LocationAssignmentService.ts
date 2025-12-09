import { LocationId } from "../valueobject/LocationId";
import { ProductDimensions } from "../valueobject/ProductDimensions";

export interface LocationAssignmentService {
    findOptimalLocation(dimensions: ProductDimensions, quantity: number): LocationId;
}

