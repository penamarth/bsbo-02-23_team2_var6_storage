import type { EventPublisher } from "@/domain/service/EventPublisher";

export class SimpleEventPublisher implements EventPublisher {
    publish(event: any): void {
        console.log(`[EventPublisher] Publishing event: ${event.constructor.name}`, event);
        // In a real application, this would dispatch events to a message broker or event bus
    }
}

