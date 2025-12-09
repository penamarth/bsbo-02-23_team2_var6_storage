import { WarehouseFacade } from "@/application/facade/WarehouseFacade";
import { ReceiptDto } from "./dto/ReceiptDto";
import { ShipmentDto } from "./dto/ShipmentDto";
import { WriteOffDto } from "./dto/WriteOffDto";

// ResponseEntity would be a framework-specific response type
export interface ResponseEntity<T> {
    status: number;
    body: T;
}

export class WarehouseController {
    constructor(private readonly facade: WarehouseFacade) {}

    receiveGoods(receiptDto: ReceiptDto): ResponseEntity<any> {
        // Convert DTO to Command
        const command = receiptDto.toCommand();
        const result = this.facade.receiveGoods(command);
        
        if (result.isSuccess()) {
            return { status: 200, body: { id: result.getValue() } };
        } else {
            return { status: 400, body: { error: result.getError().message } };
        }
    }

    shipGoods(shipmentDto: ShipmentDto): ResponseEntity<any> {
        const command = shipmentDto.toCommand();
        const result = this.facade.shipGoods(command);
        
        if (result.isSuccess()) {
            return { status: 200, body: { id: result.getValue() } };
        } else {
            return { status: 400, body: { error: result.getError().message } };
        }
    }

    writeOffGoods(writeOffDto: WriteOffDto): ResponseEntity<any> {
        const command = writeOffDto.toCommand();
        const result = this.facade.writeOffGoods(command);
        
        if (result.isSuccess()) {
            return { status: 200, body: { id: result.getValue() } };
        } else {
            return { status: 400, body: { error: result.getError().message } };
        }
    }

    getStockReport(warehouse: string, date: string): ResponseEntity<any> {
        const query = {
            warehouseId: warehouse,
            date: new Date(date)
        };
        const items = this.facade.getStockReport(query as any);
        return { status: 200, body: items };
    }
}

