"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAddWinner = void 0;
class DbAddWinner {
    constructor(addWinnerRepository) {
        this.addWinnerRepository = addWinnerRepository;
    }
    async add(winnerData) {
        const winner = await this.addWinnerRepository.add(winnerData);
        return winner;
    }
}
exports.DbAddWinner = DbAddWinner;
//# sourceMappingURL=db-add-winner.js.map