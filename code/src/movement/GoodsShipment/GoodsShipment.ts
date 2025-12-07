import { ShipmentStatus } from "./ShipmentStatus";
import { ShipmentItem } from "./ShipmentItem";
import { Product } from "@/core/Product";
import { ProductBatch } from "@/core/ProductBatch";

export class GoodsShipment {
    private shipmentNumber: string;
    private shipmentDate: Date;
    private customer: string;
    private deliveryAddress: string;
    private status: ShipmentStatus;
    private items: ShipmentItem[];

    constructor(
        shipmentNumber: string,
        shipmentDate: Date,
        customer: string,
        deliveryAddress: string
    ) {
        this.shipmentNumber = shipmentNumber;
        this.shipmentDate = shipmentDate;
        this.customer = customer;
        this.deliveryAddress = deliveryAddress;
        this.status = ShipmentStatus.DRAFT;
        this.items = [];
    }

    createShipment(): void {
        console.log(`Создание отгрузки ${this.shipmentNumber}`);
        this.status = ShipmentStatus.CREATED;
    }

    confirmShipment(): void {
        console.log(`Подтверждение отгрузки ${this.shipmentNumber}`);
        if (this.status === ShipmentStatus.CREATED) {
            this.status = ShipmentStatus.CONFIRMED;
        }
    }

    addItem(
        product: Product,
        quantity: number,
        batch: ProductBatch,
        unitPrice: number
    ): void {
        console.log(`Добавление позиции в отгрузку ${this.shipmentNumber}`);
        const item = new ShipmentItem(product, quantity, batch, unitPrice);
        this.items.push(item);
    }

    validateStockAvailability(): boolean {
        console.log(
            `Проверка наличия товара для отгрузки ${this.shipmentNumber}`
        );
        return this.items.length > 0;
    }

    getShipmentNumber(): string {
        return this.shipmentNumber;
    }

    getShipmentDate(): Date {
        return this.shipmentDate;
    }

    getCustomer(): string {
        return this.customer;
    }

    getDeliveryAddress(): string {
        return this.deliveryAddress;
    }

    getStatus(): ShipmentStatus {
        return this.status;
    }

    getItems(): ReadonlyArray<ShipmentItem> {
        return this.items;
    }
}
