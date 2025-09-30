"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbUpdateWinnerById = void 0;
const winner_repository_1 = require("../../../../../infra/mongoDB/winner/winner-repository");
const db_update_winner_by_id_1 = require("../../../../../data/use-cases/winner/update-winner-by-id/db-update-winner-by-id");
const makeDbUpdateWinnerById = () => {
    const winnerMongoRepository = new winner_repository_1.WinnerMongoRepository();
    return new db_update_winner_by_id_1.DbUpdateWinnerById(winnerMongoRepository);
};
exports.makeDbUpdateWinnerById = makeDbUpdateWinnerById;
//# sourceMappingURL=db-update-winner-by-id-factory.js.map