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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const comment_route_1 = require("./comment/comment.route");
const issues_route_1 = require("./Issue/issues.route");
const project_route_1 = require("./project/project.route");
const apiHealthCheck_1 = require("./routes/apiHealthCheck");
const user_route_1 = require("./user/user-route");
const errorHandling_1 = __importDefault(require("./utils/errorHandling"));
const logger_1 = __importDefault(require("./utils/logger")); // This is Logger file created based on pino for pretty logging
dotenv.config(); // Configure the dotenv for using enviornment variable
const port = process.env.PORT || 3500;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/status', apiHealthCheck_1.apiHealthCheck); // Api healthcheck for the server check
app.use('/api/users', user_route_1.users);
app.use('/api/projects', project_route_1.projects);
app.use('/api/issues', issues_route_1.issues);
app.use('/api/comments', comment_route_1.comments);
app.get('/', (req, res) => {
    res
        .status(200)
        .json({ message: 'Hello From the backend of the final project' });
});
app.use(errorHandling_1.default); // This is central error handling function
app.listen(port, () => {
    logger_1.default.info(`Application is listening at http://localhost:${port}`);
});
