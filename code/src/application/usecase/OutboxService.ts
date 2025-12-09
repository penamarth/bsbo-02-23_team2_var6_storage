// OutboxService for outbox pattern
import type { ReceiptId } from "@/shared";

export interface OutboxService {
    add(id: ReceiptId): void;
}

export class DefaultOutboxService implements OutboxService {
    add(id: ReceiptId): void {
        // Implementation for outbox pattern
        console.log(`Added to outbox: ${id}`);
    }
}

