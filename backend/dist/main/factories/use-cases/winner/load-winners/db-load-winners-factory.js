"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbLoadWinners = void 0;
const winner_repository_1 = require("../../../../../infra/mongoDB/winner/winner-repository");
const db_load_winners_1 = require("../../../../../data/use-cases/winner/load-winners/db-load-winners");
const makeDbLoadWinners = () => {
    const winnerMongoRepository = new winner_repository_1.WinnerMongoRepository();
    return new db_load_winners_1.DbLoadWinners(winnerMongoRepository);
};
exports.makeDbLoadWinners = makeDbLoadWinners;
//# sourceMappingURL=db-load-winners-factory.js.map