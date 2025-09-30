import mongoose, { Document } from 'mongoose';
import { WinnerModel } from '../../../domain/models/winner';
export interface WinnerDocument extends Omit<WinnerModel, 'id'>, Document {
    _id: string;
}
export declare const WinnerMongoModel: mongoose.Model<WinnerDocument, {}, {}, {}, mongoose.Document<unknown, {}, WinnerDocument, {}, {}> & WinnerDocument & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=winner-schema.d.ts.map