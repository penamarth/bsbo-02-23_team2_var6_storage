import { Warehouse } from "@/core/Warehouse";
import { StockMovement } from "@/core/StockMovement";

export class MovementReport {
    private startDate: Date;
    private endDate: Date;
    private warehouse: Warehouse;
    private movements: StockMovement[];
    private totalReceipts: number;
    private totalShipments: number;

    constructor(startDate: Date, endDate: Date, warehouse: Warehouse) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.warehouse = warehouse;
        this.movements = [];
        this.totalReceipts = 0;
        this.totalShipments = 0;
    }

    generateTurnoverStatement(): void {
        console.log(
            `Генерация ведомости оборота для склада ${this.warehouse.getId()} с ${
                this.startDate
            } по ${this.endDate}`
        );
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }

    getWarehouse(): Warehouse {
        return this.warehouse;
    }

    getMovements(): ReadonlyArray<StockMovement> {
        return this.movements;
    }

    getTotalReceipts(): number {
        return this.totalReceipts;
    }

    getTotalShipments(): number {
        return this.totalShipments;
    }

    setMovements(movements: StockMovement[]): void {
        this.movements = movements;
    }

    setTotalReceipts(total: number): void {
        this.totalReceipts = total;
    }

    setTotalShipments(total: number): void {
        this.totalShipments = total;
    }
}
