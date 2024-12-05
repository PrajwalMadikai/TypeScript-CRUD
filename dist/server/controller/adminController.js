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
exports.editUser = void 0;
const studentModal_1 = __importDefault(require("../modal/studentModal"));
const getLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Accessing /admin/login');
        res.render('adminlogin');
    }
    catch (error) {
        console.log(error);
    }
});
const LoginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let admin = yield studentModal_1.default.findOne({ email: email, isAdmin: true, password: password });
        if (admin) {
            res.json({ success: true, message: 'login success' });
        }
        else {
            res.json({ success: false, });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let students = yield studentModal_1.default.find({ isAdmin: false });
        console.log("student:", students);
        res.render("dashboard", { students });
    }
    catch (error) {
        console.log(error);
    }
});
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { name, email } = req.body;
        // Find the student by ID and update the name and email
        const user = yield studentModal_1.default.findByIdAndUpdate(userId, { name, email }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'An error occurred while updating the user' });
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield studentModal_1.default.findByIdAndDelete(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
});
exports.default = { getLogin, LoginPost, dashboard, editUser: exports.editUser, deleteUser };
