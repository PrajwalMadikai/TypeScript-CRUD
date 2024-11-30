"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const router = express_1.default.Router();
router.get('/', userController_1.default.logGet);
router.post('/', userController_1.default.logPost);
router.get('/signup', userController_1.default.signupGet);
router.post('/signup', userController_1.default.signupPost);
router.get('/student', userController_1.default.studentGet);
router.get('/logout', userController_1.default.logOut);
exports.default = router;
