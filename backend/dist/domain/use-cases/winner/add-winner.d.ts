import { WinnerModel } from '../../models/winner';
export type AddWinnerParams = Omit<WinnerModel, 'id'>;
export interface AddWinner {
    add: (winnerData: AddWinnerParams) => Promise<WinnerModel>;
}
//# sourceMappingURL=add-winner.d.ts.map