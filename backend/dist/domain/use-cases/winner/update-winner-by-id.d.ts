import { WinnerModel } from '../../models/winner';
export type UpdateWinnerParams = Partial<Omit<WinnerModel, 'id'>>;
export interface UpdateWinnerById {
    update: (id: string, winnerData: UpdateWinnerParams) => Promise<void>;
}
//# sourceMappingURL=update-winner-by-id.d.ts.map