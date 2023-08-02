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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUserById = exports.updateUserById = exports.createNewUser = exports.getAllUsers = void 0;
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var connection = require("../dbConnection/dbconnection");
var getAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, results, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                query = "SELECT * FROM user_table";
                return [4 /*yield*/, connection.query(query)];
            case 1:
                results = (_a.sent())[0];
                return [2 /*return*/, res.status(200).json(results)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(401).json(err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var createNewUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, salt, query, results, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.body;
                salt = (0, bcryptjs_1.genSaltSync)(10);
                user.password = (0, bcryptjs_1.hashSync)(user.password, salt);
                query = "INSERT INTO user_table (name, email, password, role) VALUES (?, ?, ?, ?)";
                return [4 /*yield*/, connection.query(query, [user.name, user.email, user.password, user.role])];
            case 1:
                results = (_a.sent())[0];
                return [2 /*return*/, res.status(201).json({ message: "User Added Successfully!!", data: user })];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json(err_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createNewUser = createNewUser;
var updateUserById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, salt, query, results, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = Number(req.params.id);
                user = req.body;
                salt = (0, bcryptjs_1.genSaltSync)(10);
                user.password = (0, bcryptjs_1.hashSync)(user.password, salt);
                query = "UPDATE user_table SET name=?, email=?, password=? WHERE id=?";
                return [4 /*yield*/, connection.query(query, [user.name, user.email, user.password, id])];
            case 1:
                results = (_a.sent())[0];
                if (results.affectedRows === 0) {
                    return [2 /*return*/, res.status(404).json({ message: "User ID not found" })];
                }
                return [2 /*return*/, res.status(200).json({ message: "User is updated" })];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_3)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserById = updateUserById;
var deleteUserById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, results, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = Number(req.params.id);
                query = "DELETE FROM user_table WHERE id=?";
                return [4 /*yield*/, connection.query(query, [id])];
            case 1:
                results = (_a.sent())[0];
                if (results.affectedRows === 0) {
                    return [2 /*return*/, res.status(404).json({ message: "User ID not found" })];
                }
                return [2 /*return*/, res.status(200).json({ message: "User is deleted!!" })];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_4)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserById = deleteUserById;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, query, results, result, jsontoken, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                query = "SELECT * FROM user_table WHERE email=?";
                return [4 /*yield*/, connection.query(query, [email])];
            case 1:
                results = (_b.sent())[0];
                if (!results[0]) {
                    return [2 /*return*/, res.status(404).json({
                            success: 0,
                            data: "Invalid email or password!!",
                        })];
                }
                result = (0, bcryptjs_1.compareSync)(password, results[0].password);
                if (result) {
                    results[0].password = undefined;
                    jsontoken = (0, jsonwebtoken_1.sign)({ result: results[0] }, "qwe1234", {
                        expiresIn: "1h",
                    });
                    return [2 /*return*/, res.json({
                            success: 1,
                            message: "Login successfully",
                            token: jsontoken,
                        })];
                }
                else {
                    return [2 /*return*/, res.json({
                            success: 0,
                            message: "Invalid email or password",
                        })];
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                return [2 /*return*/, res.status(400).json(err_5)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
//# sourceMappingURL=controller.js.map