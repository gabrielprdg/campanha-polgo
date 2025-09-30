import { UpdateWinnerParams } from '../../../domain/use-cases/winner/update-winner-by-id';
export interface UpdateWinnerByIdRepository {
    update: (id: string, winnerData: UpdateWinnerParams) => Promise<void>;
}
//# sourceMappingURL=update-winner-by-id-repository.d.ts.map