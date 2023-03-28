"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const user_services_1 = require("./user-services");
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        if (id !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ err: 'Not allowed to do this action' });
        }
        const existedData = await (0, user_services_1.userDataById)(id);
        if (!existedData) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const updateData = {
            name: req.body.name ? req.body.name.trim() : existedData.name,
            profilePicture: req.body.profilePicture
                ? req.body.profilePicture.trim()
                : existedData.profilePicture,
        };
        const result = await (0, user_services_1.updateUserData)(id, updateData);
        const response = Object.assign(Object.assign({}, result), { message: 'User Updated Successfully' });
        return res.status(200).json(response);
    }
    catch (err) {
        logger_1.default.error(err);
        return res.status(500).json({
            error: err.message,
        });
    }
}
exports.default = updateUser;
