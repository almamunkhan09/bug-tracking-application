"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { omit } from 'lodash';
const user_services_1 = require("./user-services");
// interface NewUser {
//   name: string;
//   email: string;
//   password: string;
//   profilePicture: string;
// }
async function projectByUserId(req, res) {
    const { id } = req.params;
    try {
        const userExists = await (0, user_services_1.userDataById)(id);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
        const projects = await (0, user_services_1.userAssociatedProjects)(id);
        return res.status(200).json(projects);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = projectByUserId;
