"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteWinnerByIdController = void 0;
const http_helper_1 = require("../../../helpers/http/http-helper");
class DeleteWinnerByIdController {
    constructor(deleteWinnerById) {
        this.deleteWinnerById = deleteWinnerById;
    }
    async handle(httpRequest) {
        try {
            const { id } = httpRequest.params;
            await this.deleteWinnerById.deleteById(id);
            return (0, http_helper_1.noContent)();
        }
        catch (err) {
            return (0, http_helper_1.serverError)(err);
        }
    }
}
exports.DeleteWinnerByIdController = DeleteWinnerByIdController;
//# sourceMappingURL=delete-winner-by-id-controller.js.map