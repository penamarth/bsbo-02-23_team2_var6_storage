import { Product } from "@/core/Product";
import { Warehouse } from "@/core/Warehouse";
import { StorageLocation } from "@/core/StorageLocation";
import { ReceiptItem } from "@/movement/GoodsReceipt/ReceiptItem";
import { ShipmentItem } from "@/movement/GoodsShipment/ShipmentItem";
import { WriteOffItem } from "@/movement/WriteOff/WriteOffItem";
import { StockReport } from "@/reports/StockReport";
import { MovementReport } from "@/reports/MovementReport";

export class WarehouseSystemFacade {
    registerGoodsReceipt(supplier: string, items: ReceiptItem[]): boolean {
        console.log(
            `Регистрация поступления товаров от поставщика: ${supplier}`
        );
        console.log(`Количество позиций: ${items.length}`);
        return true;
    }

    registerGoodsShipment(customer: string, items: ShipmentItem[]): boolean {
        console.log(`Регистрация отгрузки товаров клиенту: ${customer}`);
        console.log(`Количество позиций: ${items.length}`);
        return true;
    }

    writeOffGoods(reason: string, items: WriteOffItem[]): boolean {
        console.log(`Списание товаров. Причина: ${reason}`);
        console.log(`Количество позиций: ${items.length}`);
        return true;
    }

    assignStorageLocation(
        productId: string,
        location: StorageLocation
    ): boolean {
        console.log(
            `Назначение места хранения ${location.getId()} для товара ${productId}`
        );
        return true;
    }

    findOptimalLocation(product: Product, quantity: number): StorageLocation {
        console.log(
            `Поиск оптимального места для товара ${product.getId()}, количество: ${quantity}`
        );
        return new StorageLocation("LOC-001", "A", "R1", "S1", 1, 1000, 0);
    }

    generateStockReport(): StockReport {
        console.log("Генерация отчета по остаткам");
        const warehouse = new Warehouse(
            "WH-001",
            "Main Warehouse",
            "123 Main St",
            10000,
            5000
        );
        return new StockReport(warehouse);
    }

    generateMovementReport(startDate: Date, endDate: Date): MovementReport {
        console.log(
            `Генерация отчета по движениям с ${startDate} по ${endDate}`
        );
        const warehouse = new Warehouse(
            "WH-001",
            "Main Warehouse",
            "123 Main St",
            10000,
            5000
        );
        return new MovementReport(startDate, endDate, warehouse);
    }
}
