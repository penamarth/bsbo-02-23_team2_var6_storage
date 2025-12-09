import { WriteOffItem } from "./WriteOffItem";
import { ValidationResult } from "@/shared";

export class WriteOffCommand {
    constructor(
        public readonly reason: string,
        public readonly responsiblePerson: string,
        public readonly items: WriteOffItem[]
    ) {}

    validate(): ValidationResult {
        const result = new ValidationResult();
        
        if (!this.reason || this.reason.trim().length === 0) {
            result.addError("Reason is required");
        }
        
        if (!this.responsiblePerson || this.responsiblePerson.trim().length === 0) {
            result.addError("Responsible person is required");
        }
        
        if (!this.items || this.items.length === 0) {
            result.addError("At least one item is required");
        }
        
        return result;
    }
}

