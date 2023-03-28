"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projects = void 0;
const express_1 = require("express");
const project_by_prject_id_handler_1 = __importDefault(require("./project-by-prject-id-handler"));
const project_create_handler_1 = __importDefault(require("./project-create-handler"));
const project_delete_handler_1 = __importDefault(require("./project-delete-handler"));
const project_update_handler_1 = __importDefault(require("./project-update-handler"));
exports.projects = (0, express_1.Router)();
exports.projects.get('/:id', project_by_prject_id_handler_1.default);
exports.projects.post('/', project_create_handler_1.default);
exports.projects.put('/:id', project_update_handler_1.default);
exports.projects.delete('/:id', project_delete_handler_1.default);
