import { AddWinnerParams } from '../../../domain/use-cases/winner/add-winner';
import { WinnerModel } from '../../../domain/models/winner';
export interface AddWinnerRepository {
    add: (winnerData: AddWinnerParams) => Promise<WinnerModel>;
}
//# sourceMappingURL=add-winner-repository.d.ts.map