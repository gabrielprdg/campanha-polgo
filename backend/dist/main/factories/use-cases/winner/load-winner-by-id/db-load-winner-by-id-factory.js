"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbLoadWinnerById = void 0;
const winner_repository_1 = require("../../../../../infra/mongoDB/winner/winner-repository");
const db_load_winner_by_id_1 = require("../../../../../data/use-cases/winner/load-winner-by-id/db-load-winner-by-id");
const makeDbLoadWinnerById = () => {
    const winnerMongoRepository = new winner_repository_1.WinnerMongoRepository();
    return new db_load_winner_by_id_1.DbLoadWinnerById(winnerMongoRepository);
};
exports.makeDbLoadWinnerById = makeDbLoadWinnerById;
//# sourceMappingURL=db-load-winner-by-id-factory.js.map