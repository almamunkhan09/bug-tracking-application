"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidate = exports.userValidate = void 0;
const user_schema_1 = require("./user-schema");
const userValidate = async (req, res, next) => {
    try {
        await user_schema_1.userSchema.validateAsync(req.body);
        next();
    }
    catch (err) {
        console.log(err);
        res.status(422).json({ message: 'User input is not valid' });
    }
};
exports.userValidate = userValidate;
const updateValidate = async (req, res, next) => {
    try {
        await user_schema_1.userUpdateSchema.validateAsync(req.body); // Not getting error message instead throw an error
        next();
    }
    catch (err) {
        res.status(422).json({ message: 'User input is not valid' });
    }
};
exports.updateValidate = updateValidate;
