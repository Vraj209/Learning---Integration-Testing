"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const zod_1 = require("zod");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const input = zod_1.z.object({
    a: zod_1.z.number(),
    b: zod_1.z.number(),
});
exports.app.post("/sum", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const parsedInput = input.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({
            message: "Invaliad Input",
        });
    }
    const answer = ((_a = parsedInput.data) === null || _a === void 0 ? void 0 : _a.a) + ((_b = parsedInput.data) === null || _b === void 0 ? void 0 : _b.b);
    const request = yield db_1.prismaclient.request.create({
        data: {
            a: (_c = parsedInput.data) === null || _c === void 0 ? void 0 : _c.a,
            b: (_d = parsedInput.data) === null || _d === void 0 ? void 0 : _d.b,
            answer,
            type: "ADD",
        },
    });
    res.json({
        answer,
        id: request.id,
    });
}));
exports.app.post("/mul", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const parsedInput = input.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({
            message: "Invaliad Input",
        });
    }
    const answer = ((_a = parsedInput.data) === null || _a === void 0 ? void 0 : _a.a) * ((_b = parsedInput.data) === null || _b === void 0 ? void 0 : _b.b);
    yield db_1.prismaclient.request.create({
        data: {
            a: (_c = parsedInput.data) === null || _c === void 0 ? void 0 : _c.a,
            b: (_d = parsedInput.data) === null || _d === void 0 ? void 0 : _d.b,
            answer,
            type: "MUL",
        },
    });
    res.json({
        answer,
    });
}));
