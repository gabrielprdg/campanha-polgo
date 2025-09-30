import mongoose from 'mongoose';
export declare class MongoHelper {
    private static instance;
    private constructor();
    static getInstance(): MongoHelper;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getConnection(): typeof mongoose;
}
export declare const mongoHelper: MongoHelper;
//# sourceMappingURL=mongoHelper.d.ts.map