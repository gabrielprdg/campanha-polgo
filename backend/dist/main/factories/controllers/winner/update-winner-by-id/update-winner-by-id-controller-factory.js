"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateWinnerByIdController = void 0;
const db_update_winner_by_id_factory_1 = require("../../../use-cases/winner/update-winner-by-id/db-update-winner-by-id-factory");
const update_winner_by_id_controller_1 = require("../../../../../presentation/controllers/winner/update-winner-by-id/update-winner-by-id-controller");
const update_winner_by_id_validation_factory_1 = require("./update-winner-by-id-validation-factory");
const makeUpdateWinnerByIdController = () => {
    return new update_winner_by_id_controller_1.UpdateWinnerByIdController((0, update_winner_by_id_validation_factory_1.makeUpdateWinnerByIdValidation)(), (0, db_update_winner_by_id_factory_1.makeDbUpdateWinnerById)());
};
exports.makeUpdateWinnerByIdController = makeUpdateWinnerByIdController;
//# sourceMappingURL=update-winner-by-id-controller-factory.js.map