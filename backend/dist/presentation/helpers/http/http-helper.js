"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.badRequest = exports.noContent = exports.created = exports.ok = exports.serverError = void 0;
const server_error_1 = require("../../errors/server-error");
const serverError = (error) => ({
    body: { error: new server_error_1.ServerError(error.stack).message },
    statusCode: 500
});
exports.serverError = serverError;
const ok = (data) => ({
    body: data,
    statusCode: 200
});
exports.ok = ok;
const created = (data) => ({
    body: data,
    statusCode: 201
});
exports.created = created;
const noContent = () => ({
    body: null,
    statusCode: 204
});
exports.noContent = noContent;
const badRequest = (error) => ({
    body: { error: error.message },
    statusCode: 400
});
exports.badRequest = badRequest;
const notFound = (error) => ({
    body: { error: error.message },
    statusCode: 404
});
exports.notFound = notFound;
//# sourceMappingURL=http-helper.js.map