export class WriteOffId {
    constructor(private readonly value: number) {
        if (value === undefined || value === null || isNaN(value)) {
            throw new Error("WriteOffId cannot be empty or invalid");
        }
    }

    getValue(): number {
        return this.value;
    }

    equals(other: WriteOffId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return String(this.value);
    }
}

