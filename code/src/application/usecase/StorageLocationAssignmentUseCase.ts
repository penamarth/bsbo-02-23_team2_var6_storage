import { AssignmentCommand } from "../dto/AssignmentCommand";
import { Result } from "@/shared";
import { LocationId } from "@/domain/valueobject/LocationId";
import type { LocationRepository } from "@/domain/repository/LocationRepository";
import { LocationAssignmentContext } from "@/domain/service/LocationAssignmentContext";

export class StorageLocationAssignmentUseCase {
    constructor(
        private readonly locationRepository: LocationRepository,
        private readonly assignmentService: LocationAssignmentContext
    ) {}

    assignLocation(command: AssignmentCommand): Result<LocationId> {
        try {
            const validationResult = command.validate();
            if (!validationResult.isValid()) {
                return Result.error(new Error(validationResult.getErrors().join(", ")));
            }

            const locationId = this.assignmentService.executeStrategy(
                command.dimensions,
                command.quantity
            );

            return Result.success(locationId);
        } catch (error) {
            return Result.error(error instanceof Error ? error : new Error(String(error)));
        }
    }
}

