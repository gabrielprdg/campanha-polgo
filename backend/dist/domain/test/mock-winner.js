"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAddWinnerParams = exports.mockWinnerModel = void 0;
const mockWinnerModel = () => ({
    id: 'any_id',
    name: 'Any Winner',
    state: 'SP',
    city: 'São Paulo',
    prize: 'R$ 1000',
    date: new Date(),
    created_at: new Date(),
    updated_at: new Date()
});
exports.mockWinnerModel = mockWinnerModel;
const mockAddWinnerParams = () => ({
    name: 'Any Winner',
    state: 'SP',
    city: 'São Paulo',
    prize: 'R$ 1000',
    date: new Date()
});
exports.mockAddWinnerParams = mockAddWinnerParams;
//# sourceMappingURL=mock-winner.js.map