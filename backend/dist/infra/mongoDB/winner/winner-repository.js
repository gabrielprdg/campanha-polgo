"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinnerMongoRepository = void 0;
const winner_schema_1 = require("./winner-schema");
class WinnerMongoRepository {
    mapToModel(winnerDoc) {
        const model = {
            id: winnerDoc._id.toString(),
            name: winnerDoc.name,
            state: winnerDoc.state,
            city: winnerDoc.city,
            prize: winnerDoc.prize,
            date: winnerDoc.date
        };
        if (winnerDoc.created_at) {
            model.created_at = winnerDoc.created_at;
        }
        if (winnerDoc.updated_at) {
            model.updated_at = winnerDoc.updated_at;
        }
        return model;
    }
    async add(winnerData) {
        const winner = await winner_schema_1.WinnerMongoModel.create(winnerData);
        return this.mapToModel(winner);
    }
    async loadAll() {
        const winners = await winner_schema_1.WinnerMongoModel.find().sort({ created_at: -1 });
        return winners.map(winner => this.mapToModel(winner));
    }
    async loadById(id) {
        const winner = await winner_schema_1.WinnerMongoModel.findById(id);
        return winner ? this.mapToModel(winner) : null;
    }
    async update(id, winnerData) {
        await winner_schema_1.WinnerMongoModel.findByIdAndUpdate(id, winnerData, { new: true });
    }
    async deleteById(id) {
        await winner_schema_1.WinnerMongoModel.findByIdAndDelete(id);
    }
}
exports.WinnerMongoRepository = WinnerMongoRepository;
//# sourceMappingURL=winner-repository.js.map