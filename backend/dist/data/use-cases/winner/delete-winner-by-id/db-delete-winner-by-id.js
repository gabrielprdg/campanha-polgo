"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbDeleteWinnerById = void 0;
class DbDeleteWinnerById {
    constructor(deleteWinnerByIdRepository) {
        this.deleteWinnerByIdRepository = deleteWinnerByIdRepository;
    }
    async deleteById(id) {
        await this.deleteWinnerByIdRepository.deleteById(id);
    }
}
exports.DbDeleteWinnerById = DbDeleteWinnerById;
//# sourceMappingURL=db-delete-winner-by-id.js.map