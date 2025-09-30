import { WinnerModel } from '../../models/winner';
export interface LoadWinnerById {
    loadById: (id: string) => Promise<WinnerModel | null>;
}
//# sourceMappingURL=load-winner-by-id.d.ts.map