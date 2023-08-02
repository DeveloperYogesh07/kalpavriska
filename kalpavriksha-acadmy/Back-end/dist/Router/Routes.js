"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var token_validatiion_1 = require("../auth/token_validatiion");
var controller_1 = require("../controller/controller");
var router = express.Router();
router.get("/users", token_validatiion_1.default, controller_1.getAllUsers);
router.post("/user", controller_1.createNewUser);
router.patch("/user/:id", token_validatiion_1.default, controller_1.updateUserById);
router.delete("/user/:id", token_validatiion_1.default, controller_1.deleteUserById);
router.post("/user/login", controller_1.login);
exports.default = router;
//# sourceMappingURL=Routes.js.map