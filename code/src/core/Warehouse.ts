export class Warehouse {
    private id: string;
    private name: string;
    private address: string;
    private totalCapacity: number;
    private usedCapacity: number;

    constructor(
        id: string,
        name: string,
        address: string,
        totalCapacity: number,
        usedCapacity: number = 0
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.totalCapacity = totalCapacity;
        this.usedCapacity = usedCapacity;
    }

    calculateFreeSpace(): number {
        console.log(`Расчет свободного места для склада ${this.id}`);
        return this.totalCapacity - this.usedCapacity;
    }

    updateCapacity(change: number): void {
        console.log(`Обновление вместимости склада ${this.id} на ${change}`);
        const newUsedCapacity = this.usedCapacity + change;
        if (newUsedCapacity < 0 || newUsedCapacity > this.totalCapacity) {
            throw new Error("Capacity change would result in invalid capacity");
        }
        this.usedCapacity = newUsedCapacity;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getAddress(): string {
        return this.address;
    }

    getTotalCapacity(): number {
        return this.totalCapacity;
    }

    getUsedCapacity(): number {
        return this.usedCapacity;
    }
}
