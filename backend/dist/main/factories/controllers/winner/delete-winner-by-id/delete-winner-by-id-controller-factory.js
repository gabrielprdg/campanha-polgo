"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteWinnerByIdController = void 0;
const db_delete_winner_by_id_factory_1 = require("../../../use-cases/winner/delete-winner-by-id/db-delete-winner-by-id-factory");
const delete_winner_by_id_controller_1 = require("../../../../../presentation/controllers/winner/delete-winner-by-id/delete-winner-by-id-controller");
const makeDeleteWinnerByIdController = () => {
    return new delete_winner_by_id_controller_1.DeleteWinnerByIdController((0, db_delete_winner_by_id_factory_1.makeDbDeleteWinnerById)());
};
exports.makeDeleteWinnerByIdController = makeDeleteWinnerByIdController;
//# sourceMappingURL=delete-winner-by-id-controller-factory.js.map