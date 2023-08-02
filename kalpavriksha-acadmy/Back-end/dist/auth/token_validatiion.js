"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var authorization = function (req, res, next) {
    var token = req.get("authorization"); // gives the header field
    if (token) {
        if (typeof token !== "string") {
            token = token[0];
        }
        token = token.slice(7);
        (0, jsonwebtoken_1.verify)(token, "qwe1234", function (err, decoded) {
            if (err) {
                res.json({
                    success: 0,
                    message: "Invalid token",
                });
            }
            else {
                next();
            }
        });
    }
    else {
        res.json({
            success: 0,
            message: "Access denied!! Unauthorized user",
        });
    }
};
exports.default = authorization;
//# sourceMappingURL=token_validatiion.js.map