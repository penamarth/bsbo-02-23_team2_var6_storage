import type { WriteOffRepository } from "@/domain/repository/WriteOffRepository";
import { WriteOffId } from "@/domain/valueobject/WriteOffId";
import { WriteOffDocument } from "@/domain/model/WriteOffDocument";
import type { Optional } from "@/shared";

let writeOffIdCounter = 1;

export class SimpleWriteOffRepository implements WriteOffRepository {
    private writeOffs: Map<number, WriteOffDocument> = new Map();

    nextIdentity(): WriteOffId {
        return new WriteOffId(writeOffIdCounter++);
    }

    save(writeOff: WriteOffDocument): void {
        this.writeOffs.set(writeOff.getId().getValue(), writeOff);
    }

    findById(id: WriteOffId): Optional<WriteOffDocument> {
        return this.writeOffs.get(id.getValue());
    }
}

