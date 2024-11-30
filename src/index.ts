import express from 'express';
import session from 'express-session';
import nocache from 'nocache';
import path from 'path';
import connectDB from './server/config/connectDB';
import adminRoute from './server/route/admin';
import userRoute from './server/route/user';
const app = express();

require('dotenv').config();
let port = 4000;

connectDB();

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(nocache());

app.use(session({
    secret: 'secertkey',
    resave: false,
    saveUninitialized: false
}));

app.use('/', userRoute);
app.use('/admin', adminRoute);

app.listen(port, () => { console.log(`http://localhost:${port}`); });
