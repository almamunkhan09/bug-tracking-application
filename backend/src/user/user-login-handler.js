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
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { omit } from 'lodash';
const prisma_1 = __importDefault(require("../prisma"));
const logger_1 = __importDefault(require("../utils/logger"));
dotenv.config(); // Configure the dotenv for using enviornment variable
async function userLogin(req, res) {
    const { email, password } = req.body;
    let secret;
    if (process.env.JWT_SECRET !== undefined) {
        secret = process.env.JWT_SECRET;
    }
    else {
        throw new Error('Please set a SECRET variable in the env file');
    }
    try {
        const user = await prisma_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(401).json({
                message: 'Email or Password does not match',
            });
        }
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: 'Email or Password does not match',
            });
        }
        const accessTocken = jsonwebtoken_1.default.sign({ id: user.id, isAdmin: user.isAdmin }, secret, { expiresIn: '1hr' });
        const loginData = {
            id: user.id,
            isAdmin: user.isAdmin,
            name: user.name,
        };
        res.cookie(String(user.id), accessTocken, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 30),
            httpOnly: true,
            sameSite: 'lax',
        });
        res.status(200).json(loginData);
    }
    catch (err) {
        logger_1.default.error(err);
        return res.sendStatus(409).json(err.message);
    }
}
exports.default = userLogin;
