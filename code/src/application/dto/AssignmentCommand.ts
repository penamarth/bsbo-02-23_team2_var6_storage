import { ProductCode } from "@/domain/valueobject/ProductCode";
import { ProductDimensions } from "@/domain/valueobject/ProductDimensions";
import { ValidationResult } from "@/shared";

export class AssignmentCommand {
    constructor(
        public readonly productId: ProductCode,
        public readonly dimensions: ProductDimensions,
        public readonly quantity: number
    ) {}

    validate(): ValidationResult {
        const result = new ValidationResult();
        
        if (this.quantity <= 0) {
            result.addError("Quantity must be positive");
        }
        
        return result;
    }
}

