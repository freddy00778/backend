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
exports.getEmployees = void 0;
const errors_1 = require("../errors");
const employees_1 = require("../services/employees");
const employee_1 = require("../utils/employee");
exports.getEmployees = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = yield (0, employees_1.readEmployeeData)();
    const employeesData = yield (0, employee_1.getEmployeeData)(data);
    console.log("body", body);
    res.respond({
        employeesData
    });
}));
//# sourceMappingURL=employees.js.map