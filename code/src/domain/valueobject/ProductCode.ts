export class ProductCode {
    constructor(private readonly value: string) {
        if (!value) {
            throw new Error("ProductCode cannot be empty");
        }
    }

    getValue(): string {
        return this.value;
    }

    equals(other: ProductCode): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}

