// EventPublisher interface for publishing domain events
export interface EventPublisher {
    publish(event: any): void;
}

