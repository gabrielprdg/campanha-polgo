import { AddWinnerRepository } from '../../../data/protocols/db/add-winner-repository';
import { LoadWinnersRepository } from '../../../data/protocols/db/load-winners-repository';
import { LoadWinnerByIdRepository } from '../../../data/protocols/db/load-winner-by-id-repository';
import { UpdateWinnerByIdRepository } from '../../../data/protocols/db/update-winner-by-id-repository';
import { DeleteWinnerByIdRepository } from '../../../data/protocols/db/delete-winner-by-id-repository';
import { WinnerModel } from '../../../domain/models/winner';
import { AddWinnerParams } from '../../../domain/use-cases/winner/add-winner';
import { UpdateWinnerParams } from '../../../domain/use-cases/winner/update-winner-by-id';
export declare class WinnerMongoRepository implements AddWinnerRepository, LoadWinnersRepository, LoadWinnerByIdRepository, UpdateWinnerByIdRepository, DeleteWinnerByIdRepository {
    private mapToModel;
    add(winnerData: AddWinnerParams): Promise<WinnerModel>;
    loadAll(): Promise<WinnerModel[]>;
    loadById(id: string): Promise<WinnerModel | null>;
    update(id: string, winnerData: UpdateWinnerParams): Promise<void>;
    deleteById(id: string): Promise<void>;
}
//# sourceMappingURL=winner-repository.d.ts.map