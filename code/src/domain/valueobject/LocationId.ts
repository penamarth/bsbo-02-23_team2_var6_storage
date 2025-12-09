export class LocationId {
    constructor(private readonly value: string) {
        if (!value) {
            throw new Error("LocationId cannot be empty");
        }
    }

    getValue(): string {
        return this.value;
    }

    equals(other: LocationId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}

