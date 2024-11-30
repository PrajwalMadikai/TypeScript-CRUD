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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const studentModal_1 = __importDefault(require("../modal/studentModal"));
const logGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session.userDetail) {
            res.redirect('/student');
        }
        else {
            // res.setHeader('Cache-Control', 'no-store')
            res.render('login');
        }
    }
    catch (error) {
        console.log(error);
    }
});
const logPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield studentModal_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }
        // Ensure password is not undefined
        if (!user.password) {
            return res.status(400).json({ success: false, message: 'Invalid user data' });
        }
        const hashPass = yield bcryptjs_1.default.compare(password, user.password);
        if (!hashPass) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }
        req.session.userDetail = user;
        return res.status(200).json({ success: true, message: 'Login successful' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
const signupGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('signup');
    }
    catch (error) {
        console.log(error);
    }
});
const signupPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, classN, email, password } = req.body;
        const alreadyUser = yield studentModal_1.default.findOne({ email });
        if (alreadyUser) {
            res.status(400).json({ user: true, message: 'User already exists with this email' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newStudent = new studentModal_1.default({
            name,
            classN,
            email,
            password: hashedPassword,
        });
        yield newStudent.save();
        res.status(201).json({ message: 'User successfully created' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
const studentGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('session  :', req.session.userDetail);
        if (req.session.userDetail) {
            // res.setHeader('Cache-Control', 'no-store');
            let student = yield studentModal_1.default.findOne({ email: (_a = req.session.userDetail) === null || _a === void 0 ? void 0 : _a.email });
            res.render('home', { student });
        }
        else {
            res.redirect('/');
        }
    }
    catch (error) {
        console.log(error);
    }
});
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session.userDetail) {
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.clearCookie('connect.sid');
                    res.redirect('/'); // Redirect to login after logout
                }
            });
        }
        else {
            res.redirect('/');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});
exports.default = { logGet, signupGet, signupPost, logPost, studentGet, logOut };
