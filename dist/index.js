"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default);
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
