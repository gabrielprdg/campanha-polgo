"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadWinnersController = void 0;
const db_load_winners_factory_1 = require("../../../use-cases/winner/load-winners/db-load-winners-factory");
const load_winners_controller_1 = require("../../../../../presentation/controllers/winner/load-winners/load-winners-controller");
const makeLoadWinnersController = () => {
    return new load_winners_controller_1.LoadWinnersController((0, db_load_winners_factory_1.makeDbLoadWinners)());
};
exports.makeLoadWinnersController = makeLoadWinnersController;
//# sourceMappingURL=load-winners-controller-factory.js.map