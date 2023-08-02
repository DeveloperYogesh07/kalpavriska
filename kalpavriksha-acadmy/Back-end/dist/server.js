"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Routes_1 = require("./Router/Routes");
var config_1 = require("./config/config");
var app = express();
var connection = require("./dbConnection/dbconnection");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use("/", Routes_1.default);
app.listen(config_1.APP_PORT, function () {
    console.log("Server is listening to port:".concat(config_1.APP_PORT));
});
//# sourceMappingURL=server.js.map