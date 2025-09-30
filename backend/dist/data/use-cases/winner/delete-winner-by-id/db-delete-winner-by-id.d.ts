import { DeleteWinnerByIdRepository } from '../../../protocols/db/delete-winner-by-id-repository';
import { DeleteWinnerById } from '../../../../domain/use-cases/winner/delete-winner-by-id';
export declare class DbDeleteWinnerById implements DeleteWinnerById {
    private readonly deleteWinnerByIdRepository;
    constructor(deleteWinnerByIdRepository: DeleteWinnerByIdRepository);
    deleteById(id: string): Promise<void>;
}
//# sourceMappingURL=db-delete-winner-by-id.d.ts.map