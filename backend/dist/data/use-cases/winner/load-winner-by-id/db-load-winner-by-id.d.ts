import { LoadWinnerByIdRepository } from '../../../protocols/db/load-winner-by-id-repository';
import { WinnerModel } from '../../../../domain/models/winner';
import { LoadWinnerById } from '../../../../domain/use-cases/winner/load-winner-by-id';
export declare class DbLoadWinnerById implements LoadWinnerById {
    private readonly loadWinnerByIdRepository;
    constructor(loadWinnerByIdRepository: LoadWinnerByIdRepository);
    loadById(id: string): Promise<WinnerModel | null>;
}
//# sourceMappingURL=db-load-winner-by-id.d.ts.map