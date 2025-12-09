import type { ReceiptId } from "@/shared";
import { Receipt } from "../model/Receipt";

export interface ReceiptRepository {
    nextIdentity(): ReceiptId;
    save(receipt: Receipt): void;
}

