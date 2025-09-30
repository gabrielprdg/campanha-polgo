"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoHelper = exports.MongoHelper = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("@/main/config/environment");
class MongoHelper {
    constructor() { }
    static getInstance() {
        if (!MongoHelper.instance) {
            MongoHelper.instance = new MongoHelper();
        }
        return MongoHelper.instance;
    }
    async connect() {
        try {
            mongoose_1.default.set('strictQuery', false);
            const options = {
                autoIndex: environment_1.isDevelopment,
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                bufferCommands: false,
                bufferMaxEntries: 0
            };
            await mongoose_1.default.connect(environment_1.config.mongodbUri, options);
            console.log('✅ Connected to MongoDB successfully');
            if (environment_1.isDevelopment) {
                mongoose_1.default.set('debug', true);
            }
        }
        catch (error) {
            console.error('❌ MongoDB connection error:', error);
            process.exit(1);
        }
    }
    async disconnect() {
        try {
            await mongoose_1.default.disconnect();
            console.log('🔌 Disconnected from MongoDB');
        }
        catch (error) {
            console.error('❌ Error disconnecting from MongoDB:', error);
        }
    }
    getConnection() {
        return mongoose_1.default;
    }
}
exports.MongoHelper = MongoHelper;
exports.mongoHelper = MongoHelper.getInstance();
//# sourceMappingURL=mongoHelper.js.map