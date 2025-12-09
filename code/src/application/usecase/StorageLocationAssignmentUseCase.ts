import { AssignmentCommand } from "../dto/AssignmentCommand";
import { Result } from "@/shared";
import { LocationCoordinates } from "@/domain/valueobject/LocationCoordinates";
import type { LocationRepository } from "@/domain/repository/LocationRepository";
import { LocationAssignmentContext } from "@/domain/service/LocationAssignmentContext";

export class StorageLocationAssignmentUseCase {
    constructor(
        private readonly locationRepository: LocationRepository,
        private readonly assignmentService: LocationAssignmentContext
    ) {}

    assignLocation(command: AssignmentCommand): Result<LocationCoordinates> {
        try {
            const validationResult = command.validate();
            if (!validationResult.isValid()) {
                return Result.error(new Error(validationResult.getErrors().join(", ")));
            }

            const coordinates = this.assignmentService.executeStrategy(
                command.dimensions,
                command.quantity
            );

            return Result.success(coordinates);
        } catch (error) {
            return Result.error(error instanceof Error ? error : new Error(String(error)));
        }
    }
}

