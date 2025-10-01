"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWinnerController = void 0;
const http_helper_1 = require("../../../helpers/http/http-helper");
class AddWinnerController {
    constructor(validation, addWinner) {
        this.validation = validation;
        this.addWinner = addWinner;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest.body);
            if (error) {
                return (0, http_helper_1.badRequest)(error);
            }
            const { name, state, city, prize, date } = httpRequest.body;
            const winner = await this.addWinner.add({
                name,
                state,
                city,
                prize,
                date: new Date(date)
            });
            return (0, http_helper_1.created)(winner);
        }
        catch (err) {
            console.log('err', err);
            return (0, http_helper_1.serverError)(err);
        }
    }
}
exports.AddWinnerController = AddWinnerController;
//# sourceMappingURL=add-winner-controller.js.map