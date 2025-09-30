"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddWinnerController = void 0;
const db_add_winner_factory_1 = require("../../../use-cases/winner/add-winner/db-add-winner-factory");
const add_winner_controller_1 = require("../../../../../presentation/controllers/winner/add-winner/add-winner-controller");
const add_winner_validation_factory_1 = require("./add-winner-validation-factory");
const makeAddWinnerController = () => {
    return new add_winner_controller_1.AddWinnerController((0, add_winner_validation_factory_1.makeAddWinnerValidation)(), (0, db_add_winner_factory_1.makeDbAddWinner)());
};
exports.makeAddWinnerController = makeAddWinnerController;
//# sourceMappingURL=add-winner-controller-factory.js.map