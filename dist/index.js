"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const method_override_1 = __importDefault(require("method-override")); // Import method-override
const nocache_1 = __importDefault(require("nocache"));
const path_1 = __importDefault(require("path"));
const connectDB_1 = __importDefault(require("./server/config/connectDB"));
const admin_1 = __importDefault(require("./server/route/admin"));
const user_1 = __importDefault(require("./server/route/user"));
const app = (0, express_1.default)();
require('dotenv').config();
let port = 4000;
(0, connectDB_1.default)();
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, nocache_1.default)());
app.use((0, express_session_1.default)({
    secret: 'secertkey',
    resave: false,
    saveUninitialized: false
}));
app.use((0, method_override_1.default)('_method'));
app.use('/', user_1.default);
app.use('/admin', admin_1.default);
app.listen(port, () => { console.log(`http://localhost:${port}`); });
