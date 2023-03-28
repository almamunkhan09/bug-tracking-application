"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const project_services_1 = require("./project-services");
dotenv.config(); // Configure the dotenv for using enviornment variable
async function createProjectHandler(req, res) {
    const projectData = {
        title: req.body.title,
        description: req.body.description,
        createdById: req.body.createdById,
        maintainerIds: req.body.maintainerIds,
    };
    try {
        const result = await (0, project_services_1.createProject)(projectData);
        const response = Object.assign(Object.assign({}, result), { message: 'New Project Created Successfully' });
        res.status(201).json(response);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}
exports.default = createProjectHandler;
