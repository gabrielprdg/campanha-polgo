"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockDeleteWinnerByIdRepository = exports.mockUpdateWinnerByIdRepository = exports.mockLoadWinnerByIdRepository = exports.mockLoadWinnersRepository = exports.mockAddWinnerRepository = void 0;
const mock_winner_1 = require("../../domain/test/mock-winner");
const mockAddWinnerRepository = () => {
    class AddWinnerRepositoryStub {
        async add(_winnerData) {
            return (0, mock_winner_1.mockWinnerModel)();
        }
    }
    return new AddWinnerRepositoryStub();
};
exports.mockAddWinnerRepository = mockAddWinnerRepository;
const mockLoadWinnersRepository = () => {
    class LoadWinnersRepositoryStub {
        async loadAll() {
            return [(0, mock_winner_1.mockWinnerModel)()];
        }
    }
    return new LoadWinnersRepositoryStub();
};
exports.mockLoadWinnersRepository = mockLoadWinnersRepository;
const mockLoadWinnerByIdRepository = () => {
    class LoadWinnerByIdRepositoryStub {
        async loadById(_id) {
            return (0, mock_winner_1.mockWinnerModel)();
        }
    }
    return new LoadWinnerByIdRepositoryStub();
};
exports.mockLoadWinnerByIdRepository = mockLoadWinnerByIdRepository;
const mockUpdateWinnerByIdRepository = () => {
    class UpdateWinnerByIdRepositoryStub {
        async update(_id, _winnerData) {
            return Promise.resolve();
        }
    }
    return new UpdateWinnerByIdRepositoryStub();
};
exports.mockUpdateWinnerByIdRepository = mockUpdateWinnerByIdRepository;
const mockDeleteWinnerByIdRepository = () => {
    class DeleteWinnerByIdRepositoryStub {
        async deleteById(_id) {
            return Promise.resolve();
        }
    }
    return new DeleteWinnerByIdRepositoryStub();
};
exports.mockDeleteWinnerByIdRepository = mockDeleteWinnerByIdRepository;
//# sourceMappingURL=mock-db-winner.js.map