export class Product {
    private id: string;
    private sku: string;
    private name: string;
    private description?: string;
    private category?: string;
    private unitOfMeasure?: string;
    private weight?: number;
    private volume?: number;
    private minStockLevel?: number;
    private maxStockLevel?: number;

    constructor(
        id: string,
        sku: string,
        name: string,
        description?: string,
        category?: string,
        unitOfMeasure?: string,
        weight?: number,
        volume?: number,
        minStockLevel?: number,
        maxStockLevel?: number
    ) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        if (description !== undefined) this.description = description;
        if (category !== undefined) this.category = category;
        if (unitOfMeasure !== undefined) this.unitOfMeasure = unitOfMeasure;
        if (weight !== undefined) this.weight = weight;
        if (volume !== undefined) this.volume = volume;
        if (minStockLevel !== undefined) this.minStockLevel = minStockLevel;
        if (maxStockLevel !== undefined) this.maxStockLevel = maxStockLevel;
    }

    checkStockLevel(): number {
        console.log(`Проверка уровня запасов для товара ${this.id}`);
        return 0;
    }

    isBelowMinLevel(): boolean {
        console.log(
            `Проверка, находится ли товар ${this.id} ниже минимального уровня`
        );
        const currentStock = this.checkStockLevel();
        return (
            this.minStockLevel !== undefined &&
            currentStock < this.minStockLevel
        );
    }

    getId(): string {
        return this.id;
    }

    getSku(): string {
        return this.sku;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string | undefined {
        return this.description;
    }

    getCategory(): string | undefined {
        return this.category;
    }

    getUnitOfMeasure(): string | undefined {
        return this.unitOfMeasure;
    }

    getWeight(): number | undefined {
        return this.weight;
    }

    getVolume(): number | undefined {
        return this.volume;
    }

    getMinStockLevel(): number | undefined {
        return this.minStockLevel;
    }

    getMaxStockLevel(): number | undefined {
        return this.maxStockLevel;
    }
}
