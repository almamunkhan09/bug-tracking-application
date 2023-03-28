"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_services_1 = require("./project-services");
// import log from '../utils/logger';
async function deleteProjectHandler(req, res) {
    const { id } = req.params;
    try {
        const projectExists = await (0, project_services_1.getProject)(id);
        if (!projectExists) {
            return res.status(404).json({ error: 'Project not found' });
        }
        const result = await (0, project_services_1.deleteProject)(id);
        const response = Object.assign(Object.assign({}, result), { message: 'Deleted Project' });
        return res.status(204).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = deleteProjectHandler;
