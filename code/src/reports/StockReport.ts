import { Warehouse } from "@/core/Warehouse";
import { StockReportItem } from "./StockReportItem";

export class StockReport {
    private reportDate: Date;
    private warehouse: Warehouse;
    private items: StockReportItem[];
    private totalValue: number;

    constructor(warehouse: Warehouse) {
        this.reportDate = new Date();
        this.warehouse = warehouse;
        this.items = [];
        this.totalValue = 0;
    }

    generateReport(): void {
        console.log(
            `Генерация отчета по остаткам для склада ${this.warehouse.getId()}`
        );
    }

    exportToExcel(): void {
        console.log(
            `Экспорт отчета по остаткам в Excel для склада ${this.warehouse.getId()}`
        );
    }

    getReportDate(): Date {
        return this.reportDate;
    }

    getWarehouse(): Warehouse {
        return this.warehouse;
    }

    getItems(): ReadonlyArray<StockReportItem> {
        return this.items;
    }

    getTotalValue(): number {
        return this.totalValue;
    }

    setItems(items: StockReportItem[]): void {
        this.items = items;
    }

    setTotalValue(value: number): void {
        this.totalValue = value;
    }
}
