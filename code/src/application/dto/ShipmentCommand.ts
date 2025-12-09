import { ShipmentItem } from "./ShipmentItem";
import { ValidationResult } from "@/shared";

export class ShipmentCommand {
    constructor(
        public readonly customer: string,
        public readonly items: ShipmentItem[]
    ) {}

    validate(): ValidationResult {
        const result = new ValidationResult();
        
        if (!this.customer || this.customer.trim().length === 0) {
            result.addError("Customer is required");
        }
        
        if (!this.items || this.items.length === 0) {
            result.addError("At least one item is required");
        }
        
        return result;
    }
}

