"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadWinnersController = void 0;
const http_helper_1 = require("../../../helpers/http/http-helper");
class LoadWinnersController {
    constructor(loadWinners) {
        this.loadWinners = loadWinners;
    }
    async handle(_httpRequest) {
        try {
            const winners = await this.loadWinners.loadAll();
            return (0, http_helper_1.ok)(winners);
        }
        catch (err) {
            return (0, http_helper_1.serverError)(err);
        }
    }
}
exports.LoadWinnersController = LoadWinnersController;
//# sourceMappingURL=load-winners-controller.js.map