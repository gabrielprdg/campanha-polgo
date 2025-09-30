"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbAddWinner = void 0;
const winner_repository_1 = require("../../../../../infra/mongoDB/winner/winner-repository");
const db_add_winner_1 = require("../../../../../data/use-cases/winner/add-winner/db-add-winner");
const makeDbAddWinner = () => {
    const winnerMongoRepository = new winner_repository_1.WinnerMongoRepository();
    return new db_add_winner_1.DbAddWinner(winnerMongoRepository);
};
exports.makeDbAddWinner = makeDbAddWinner;
//# sourceMappingURL=db-add-winner-factory.js.map