"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deploy_1 = require("controllers/automation/deploy");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/deploy", deploy_1.deploy);
exports.default = router;
//# sourceMappingURL=automation.js.map