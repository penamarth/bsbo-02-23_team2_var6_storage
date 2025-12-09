import { WriteOffId } from "../valueobject/WriteOffId";
import { WriteOffDocument } from "../model/WriteOffDocument";
import type { Optional } from "@/shared";

export interface WriteOffRepository {
    nextIdentity(): WriteOffId;
    save(writeOff: WriteOffDocument): void;
    findById(id: WriteOffId): Optional<WriteOffDocument>;
}

