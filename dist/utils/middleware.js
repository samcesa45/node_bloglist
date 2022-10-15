"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const requestLogger = (req, _res, next) => {
    logger_1.default.info('Method: ', req.method);
    logger_1.default.info('Path: ', req.path);
    logger_1.default.info('body: ', req.body);
    next();
};
const unknownEndPoint = (_req, res, _next) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, _req, res, next) => {
    logger_1.default.info(error.message);
    if (error.name === 'CastError') {
        res.status(400).send({ error: 'malformated id' });
    }
    else if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
    }
    next(error);
};
exports.default = {
    requestLogger,
    unknownEndPoint,
    errorHandler
};
