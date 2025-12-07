import { Product } from "./Product";

export class StorageLocation {
    private id: string;
    private zone: string;
    private rack: string;
    private shelf: string;
    private level: number;
    private capacity: number;
    private usedSpace: number;

    constructor(
        id: string,
        zone: string,
        rack: string,
        shelf: string,
        level: number,
        capacity: number,
        usedSpace: number = 0
    ) {
        this.id = id;
        this.zone = zone;
        this.rack = rack;
        this.shelf = shelf;
        this.level = level;
        this.capacity = capacity;
        this.usedSpace = usedSpace;
    }

    getFreeSpace(): number {
        console.log(`Получение свободного места для места хранения ${this.id}`);
        return this.capacity - this.usedSpace;
    }

    canStore(product: Product, quantity: number): boolean {
        console.log(
            `Проверка, может ли место хранения ${
                this.id
            } хранить товар ${product.getId()}`
        );
        const requiredSpace = (product.getVolume() || 0) * quantity;
        return this.getFreeSpace() >= requiredSpace;
    }

    getId(): string {
        return this.id;
    }

    getZone(): string {
        return this.zone;
    }

    getRack(): string {
        return this.rack;
    }

    getShelf(): string {
        return this.shelf;
    }

    getLevel(): number {
        return this.level;
    }

    getCapacity(): number {
        return this.capacity;
    }

    getUsedSpace(): number {
        return this.usedSpace;
    }
}
