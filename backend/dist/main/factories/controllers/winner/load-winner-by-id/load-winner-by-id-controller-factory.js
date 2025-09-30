"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadWinnerByIdController = void 0;
const db_load_winner_by_id_factory_1 = require("../../../use-cases/winner/load-winner-by-id/db-load-winner-by-id-factory");
const load_winner_by_id_controller_1 = require("../../../../../presentation/controllers/winner/load-winner-by-id/load-winner-by-id-controller");
const makeLoadWinnerByIdController = () => {
    return new load_winner_by_id_controller_1.LoadWinnerByIdController((0, db_load_winner_by_id_factory_1.makeDbLoadWinnerById)());
};
exports.makeLoadWinnerByIdController = makeLoadWinnerByIdController;
//# sourceMappingURL=load-winner-by-id-controller-factory.js.map