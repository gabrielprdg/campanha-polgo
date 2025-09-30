import { WinnerModel } from '../../../domain/models/winner';
export interface LoadWinnerByIdRepository {
    loadById: (id: string) => Promise<WinnerModel | null>;
}
//# sourceMappingURL=load-winner-by-id-repository.d.ts.map