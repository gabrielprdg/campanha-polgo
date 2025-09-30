"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoHelper_1 = require("../infra/mongoDB/helper/mongoHelper");
const app_1 = __importDefault(require("./config/app"));
mongoHelper_1.mongoHelper.connect()
    .then(() => {
    const port = process.env['PORT'] || 3000;
    app_1.default.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
})
    .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map