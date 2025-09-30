import { LoadWinnersRepository } from '../../../protocols/db/load-winners-repository';
import { WinnerModel } from '../../../../domain/models/winner';
import { LoadWinners } from '../../../../domain/use-cases/winner/load-winners';
export declare class DbLoadWinners implements LoadWinners {
    private readonly loadWinnersRepository;
    constructor(loadWinnersRepository: LoadWinnersRepository);
    loadAll(): Promise<WinnerModel[]>;
}
//# sourceMappingURL=db-load-winners.d.ts.map