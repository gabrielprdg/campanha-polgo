"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbDeleteWinnerById = void 0;
const winner_repository_1 = require("../../../../../infra/mongoDB/winner/winner-repository");
const db_delete_winner_by_id_1 = require("../../../../../data/use-cases/winner/delete-winner-by-id/db-delete-winner-by-id");
const makeDbDeleteWinnerById = () => {
    const winnerMongoRepository = new winner_repository_1.WinnerMongoRepository();
    return new db_delete_winner_by_id_1.DbDeleteWinnerById(winnerMongoRepository);
};
exports.makeDbDeleteWinnerById = makeDbDeleteWinnerById;
//# sourceMappingURL=db-delete-winner-by-id-factory.js.map