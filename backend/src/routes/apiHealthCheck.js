"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiHealthCheck = void 0;
const express_1 = require("express");
exports.apiHealthCheck = (0, express_1.Router)();
exports.apiHealthCheck.get('/', (req, res) => {
    return res.sendStatus(200);
});
