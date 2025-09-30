import { AddWinnerRepository } from '../../../protocols/db/add-winner-repository';
import { WinnerModel } from '../../../../domain/models/winner';
import { AddWinner, AddWinnerParams } from '../../../../domain/use-cases/winner/add-winner';
export declare class DbAddWinner implements AddWinner {
    private readonly addWinnerRepository;
    constructor(addWinnerRepository: AddWinnerRepository);
    add(winnerData: AddWinnerParams): Promise<WinnerModel>;
}
//# sourceMappingURL=db-add-winner.d.ts.map