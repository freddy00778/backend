"use strict";
/* eslint-disable max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = exports.BadUserInputError = exports.EntityNotFoundError = exports.RouteNotFoundError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, code = 'INTERNAL_ERROR', status = 500, data = {}) {
        super();
        this.message = message;
        this.code = code;
        this.status = status;
        this.data = data;
    }
}
exports.CustomError = CustomError;
class RouteNotFoundError extends CustomError {
    constructor(originalUrl) {
        super(`Route '${originalUrl}' does not exist.`, 'ROUTE_NOT_FOUND', 404);
    }
}
exports.RouteNotFoundError = RouteNotFoundError;
class EntityNotFoundError extends CustomError {
    constructor(entityName) {
        super(`${entityName} not found.`, 'ENTITY_NOT_FOUND', 404);
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
class BadUserInputError extends CustomError {
    constructor(errorData) {
        super('There were validation errors.', 'BAD_USER_INPUT', 400, errorData);
    }
}
exports.BadUserInputError = BadUserInputError;
class InvalidTokenError extends CustomError {
    constructor(message = 'Authentication token is invalid.') {
        super(message, 'INVALID_TOKEN', 401);
    }
}
exports.InvalidTokenError = InvalidTokenError;
//# sourceMappingURL=customErrors.js.map