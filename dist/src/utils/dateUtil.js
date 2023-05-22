"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.futureDate = void 0;
const futureDate = (days) => {
    const currentDate = new Date();
    const futureDateTimestamp = currentDate.setDate(currentDate.getDate() + days);
    const date = new Date(futureDateTimestamp);
    console.log(date.toLocaleString('sv'));
    return date;
};
exports.futureDate = futureDate;
//# sourceMappingURL=dateUtil.js.map