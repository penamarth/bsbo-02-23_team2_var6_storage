export class ProductDimensions {
    constructor(
        public readonly weight: number,
        public readonly volume: number
    ) {
        if (weight < 0 || volume < 0) {
            throw new Error("Weight and volume must be non-negative");
        }
    }
}

