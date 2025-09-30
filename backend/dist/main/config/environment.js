"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = exports.isDevelopment = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: Number(process.env['PORT']) || 3000,
    nodeEnv: process.env['NODE_ENV'] || 'development',
    mongodbUri: process.env['MONGODB_URI'] || 'mongodb://localhost:27017/campanha-polgo',
    jwtSecret: process.env['JWT_SECRET'] || 'fallback-secret-key',
    corsOrigin: process.env['CORS_ORIGIN'] || 'http://localhost:5173',
    apiVersion: process.env['API_VERSION'] || 'v1'
};
exports.isDevelopment = exports.config.nodeEnv === 'development';
exports.isProduction = exports.config.nodeEnv === 'production';
//# sourceMappingURL=environment.js.map