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
exports.userAssociatedProjects = exports.deleteUserById = exports.updateUserData = exports.createUser = exports.generateHash = exports.userDataById = exports.userData = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const prisma_1 = __importDefault(require("../prisma"));
dotenv.config();
/**
 * Get the data of user using email  .
 *
 * @param email the email of the user that the data we want .
 * @returns the square object data of user i.e id,email,name and profile picture.
 */
async function userData(email) {
    return await prisma_1.default.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            email: true,
            name: true,
            profilePicture: true,
        },
    });
}
exports.userData = userData;
/**
 * Get the data of user using id  .
 *
 * @param id the user id that the data we want .
 * @returns the square object data of user i.e id,email,name and profile picture.
 */
async function userDataById(id) {
    return await prisma_1.default.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            email: true,
            name: true,
            profilePicture: true,
        },
    });
}
exports.userDataById = userDataById;
/**
 * Bycrypt hash generator that give hashed password
 *
 * @param password the password provided as input from the user.
 * @returns cryptographic hashed password.
 */
async function generateHash(password) {
    let saltValue;
    if (process.env.SALT !== undefined) {
        saltValue = parseInt(process.env.SALT);
    }
    else {
        throw new Error('Please set a salt in the env file');
    }
    const salt = await bcrypt_1.default.genSalt(saltValue);
    return bcrypt_1.default.hashSync(password, salt);
}
exports.generateHash = generateHash;
/**
 * User Signup
 *
 * @param data is name,email,password and/or profile picture url provided by the user.
 * @returns id,email,name,createdAt on succesfull user creation
 */
async function createUser(data) {
    return await prisma_1.default.user.create({
        data: data,
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
        },
    });
}
exports.createUser = createUser;
/**
 * Update user data
 *
 * @param id is the user id whose data need to be modified.
 * @param data that need to update in the database
 * @returns id,email,name,profile picture on succesfull update
 */
async function updateUserData(id, data) {
    return await prisma_1.default.user.update({
        where: {
            id: id,
        },
        data: data,
        select: {
            id: true,
            email: true,
            profilePicture: true,
            name: true,
        },
    });
}
exports.updateUserData = updateUserData;
/**
 * Delete user
 *
 * @param id is the user id whose data need to be erased
 * @param data that need to update in the database
 * @returns id,email,name,profile picture on succesfull update
 */
async function deleteUserById(id) {
    return await prisma_1.default.user.delete({
        where: {
            id: id,
        },
        select: {
            id: true,
            email: true,
            name: true,
        },
    });
}
exports.deleteUserById = deleteUserById;
async function userAssociatedProjects(id) {
    return await prisma_1.default.project.findMany({
        where: {
            OR: [
                { createdById: id },
                {
                    maintainers: {
                        some: {
                            id: id,
                        },
                    },
                },
            ],
        },
        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    profilePicture: true,
                    email: true,
                },
            },
            maintainers: {
                select: {
                    id: true,
                    name: true,
                    profilePicture: true,
                    email: true,
                },
            },
        },
    });
}
exports.userAssociatedProjects = userAssociatedProjects;
