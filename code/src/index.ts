import { WarehouseFacade } from "@/application/facade/WarehouseFacade";
import { RegisterGoodsReceiptUseCase } from "@/application/usecase/RegisterGoodsReceiptUseCase";
import { RegisterGoodsShipmentUseCase } from "@/application/usecase/RegisterGoodsShipmentUseCase";
import { RegisterWriteOffUseCase } from "@/application/usecase/RegisterWriteOffUseCase";
import { StorageLocationAssignmentUseCase } from "@/application/usecase/StorageLocationAssignmentUseCase";
import { DefaultOutboxService } from "@/application/usecase/OutboxService";

// Repositories
import { SimpleReceiptRepository } from "@/infrastructure/persistence/SimpleReceiptRepository";
import { SimpleShipmentRepository } from "@/infrastructure/persistence/SimpleShipmentRepository";
import { SimpleWriteOffRepository } from "@/infrastructure/persistence/SimpleWriteOffRepository";
import { SimpleProductRepository } from "@/infrastructure/persistence/SimpleProductRepository";
import { GenericLocationRepository } from "@/infrastructure/persistence/GenericLocationRepository";
import { GenericMovementRepository } from "@/infrastructure/persistence/GenericMovementRepository";

// Services
import { LocationAssignmentContext } from "@/domain/service/LocationAssignmentContext";
import { DefaultLocationAssignmentService } from "@/domain/service/DefaultLocationAssignmentService";
import { MovementService } from "@/domain/service/MovementService";
import { SimpleEventPublisher } from "@/infrastructure/event/SimpleEventPublisher";
import { SimpleInventoryService } from "@/infrastructure/service/SimpleInventoryService";

// DTOs
import { ReceiptCommand } from "@/application/dto/ReceiptCommand";
import { ReceiptItem } from "@/application/dto/ReceiptItem";
import { ShipmentCommand } from "@/application/dto/ShipmentCommand";
import { ShipmentItem } from "@/application/dto/ShipmentItem";
import { WriteOffCommand } from "@/application/dto/WriteOffCommand";
import { WriteOffItem } from "@/application/dto/WriteOffItem";
import { AssignmentCommand } from "@/application/dto/AssignmentCommand";
import { ProductId } from "@/domain/valueobject/ProductId";
import { BatchId } from "@/domain/valueobject/BatchId";
import { Product } from "@/domain/model/Product";
import { ProductDimensions } from "@/domain/valueobject/ProductDimensions";
import { StockThresholds } from "@/domain/valueobject/StockThresholds";
import { StorageLocation } from "@/domain/model/StorageLocation";
import { LocationId } from "@/domain/valueobject/LocationId";
import { LocationCoordinates } from "@/domain/valueobject/LocationCoordinates";

