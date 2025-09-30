"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbUpdateWinnerById = void 0;
class DbUpdateWinnerById {
    constructor(updateWinnerByIdRepository) {
        this.updateWinnerByIdRepository = updateWinnerByIdRepository;
    }
    async update(id, winnerData) {
        await this.updateWinnerByIdRepository.update(id, winnerData);
    }
}
exports.DbUpdateWinnerById = DbUpdateWinnerById;
//# sourceMappingURL=db-update-winner-by-id.js.map