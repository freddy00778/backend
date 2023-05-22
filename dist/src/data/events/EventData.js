"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getEventList = exports.getEvent = void 0;
const config_1 = require("../../config");
const getEvent = (events) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield events().select().where({ id: input.id }))[0];
});
exports.getEvent = getEvent;
const getEventList = (events) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = events().select();
    if (input)
        query.where({ user: input.user });
    return yield query;
});
exports.getEventList = getEventList;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const events = () => data.postgres.withSchema(config_1.Database.schema).table('Event');
        return {
            get: (0, exports.getEvent)(events),
            getList: (0, exports.getEventList)(events),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=EventData.js.map