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
exports.Item = exports.Parlor = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("../instances/sequelize");
exports.Parlor = sequelize_1.sequelize.define('parlor', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    mobile: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    tableName: 'parlors'
});
exports.Item = sequelize_1.sequelize.define('item', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    parlorId: Sequelize.STRING,
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    category: Sequelize.STRING,
    eta: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    status: Sequelize.STRING
}, {
    tableName: 'items'
});