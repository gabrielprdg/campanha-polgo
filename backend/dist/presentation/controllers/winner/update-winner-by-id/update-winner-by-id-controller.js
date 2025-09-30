"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWinnerByIdController = void 0;
const http_helper_1 = require("../../../helpers/http/http-helper");
class UpdateWinnerByIdController {
    constructor(validation, updateWinnerById) {
        this.validation = validation;
        this.updateWinnerById = updateWinnerById;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest.body);
            if (error) {
                return (0, http_helper_1.badRequest)(error);
            }
            const { id } = httpRequest.params;
            const updateData = httpRequest.body;
            if (updateData.date) {
                updateData.date = new Date(updateData.date);
            }
            await this.updateWinnerById.update(id, updateData);
            return (0, http_helper_1.noContent)();
        }
        catch (err) {
            return (0, http_helper_1.serverError)(err);
        }
    }
}
exports.UpdateWinnerByIdController = UpdateWinnerByIdController;
//# sourceMappingURL=update-winner-by-id-controller.js.map