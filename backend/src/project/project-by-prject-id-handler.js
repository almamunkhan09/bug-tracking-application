"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { omit } from 'lodash';
const project_services_1 = require("./project-services");
// interface NewUser {
//   name: string;
//   email: string;
//   password: string;
//   profilePicture: string;
// }
async function projectById(req, res) {
    const { id } = req.params;
    try {
        const result = await (0, project_services_1.getProjectById)(id);
        if (!result) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        const response = Object.assign(Object.assign({}, result), { message: 'Get the project Successfully' });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = projectById;
