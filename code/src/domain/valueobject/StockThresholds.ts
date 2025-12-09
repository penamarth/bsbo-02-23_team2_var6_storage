export class StockThresholds {
    constructor(
        public readonly min: number,
        public readonly max: number
    ) {
        if (min < 0 || max < 0) {
            throw new Error("Thresholds must be non-negative");
        }
        if (min > max) {
            throw new Error("Min threshold cannot be greater than max threshold");
        }
    }
}

