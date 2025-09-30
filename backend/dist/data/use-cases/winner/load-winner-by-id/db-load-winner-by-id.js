"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbLoadWinnerById = void 0;
class DbLoadWinnerById {
    constructor(loadWinnerByIdRepository) {
        this.loadWinnerByIdRepository = loadWinnerByIdRepository;
    }
    async loadById(id) {
        const winner = await this.loadWinnerByIdRepository.loadById(id);
        return winner;
    }
}
exports.DbLoadWinnerById = DbLoadWinnerById;
//# sourceMappingURL=db-load-winner-by-id.js.map