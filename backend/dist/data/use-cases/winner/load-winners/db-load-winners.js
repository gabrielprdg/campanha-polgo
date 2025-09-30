"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbLoadWinners = void 0;
class DbLoadWinners {
    constructor(loadWinnersRepository) {
        this.loadWinnersRepository = loadWinnersRepository;
    }
    async loadAll() {
        const winners = await this.loadWinnersRepository.loadAll();
        return winners;
    }
}
exports.DbLoadWinners = DbLoadWinners;
//# sourceMappingURL=db-load-winners.js.map