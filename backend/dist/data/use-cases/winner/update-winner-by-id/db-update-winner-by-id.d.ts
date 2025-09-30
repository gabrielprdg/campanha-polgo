import { UpdateWinnerByIdRepository } from '../../../protocols/db/update-winner-by-id-repository';
import { UpdateWinnerById, UpdateWinnerParams } from '../../../../domain/use-cases/winner/update-winner-by-id';
export declare class DbUpdateWinnerById implements UpdateWinnerById {
    private readonly updateWinnerByIdRepository;
    constructor(updateWinnerByIdRepository: UpdateWinnerByIdRepository);
    update(id: string, winnerData: UpdateWinnerParams): Promise<void>;
}
//# sourceMappingURL=db-update-winner-by-id.d.ts.map