// Simple ID generator
function generateId(): string {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function main(): void {
    console.log("=== Инициализация новой архитектуры складской системы ===\n");

    // Initialize repositories
    const receiptRepository = new SimpleReceiptRepository();
    const shipmentRepository = new SimpleShipmentRepository();
    const writeOffRepository = new SimpleWriteOffRepository();
    const productRepository = new SimpleProductRepository();
    const locationRepository = new GenericLocationRepository();
    const movementRepository = new GenericMovementRepository();

    // Initialize services
    const eventPublisher = new SimpleEventPublisher();
    const movementService = new MovementService(
        movementRepository,
        eventPublisher
    );
    const locationAssignmentService = new DefaultLocationAssignmentService(
        locationRepository
    );
    const locationAssignmentContext = new LocationAssignmentContext(
        locationAssignmentService
    );
    const inventoryService = new SimpleInventoryService();
    const outboxService = new DefaultOutboxService();

    // Initialize use cases
    const receiptUseCase = new RegisterGoodsReceiptUseCase(
        receiptRepository,
        locationAssignmentContext,
        movementService,
        outboxService,
        productRepository
    );
    const shipmentUseCase = new RegisterGoodsShipmentUseCase(
        shipmentRepository,
        inventoryService,
        movementService
    );
    const writeOffUseCase = new RegisterWriteOffUseCase(
        writeOffRepository,
        inventoryService,
        movementService
    );
    const assignmentUseCase = new StorageLocationAssignmentUseCase(
        locationRepository,
        locationAssignmentContext
    );

    // Initialize facade
    const facade = new WarehouseFacade(
        receiptUseCase,
        shipmentUseCase,
        writeOffUseCase,
        assignmentUseCase
    );

    // Setup sample data
    console.log("1. Создание тестовых данных...");

    // Create a sample product
    const productId = new ProductId(generateId());
    const product = new Product(
        productId,
        "SKU-001",
        "Sample Product",
        "Electronics",
        "pcs",
        new ProductDimensions(1.5, 500), // weight (kg), volume (cm³)
        new StockThresholds(10, 100) // min, max
    );
    productRepository.save(product);
    inventoryService.setStock(productId, 50);
    console.log(
        `   Создан продукт: ${product.getName()} (ID: ${productId.getValue()})`
    );

    // Create a sample storage location
    const locationId = new LocationId(generateId());
    const location = new StorageLocation(
        locationId,
        new LocationCoordinates("A", "R1", "S1", 1), // zone, rack, shelf, level
        1000, // capacity
        0 // occupied
    );
    locationRepository.save(location);
    console.log(`   Создана локация: ${locationId.getValue()}\n`);

    // Test receipt
    console.log("2. Тестирование регистрации поступления товаров:");
    const receiptCommand = new ReceiptCommand("Supplier ABC", [
        new ReceiptItem(productId, 10, "BATCH-001", new Date("2025-12-31")),
    ]);
    const receiptResult = facade.receiveGoods(receiptCommand);
    if (receiptResult.isSuccess()) {
        console.log(
            `   ✓ Поступление зарегистрировано: ID ${receiptResult.getValue()}\n`
        );
    } else {
        console.log(`   ✗ Ошибка: ${receiptResult.getError().message}\n`);
    }

    // Test shipment
    console.log("3. Тестирование регистрации отгрузки товаров:");
    const batchId = new BatchId("BATCH-001");
    const shipmentCommand = new ShipmentCommand("Customer XYZ", [
        new ShipmentItem(productId, batchId, 5),
    ]);
    const shipmentResult = facade.shipGoods(shipmentCommand);
    if (shipmentResult.isSuccess()) {
        console.log(
            `   ✓ Отгрузка зарегистрирована: ID ${shipmentResult.getValue()}\n`
        );
    } else {
        console.log(`   ✗ Ошибка: ${shipmentResult.getError().message}\n`);
    }

    // Test write-off
    console.log("4. Тестирование регистрации списания товаров:");
    const writeOffCommand = new WriteOffCommand(
        "Повреждение при транспортировке",
        "Иванов И.И.",
        [new WriteOffItem(productId, batchId, 2, "Товар поврежден")]
    );
    const writeOffResult = facade.writeOffGoods(writeOffCommand);
    if (writeOffResult.isSuccess()) {
        console.log(
            `   ✓ Списание зарегистрировано: ID ${writeOffResult
                .getValue()
                .getValue()}\n`
        );
    } else {
        console.log(`   ✗ Ошибка: ${writeOffResult.getError().message}\n`);
    }

    // Test location assignment
    console.log("5. Тестирование назначения места хранения:");
    const assignmentCommand = new AssignmentCommand(
        productId,
        new ProductDimensions(1.5, 500),
        20
    );
    const assignmentResult = facade.assignLocation(assignmentCommand);
    if (assignmentResult.isSuccess()) {
        console.log(
            `   ✓ Место хранения назначено: ${assignmentResult
                .getValue()
                .getValue()}\n`
        );
    } else {
        console.log(`   ✗ Ошибка: ${assignmentResult.getError().message}\n`);
    }

    // Test stock report
    console.log("6. Получение отчета по складу:");
    const stockReport = facade.getStockReport({
        warehouseId: "WAREHOUSE-001",
        date: new Date(),
    } as any);
    console.log(`   Отчет содержит ${stockReport.length} позиций\n`);

    console.log("=== Демонстрация завершена ===");
}

main();
