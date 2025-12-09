// Базовые типы
export type SKU = string;
export type UnitOfMeasure = string;
export type Capacity = number;
export type SectionId = string;
export type ReceiptId = number;
export type ShipmentId = number;
export class MovementId {
    constructor(private readonly value: string) {
        if (!value) {
            throw new Error("MovementId cannot be empty");
        }
    }

    getValue(): string {
        return this.value;
    }

    toString(): string {
        return this.value;
    }
}
export type WarehouseId = string;
export type Optional<T> = T | undefined;

// DateRange для периодов
export class DateRange {
    constructor(
        public readonly startDate: Date,
        public readonly endDate: Date
    ) {
        if (startDate > endDate) {
            throw new Error("Start date must be before end date");
        }
    }
}

// ValidationResult для валидации
export class ValidationResult {
    private errors: string[] = [];

    addError(error: string): void {
        this.errors.push(error);
    }

    isValid(): boolean {
        return this.errors.length === 0;
    }

    getErrors(): readonly string[] {
        return this.errors;
    }
}

// Result<T> паттерн Success/Error
export class Result<T> {
    private constructor(
        private readonly success: boolean,
        private readonly value?: T,
        private readonly error?: Error
    ) {}

    static success<T>(value: T): Result<T> {
        return new Result<T>(true, value, undefined);
    }

    static error<T>(error: Error | string): Result<T> {
        const errorObj = error instanceof Error ? error : new Error(error);
        return new Result<T>(false, undefined, errorObj);
    }

    isSuccess(): boolean {
        return this.success;
    }

    isError(): boolean {
        return !this.success;
    }

    getValue(): T {
        if (!this.success || this.value === undefined) {
            throw new Error("Cannot get value from error result");
        }
        return this.value;
    }

    getError(): Error {
        if (this.success || this.error === undefined) {
            throw new Error("Cannot get error from success result");
        }
        return this.error;
    }
}

// Enums
export enum MovementType {
    RECEIPT = "RECEIPT",
    SHIPMENT = "SHIPMENT",
    WRITE_OFF = "WRITE_OFF",
    INTERNAL_TRANSFER = "INTERNAL_TRANSFER",
}

export enum WriteOffStatus {
    DRAFT = "DRAFT",
    CREATED = "CREATED",
    APPROVED = "APPROVED",
}

export enum StockStatus {
    NORMAL = "NORMAL",
    BELOW_MIN = "BELOW_MIN",
    ABOVE_MAX = "ABOVE_MAX",
    OUT_OF_STOCK = "OUT_OF_STOCK",
}

