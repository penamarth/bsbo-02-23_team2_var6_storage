import { ReceiptItem } from "./ReceiptItem";
import { ValidationResult } from "@/shared";

export class ReceiptCommand {
    constructor(
        public readonly supplier: string,
        public readonly items: ReceiptItem[]
    ) {}

    validate(): ValidationResult {
        const result = new ValidationResult();
        
        if (!this.supplier || this.supplier.trim().length === 0) {
            result.addError("Supplier is required");
        }
        
        if (!this.items || this.items.length === 0) {
            result.addError("At least one item is required");
        }
        
        return result;
    }
}

