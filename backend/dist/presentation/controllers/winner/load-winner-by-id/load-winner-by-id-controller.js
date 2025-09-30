"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadWinnerByIdController = void 0;
const http_helper_1 = require("../../../helpers/http/http-helper");
class LoadWinnerByIdController {
    constructor(loadWinnerById) {
        this.loadWinnerById = loadWinnerById;
    }
    async handle(httpRequest) {
        try {
            const { id } = httpRequest.params;
            const winner = await this.loadWinnerById.loadById(id);
            if (!winner) {
                return (0, http_helper_1.notFound)(new Error('Winner not found'));
            }
            return (0, http_helper_1.ok)(winner);
        }
        catch (err) {
            return (0, http_helper_1.serverError)(err);
        }
    }
}
exports.LoadWinnerByIdController = LoadWinnerByIdController;
//# sourceMappingURL=load-winner-by-id-controller.js.map