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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getEventList = exports.getEvent = void 0;
const EventController_1 = __importDefault(require("./EventController"));
const getEvent = (events) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id)
        throw new Error('An event id is required.');
    return events.get({ id });
});
exports.getEvent = getEvent;
const getEventList = (events) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req && req.params.user;
    return events.getList(user ? { user } : undefined);
});
exports.getEventList = getEventList;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const events = yield EventController_1.default.create(data);
        return {
            get: (0, exports.getEvent)(events),
            getList: (0, exports.getEventList)(events),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=EventHandlers.js.map