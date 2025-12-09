export class ProductId {
    constructor(private readonly value: string) {
        if (!value) {
            throw new Error("ProductId cannot be empty");
        }
    }

    getValue(): string {
        return this.value;
    }

    equals(other: ProductId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}
