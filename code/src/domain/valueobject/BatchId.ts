export class BatchId {
    constructor(private readonly value: string) {
        if (!value) {
            throw new Error("BatchId cannot be empty");
        }
    }

    getValue(): string {
        return this.value;
    }

    equals(other: BatchId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}

