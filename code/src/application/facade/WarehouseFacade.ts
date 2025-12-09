import { RegisterGoodsReceiptUseCase } from "../usecase/RegisterGoodsReceiptUseCase";
import { RegisterGoodsShipmentUseCase } from "../usecase/RegisterGoodsShipmentUseCase";
import { RegisterWriteOffUseCase } from "../usecase/RegisterWriteOffUseCase";
import { StorageLocationAssignmentUseCase } from "../usecase/StorageLocationAssignmentUseCase";
import { ReceiptCommand } from "../dto/ReceiptCommand";
import { ShipmentCommand } from "../dto/ShipmentCommand";
import { WriteOffCommand } from "../dto/WriteOffCommand";
import { AssignmentCommand } from "../dto/AssignmentCommand";
import { StockReportQuery } from "../dto/StockReportQuery";
import { StockReportItem } from "../dto/StockReportItem";
import type { ReceiptId, ShipmentId } from "@/shared";
import { Result } from "@/shared";
import { WriteOffId } from "@/domain/valueobject/WriteOffId";
import { LocationId } from "@/domain/valueobject/LocationId";

export class WarehouseFacade {
    constructor(
        private readonly receiptUseCase: RegisterGoodsReceiptUseCase,
        private readonly shipmentUseCase: RegisterGoodsShipmentUseCase,
        private readonly writeOffUseCase: RegisterWriteOffUseCase,
        private readonly assignmentUseCase: StorageLocationAssignmentUseCase
    ) {}

    receiveGoods(command: ReceiptCommand): Result<ReceiptId> {
        return this.receiptUseCase.execute(command);
    }

    shipGoods(command: ShipmentCommand): Result<ShipmentId> {
        return this.shipmentUseCase.execute(command);
    }

    writeOffGoods(command: WriteOffCommand): Result<WriteOffId> {
        return this.writeOffUseCase.execute(command);
    }

    assignLocation(command: AssignmentCommand): Result<LocationId> {
        return this.assignmentUseCase.assignLocation(command);
    }

    getStockReport(query: StockReportQuery): StockReportItem[] {
        // Implementation would query inventory service
        // For now, return empty array
        return [];
    }
}

