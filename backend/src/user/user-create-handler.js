"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const user_services_1 = require("./user-services");
async function createHandler(req, res) {
    try {
        const newUser = {
            name: req.body.name.trim(),
            email: req.body.email.trim(),
            password: req.body.password.trim(),
        };
        const isUserExist = Boolean(await (0, user_services_1.userData)(newUser.email));
        if (isUserExist) {
            return res.status(409).json({
                message: 'Email is already in use',
            });
        }
        const hashedPassword = await (0, user_services_1.generateHash)(newUser.password);
        newUser.password = hashedPassword;
        const result = await (0, user_services_1.createUser)(newUser);
        const response = Object.assign(Object.assign({}, result), { message: 'User created successfully' });
        return res.status(201).json(response);
    }
    catch (err) {
        logger_1.default.error(err);
        return res.sendStatus(409).json(err.message);
    }
}
exports.default = createHandler;
