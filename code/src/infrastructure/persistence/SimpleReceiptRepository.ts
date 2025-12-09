import type { ReceiptRepository } from "@/domain/repository/ReceiptRepository";
import type { ReceiptId } from "@/shared";
import { Receipt } from "@/domain/model/Receipt";

let receiptIdCounter = 1;

export class SimpleReceiptRepository implements ReceiptRepository {
    private receipts: Map<number, Receipt> = new Map();

    nextIdentity(): ReceiptId {
        return receiptIdCounter++;
    }

    save(receipt: Receipt): void {
        this.receipts.set(receipt.getId(), receipt);
    }
}
