import { WarehouseSystemFacade } from "@/facade/WarehouseSystemFacade";
import { Product } from "@/core/Product";
import { StorageLocation } from "@/core/StorageLocation";
import { ProductBatch } from "@/core/ProductBatch";
import { ReceiptItem } from "@/movement/GoodsReceipt/ReceiptItem";
import { ShipmentItem } from "@/movement/GoodsShipment/ShipmentItem";
import { WriteOffItem } from "@/movement/WriteOff/WriteOffItem";

export function WarehouseUI(): void {
    const facade = new WarehouseSystemFacade();
    const sampleProduct = new Product(
        "PROD-001",
        "SKU-001",
        "Sample Product",
        "A sample product for testing",
        "Electronics",
        "pcs",
        1.5,
        0.1,
        10,
        100
    );

    const sampleStorageLocation = new StorageLocation(
        "LOC-001",
        "A",
        "R1",
        "S1",
        1,
        1000,
        0
    );

    const sampleProductBatch = new ProductBatch(
        "BATCH-001",
        sampleProduct,
        50,
        new Date(),
        new Date("2025-12-31"),
        "Supplier ABC"
    );

    const sampleReceiptItem = new ReceiptItem(
        sampleProduct,
        10,
        "BATCH-001",
        25.99,
        sampleStorageLocation
    );

    const sampleShipmentItem = new ShipmentItem(
        sampleProduct,
        5,
        sampleProductBatch,
        25.99
    );

    const sampleWriteOffItem = new WriteOffItem(
        sampleProduct,
        2,
        "Damaged during transport",
        sampleProductBatch
    );

    console.log("=== Демонстрация методов фасада складской системы ===\n");

    console.log("1. Тестирование registerGoodsReceipt:");
    const receiptResult = facade.registerGoodsReceipt("Supplier ABC", [
        sampleReceiptItem,
    ]);
    console.log(`   Результат: ${receiptResult}\n`);

    console.log("2. Тестирование registerGoodsShipment:");
    const shipmentResult = facade.registerGoodsShipment("Customer XYZ", [
        sampleShipmentItem,
    ]);
    console.log(`   Результат: ${shipmentResult}\n`);

    console.log("3. Тестирование writeOffGoods:");
    const writeOffResult = facade.writeOffGoods("Damaged goods", [
        sampleWriteOffItem,
    ]);
    console.log(`   Результат: ${writeOffResult}\n`);

    console.log("4. Тестирование assignStorageLocation:");
    const assignResult = facade.assignStorageLocation(
        sampleProduct.getId(),
        sampleStorageLocation
    );
    console.log(`   Результат: ${assignResult}\n`);

    console.log("5. Тестирование findOptimalLocation:");
    const optimalLocation = facade.findOptimalLocation(sampleProduct, 20);
    console.log(`   Результат:`, {
        id: optimalLocation.getId(),
        zone: optimalLocation.getZone(),
        rack: optimalLocation.getRack(),
        shelf: optimalLocation.getShelf(),
        level: optimalLocation.getLevel(),
        capacity: optimalLocation.getCapacity(),
        usedSpace: optimalLocation.getUsedSpace(),
        freeSpace: optimalLocation.getFreeSpace(),
    });
    console.log();

    console.log("6. Тестирование generateStockReport:");
    const stockReport = facade.generateStockReport();
    console.log(`   Результат:`, stockReport);
    console.log();

    console.log("7. Тестирование generateMovementReport:");
    const startDate = new Date("2024-01-01");
    const endDate = new Date("2024-12-31");
    const movementReport = facade.generateMovementReport(startDate, endDate);
    console.log(`   Результат:`, movementReport);
    console.log();
}
