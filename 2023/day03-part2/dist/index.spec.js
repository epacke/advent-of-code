"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = require("./index");
(0, globals_1.describe)('Fetch number', () => {
    (0, globals_1.test)('Number parsing', () => {
        (0, globals_1.expect)((0, index_1.fetchNumber)(['..35..633.'], 0, 2)).toEqual({ x: 2, y: 0, number: 35 });
    });
    (0, globals_1.test)('Number parsing middle', () => {
        (0, globals_1.expect)((0, index_1.fetchNumber)(['..35..6336'], 0, 8)).toEqual({ x: 6, y: 0, number: 6336 });
    });
});
//# sourceMappingURL=index.spec.js.map