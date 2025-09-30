"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const add_winner_controller_factory_1 = require("../factories/controllers/winner/add-winner/add-winner-controller-factory");
const load_winners_controller_factory_1 = require("../factories/controllers/winner/load-winners/load-winners-controller-factory");
const load_winner_by_id_controller_factory_1 = require("../factories/controllers/winner/load-winner-by-id/load-winner-by-id-controller-factory");
const update_winner_by_id_controller_factory_1 = require("../factories/controllers/winner/update-winner-by-id/update-winner-by-id-controller-factory");
const delete_winner_by_id_controller_factory_1 = require("../factories/controllers/winner/delete-winner-by-id/delete-winner-by-id-controller-factory");
exports.default = (router) => {
    router.post('/winners', (0, express_route_adapter_1.adaptRoute)((0, add_winner_controller_factory_1.makeAddWinnerController)()));
    router.get('/winners', (0, express_route_adapter_1.adaptRoute)((0, load_winners_controller_factory_1.makeLoadWinnersController)()));
    router.get('/winners/:id', (0, express_route_adapter_1.adaptRoute)((0, load_winner_by_id_controller_factory_1.makeLoadWinnerByIdController)()));
    router.patch('/winners/:id', (0, express_route_adapter_1.adaptRoute)((0, update_winner_by_id_controller_factory_1.makeUpdateWinnerByIdController)()));
    router.delete('/winners/:id', (0, express_route_adapter_1.adaptRoute)((0, delete_winner_by_id_controller_factory_1.makeDeleteWinnerByIdController)()));
};
//# sourceMappingURL=winner-routes.js.map