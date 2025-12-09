export class LocationCoordinates {
    constructor(
        public readonly zone: string,
        public readonly rack: string,
        public readonly shelf: string,
        public readonly level: number
    ) {
        if (level < 0) {
            throw new Error("Level must be non-negative");
        }
    }
}

