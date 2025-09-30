"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const environment_1 = require("./main/config/environment");
const mongoHelper_1 = require("./infra/mongoDB/helper/mongoHelper");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: environment_1.config.corsOrigin,
    credentials: true
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});
app.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Campanha Polgo API',
        version: environment_1.config.apiVersion
    });
});
const startServer = async () => {
    try {
        await mongoHelper_1.mongoHelper.connect();
        app.listen(environment_1.config.port, () => {
            console.log(`🚀 Server running on port ${environment_1.config.port}`);
            console.log(`📡 Environment: ${environment_1.config.nodeEnv}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map